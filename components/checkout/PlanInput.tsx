"use client";

import { plans, usePlanStore } from "@/stores/usePlanStore";
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

const PlanInput = () => {
  const { selectPlan, selectedPlan } = usePlanStore();

  const handleValueChange = (value: string) => {
    const plan = plans.find((p) => p.name === value);
    if (plan) {
      selectPlan(plan);
    }
  };

  return (
    <div className="flex h-[300px] w-full flex-col items-start gap-4 py-6">
      <div className="flex items-center gap-2">
        <h1 className="text-lg">Change your plan:</h1>{" "}
        <Select value={selectedPlan.name} onValueChange={handleValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={selectedPlan.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Plans</SelectLabel>
              {plans.map((plan) => (
                <SelectItem
                  key={plan.name}
                  value={plan.name}
                  onClick={() => selectPlan(plan)}
                >
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
