"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import PayPalCheckout from "./PaypalCheckout";
import { PaypalProvider } from "@/providers/PaypalProvider";
import { useQueryState } from "nuqs";
import { plans } from "@/constants/plans";

const CheckoutCard = () => {
  const [plan] = useQueryState("plan");
  return (
    <Card className="w-full text-center">
      <CardHeader>
        <CardTitle>Pay with Paypal</CardTitle>
        <CardDescription>
          You are on the {plans.find((p) => p.name === plan)?.placeholder} plan
          of Ip tv
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="w-full"
          style={{
            colorScheme: "none",
          }}
        >
          <PaypalProvider>
            <PayPalCheckout />
          </PaypalProvider>
        </div>
      </CardContent>

      <CardFooter>
        Total to pay : {plans.find((p) => p.name === plan)?.price} $
      </CardFooter>
    </Card>
  );
};

export default CheckoutCard;
