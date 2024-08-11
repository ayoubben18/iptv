"use client";

import { usePlanStore } from "@/stores/usePlanStore";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

export default function PayPalCheckout() {
  const [{ isPending }] = usePayPalScriptReducer();

  const { selectedPlan } = usePlanStore();

  const createOrder = async () => {
    const reqBodyJson = {
      plan: selectedPlan.name,
      price: selectedPlan.price,
    };
    console.log({ reqBodyJson });
    const response = await fetch("/api/createorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBodyJson),
      next: {
        revalidate: 0,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to create order");
    }

    const orderData = (await response.json()) as { orderID: string };
    console.log({ orderData });
    console.log({ id: orderData.orderID });

    return orderData.orderID;
  };

  const onApprove = async (data: any) => {
    const response = await fetch("/api/captureorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderID: data.orderID }),
      next: {
        revalidate: 0,
      },
    });

    const orderData = await response.json();
    if (response.ok) {
      toast.success("Payment successful!");
    } else {
      throw new Error(orderData.error || "Failed to capture order");
    }
  };

  return (
    <>
      {" "}
      {isPending ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <PayPalButtons
          className="z-0 w-full"
          style={{
            color: "gold",
          }}
          forceReRender={[selectedPlan]}
          createOrder={createOrder}
          onApprove={onApprove}
          onCancel={() => {
            toast.info("Payment cancelled.");
          }}
          onError={(err) => {
            console.log(err);

            toast.error("An error occurred. Please try again.");
          }}
        />
      )}
    </>
  );
}
