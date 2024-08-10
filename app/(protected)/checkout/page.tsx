import CheckoutCard from "@/components/checkout/CheckoutCard";
import PlanInput from "@/components/checkout/PlanInput";
import PageWrapper from "@/components/PageWrapper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <PageWrapper className="justify-center p-6">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Choose a plan and pay using paypal</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2">
          <PlanInput />
          <CheckoutCard />
        </CardContent>
        <CardFooter>
          <p>For any complaint or misfunctionality please visit the </p>{" "}
          <Link href="/support" className="px-2 font-bold underline">
            {" "}
            support{" "}
          </Link>{" "}
          <p>page</p>
        </CardFooter>
      </Card>
    </PageWrapper>
  );
}
