import { connectionInput } from "../common";
import { description, key, namespace, type, value } from "./common";

export const createMetafieldInputs = {
  namespace,
  key,
  value,
  type,
  description,
  shopifyConnection: connectionInput,
};
