import type { Connection } from "@prismatic-io/spectral";
import Stripe from "stripe";
import { getStripeKey } from "./util";

interface CreateClientProps {
  stripeConnection: Connection;
  timeout?: number;
}

export const createStripeClient = ({ stripeConnection, timeout }: CreateClientProps) => {
  const stripeKey = getStripeKey(stripeConnection);
  return new Stripe(stripeKey, {
    typescript: true,
    apiVersion: "2025-04-30.basil",
    timeout,
  });
};
