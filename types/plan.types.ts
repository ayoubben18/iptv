export type Plan = {
  id: string;
  name: string;
  placeholder: string;
  price: string;
  features: string[];
};

export type Offer = {
  id: string;
  name: string;
  description: string;
  plans: Plan[];
};
