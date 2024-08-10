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

const PlanInput = () => {
  const { selectPlan, selectedPlan } = usePlanStore();

  const handleValueChange = (value: string) => {
    const plan = plans.find((p) => p.name === value);
    if (plan) {
      selectPlan(plan);
    }
  };

  return (
    <div className="flex h-[300px] w-full items-center justify-center md:h-full">
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
    </div>
  );
};

export default PlanInput;
