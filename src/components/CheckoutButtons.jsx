import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const CheckoutButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      if (!stripe) throw new Error("Stripe not loaded.");
      if (!cartItems || cartItems.length === 0) {
        console.error("Empty cart.");
        return;
      }

      if (!import.meta.env.VITE_STRIPE_SECRET_KEY) {
        throw new Error("Stripe secret key not found.");
      }

      const originUrl = window.location.origin || "http://localhost:5173";

      const lineItems = cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        };
      });

      console.log("Items formatted for Stripe:", lineItems);

      const formData = new URLSearchParams();
      formData.append("payment_method_types[]", "card");
      formData.append("mode", "payment");
      formData.append("success_url", `${originUrl}/success`);
      formData.append("cancel_url", `${originUrl}/cancel`);
      formData.append("locale", "en");

      lineItems.forEach((item, index) => {
        formData.append(
          `line_items[${index}][price_data][currency]`,
          item.price_data.currency
        );
        formData.append(
          `line_items[${index}][price_data][product_data][name]`,
          item.price_data.product_data.name
        );
        formData.append(
          `line_items[${index}][price_data][unit_amount]`,
          item.price_data.unit_amount
        );
        formData.append(`line_items[${index}][quantity]`, item.quantity);
      });

      console.log("FormData created:", Object.fromEntries(formData));

      const response = await fetch(
        "https://api.stripe.com/v1/checkout/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating session:", errorData);
        throw new Error(`Error creating session: ${errorData.error?.message}`);
      }

      const { id: sessionId } = await response.json();
      console.log("Session created successfully:", sessionId);

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error redirecting to checkout:", error);
      }
    } catch (error) {
      console.error("Error during checkout: ", error);
    }
  };

  return (
    <button
      className="rounded-md bg-pink-400 px-4 py-2 text-white hover:bg-pink-500 transition-colors shadow-md hover:shadow-lg"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
};
