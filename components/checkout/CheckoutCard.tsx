"use client";

import { usePlanStore } from "@/stores/usePlanStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import PayPalCheckout from "./PaypalCheckout";

const CheckoutCard = () => {
  const { selectedPlan } = usePlanStore();

  return (
    <Card className="w-full text-center">
      <CardHeader>
        <CardTitle>Pay with Paypal</CardTitle>
        <CardDescription>
          You are on the {selectedPlan.placeholder} plan of Ip tv
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PayPalCheckout />
      </CardContent>

      <CardFooter>Total to pay : {selectedPlan.price} $</CardFooter>
    </Card>
  );
};

export default CheckoutCard;
