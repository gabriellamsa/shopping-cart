import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export const CheckoutButton = ({ cartItems }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stripe, setStripe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const initializeStripe = async () => {
      try {
        console.log("Environment variables:", {
          publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
          secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY,
        });

        if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
          console.error("Stripe public key not found");
          return;
        }

        console.log("Initializing Stripe...");
        const stripeInstance = await loadStripe(
          import.meta.env.VITE_STRIPE_PUBLIC_KEY
        );

        if (!stripeInstance) {
          console.error("Failed to initialize Stripe");
          return;
        }

        console.log("Stripe initialized successfully");
        if (mounted) {
          setStripe(stripeInstance);
        }
      } catch (error) {
        console.error("Error initializing Stripe:", error);
        if (mounted) {
          setError(
            "Failed to initialize payment system. Please try again later."
          );
        }
      }
    };

    initializeStripe();

    return () => {
      mounted = false;
    };
  }, []);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Starting checkout process...");

      if (!stripe) {
        console.log("Waiting for Stripe to initialize...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!stripe) {
          throw new Error("Payment system not ready. Please try again.");
        }
      }

      if (!cartItems || cartItems.length === 0) {
        console.error("Empty cart");
        return;
      }

      if (!import.meta.env.VITE_STRIPE_SECRET_KEY) {
        console.error("Stripe secret key not found");
        throw new Error("Payment system configuration error.");
      }

      console.log("Creating line items...");
      const formData = new URLSearchParams();
      formData.append("payment_method_types[]", "card");
      formData.append("mode", "payment");
      formData.append("success_url", `${window.location.origin}/success`);
      formData.append("cancel_url", `${window.location.origin}/`);

      cartItems.forEach((item, index) => {
        formData.append(`line_items[${index}][price_data][currency]`, "usd");
        formData.append(
          `line_items[${index}][price_data][product_data][name]`,
          item.name
        );
        formData.append(
          `line_items[${index}][price_data][unit_amount]`,
          Math.round(item.price * 100)
        );
        formData.append(`line_items[${index}][quantity]`, item.quantity);
      });

      console.log("Form data:", formData.toString());

      console.log("Creating checkout session...");
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

      const responseData = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", responseData);

      if (!response.ok) {
        console.error("Stripe API error:", responseData);
        throw new Error(
          `Error creating session: ${responseData.error?.message}`
        );
      }

      console.log("Checkout session created:", responseData);

      console.log("Redirecting to Stripe checkout...");
      const { error } = await stripe.redirectToCheckout({
        sessionId: responseData.id,
      });

      if (error) {
        console.error("Stripe redirect error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Detailed error during checkout:", error);
      setError(error.message);
      alert(
        "An error occurred while processing your payment. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && <div className="text-red-600 text-sm">{error}</div>}
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
    </div>
  );
};
