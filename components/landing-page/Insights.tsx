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
import { BorderBeam } from "../magicui/border-beam";
import { getI18n } from "@/locales/server";

const Insights = async () => {
  const t = await getI18n();
  return (
    <Card className="relative w-full">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-3xl">{t("insightsTitle")}</CardTitle>
        <CardDescription>{t("insightsDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-4 text-center">
            <span className="text-3xl font-bold text-primary">
              <NumberTicker value={99} />%
            </span>
            <HyperText
              className="text-sm text-muted-foreground"
              text={t("insightsUptime")}
            />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-4 text-center">
            <span className="text-3xl font-bold text-primary">
              <NumberTicker value={94} />
            </span>
            <HyperText
              className="text-sm text-muted-foreground"
              text={t("insightsServers")}
            />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-4 text-center">
            <span className="text-3xl font-bold text-primary">
              <NumberTicker value={12} />
            </span>
            <HyperText
              className="text-sm text-muted-foreground"
              text={t("insightsServerLocations")}
              duration={1500}
            />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-4 text-center">
            <span className="text-3xl font-bold text-primary">
              <NumberTicker value={1} />
              Hr
            </span>
            <HyperText
              className="text-sm text-muted-foreground"
              text={t("insightsAverageSupportAnswer")}
              duration={1500}
            />
          </div>
        </div>
      </CardContent>
      <BorderBeam size={250} duration={12} delay={9} />
    </Card>
  );
};

export default Insights;
