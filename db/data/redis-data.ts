"use server";
import redis from "@/lib/redis";
import { Offer } from "@/types/plan.types";

const getOffers = async () => {
  const offers = (await Promise.all(
    (await redis.keys("offer:*")).map((key) => redis.get(key)),
  )) as Offer[];

  return offers || [];
};

export { getOffers };
