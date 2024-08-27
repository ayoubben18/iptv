import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import HyperText from "../magicui/hyper-text";
import NumberTicker from "../magicui/number-ticker";

const Insights = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-3xl">Analytics</CardTitle>
        <CardDescription>
          Our team is dedicated to providing the best possible service to our
          customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-4 text-center">
            <span className="text-3xl font-bold text-primary">
              <NumberTicker value={99} />%
            </span>
            <HyperText
              className="text-sm text-muted-foreground"
              text="Uptime"
            />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-4 text-center">
            <span className="text-3xl font-bold text-primary">
              <NumberTicker value={94} />
            </span>
            <HyperText
              className="text-sm text-muted-foreground"
              text="Servers"
            />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-4 text-center">
            <span className="text-3xl font-bold text-primary">
              <NumberTicker value={12} />
            </span>
            <HyperText
              className="text-sm text-muted-foreground"
              text="Server locations"
            />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-4 text-center">
            <span className="text-3xl font-bold text-primary">
              <NumberTicker value={1} />
              Hr
            </span>
            <HyperText
              className="text-sm text-muted-foreground"
              text="Average Support Answer"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Insights;
