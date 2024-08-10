"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";

interface PayPalCheckoutProps {
  items: Array<{
    name: string;
    quantity: string;
    unit_amount: { currency_code: string; value: string };
  }>;
  amount: string;
}

export default function PayPalCheckout({ items, amount }: PayPalCheckoutProps) {
  const createOrder = async () => {
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to create order");
      }

      const orderData = await response.json();
      return orderData.id;
    } catch (error) {
      toast.error("Failed to create order. Please try again.");
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const response = await fetch("/api/capture-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID: data.orderID }),
      });
      const orderData = await response.json();
      if (response.ok) {
        toast.success("Payment successful!");
      } else {
        throw new Error(orderData.error || "Failed to capture order");
      }
    } catch (error: any) {
      toast.error("Payment failed. Please try again.");
      toast.error(error.message);
    }
  };

  return (
    <PayPalButtons
      className="w-full"
      createOrder={createOrder}
      onApprove={onApprove}
      onCancel={() => {
        toast.info("Payment cancelled.");
      }}
      onError={(err) => {
        toast.error("An error occurred. Please try again.");
      }}
    />
  );
}
