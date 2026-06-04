import { connectionInput } from "../common";
import { description, metaFieldId, type, value } from "./common";

export const updateMetafieldInputs = {
  metaFieldId,
  value: { ...value, required: false },
  type: { ...type, required: false },
  description,
  shopifyConnection: connectionInput,
};
