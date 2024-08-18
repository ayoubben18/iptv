"use client";

import { plans } from "@/constants/plans";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Benefites from "./Benefites";
import { useQueryState } from "nuqs";
import { useMemo } from "react";

type PlansType = (typeof plans)[number]["name"];

const PlanInput = () => {
  const [plan, setPlan] = useQueryState<PlansType>("plan", {
    defaultValue: plans[0].name,
    parse: (value: string) => value,
  });

  const selectedPlan = useMemo(
    () => plans.find((p) => p.name === plan) || plans[0],
    [plan],
  );

  const handleValueChange = (value: string) => {
    const plan = plans.find((p) => p.name === value);
    if (plan) {
      setPlan(plan.name);
    }
  };

  return (
    <div className="flex h-[300px] w-full flex-col items-start gap-4 py-6">
      <div className="flex items-center gap-2">
        <h1 className="text-lg">Change your plan:</h1>{" "}
        <Select value={plan} onValueChange={handleValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={selectedPlan.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Plans</SelectLabel>
              {plans.map((plan) => (
                <SelectItem key={plan.name} value={plan.name}>
                  {plan.placeholder}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Benefites planName={selectedPlan.name} />
      </div>
    </div>
  );
};

export default PlanInput;
