export type Partner = {
  id: string;
  name: string;
  description: string;
  coverage: string;
  sponsored: boolean;
  logoUrl: string;
};

export type Offer = {
  id: string;
  partnerId: string;
  title: string;
  description: string;
  sponsored: boolean;
};

export type Voucher = {
  id: string;
  value: number;
  currency: "GBP";
  partnerId: string;
  status: "available" | "redeemed";
  code?: string;
  redeemedAt?: string;
};

export const firstMealPartners: Partner[] = [
  {
    id: "pret",
    name: "Pret A Manger",
    description: "Fresh meal + drink for release day",
    coverage: "Major UK cities",
    sponsored: true,
    logoUrl: "Pret logo"
  },
  {
    id: "greggs",
    name: "Greggs",
    description: "Hot meal + drink",
    coverage: "UK-wide locations",
    sponsored: true,
    logoUrl: "Greggs logo"
  },
  {
    id: "mcdonalds",
    name: "McDonald's",
    description: "Hot meal + drink",
    coverage: "Available nationwide",
    sponsored: false,
    logoUrl: "McDonald's logo"
  },
  {
    id: "subway",
    name: "Subway",
    description: "Hot meal + drink",
    coverage: "UK-wide locations",
    sponsored: false,
    logoUrl: "Subway logo"
  },
  {
    id: "costa",
    name: "Costa",
    description: "Meal + drink options",
    coverage: "Available nationwide",
    sponsored: false,
    logoUrl: "Costa logo"
  }
];

export const firstMealOffers: Offer[] = [
  {
    id: "pret-coffee",
    partnerId: "pret",
    title: "Free coffee with any sandwich",
    description: "Available at participating stores.",
    sponsored: true
  },
  {
    id: "greggs-breakfast",
    partnerId: "greggs",
    title: "Hot breakfast deal",
    description: "Morning offer for release days.",
    sponsored: true
  }
];

export const baseVoucher: Voucher = {
  id: "voucher-available",
  value: 5,
  currency: "GBP",
  partnerId: "",
  status: "available"
};
