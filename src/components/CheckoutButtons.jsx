import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const CheckoutButton = ({ cartItems }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;

      if (!stripe) throw new Error("Stripe not loaded.");
      if (!cartItems || cartItems.length === 0) {
        console.error("Empty cart.");
        return;
      }

      if (!import.meta.env.VITE_STRIPE_SECRET_KEY) {
        throw new Error("Stripe secret key not found.");
      }

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

      const formData = new URLSearchParams();
      formData.append("payment_method_types[]", "card");
      formData.append("mode", "payment");
      formData.append("success_url", `${window.location.origin}/success`);
      formData.append("cancel_url", `${window.location.origin}/`);
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
        throw new Error(`Error creating session: ${errorData.error?.message}`);
      }

      const { id: sessionId } = await response.json();

      const { error } = await stripe.redirectToCheckout({
        sessionId,
        mode: "payment",
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error during checkout: ", error);
      alert(
        "An error occurred while processing your payment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      onClick={handleCheckout}
      disabled={isLoading || cartItems.length === 0}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <span>Checkout</span>
      )}
    </button>
  );
};
