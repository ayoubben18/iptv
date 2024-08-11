"use client";

import { usePlanStore } from "@/stores/usePlanStore";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import PayPalCheckout from "./PaypalCheckout";

const CheckoutCard = () => {
  const { selectedPlan } = usePlanStore();

  return (
    <Card className="max-w-[380px] text-center">
      <CardHeader>
        <CardTitle>Pay with Paypal</CardTitle>
        <CardDescription>
          You are on the {selectedPlan.placeholder} plan of Ip tv
        </CardDescription>
      </CardHeader>

      <div className="flex w-full items-center justify-center">
        <PayPalCheckout />
      </div>
      <CardFooter>Total to pay : {selectedPlan.price} $</CardFooter>
    </Card>
  );
};

export default CheckoutCard;
