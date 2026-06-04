import { connectionInput, customerId } from "../common";
import {
  lineItems,
  subTotalPrice,
  taxIncluded,
  totalPrice,
  totalTax,
  useCustomerAddress,
} from "./common";

export const createDraftOrderInputs = {
  customerId: { ...customerId, required: false },
  lineItems,
  useCustomerAddress: {
    ...useCustomerAddress,
    label: "Use Customer Default Address",
    required: false,
    default: "false",
  },
  taxIncluded,
  totalTax,
  totalPrice,
  subTotalPrice,
  shopifyConnection: connectionInput,
};
