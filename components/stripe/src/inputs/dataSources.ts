import { util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import {
  connectionInput,
  customerId,
  endingBefore,
  startingAfter,
} from "./common";
export const selectBalanceTransactionInputs = {
  stripeConnection: connectionInput,
};
export const selectCardInputs = {
  stripeConnection: connectionInput,
  customerId: {
    ...customerId,
    dataSource: undefined,
    required: true,
    clean: util.types.toString,
  },
};
export const selectChargeInputs = {
  stripeConnection: connectionInput,
};
export const selectCheckoutSessionInputs = {
  stripeConnection: connectionInput,
};
export const selectCustomerInputs = {
  stripeConnection: connectionInput,
};
export const selectDisputeInputs = {
  stripeConnection: connectionInput,
};
export const selectInvoiceInputs = {
  stripeConnection: connectionInput,
};
export const selectPaymentIntentInputs = {
  stripeConnection: connectionInput,
  customerId: {
    ...customerId,
    label: "Customer ID",
    comments:
      "Only return PaymentIntents for the customer specified by this customer ID.",
    clean: cleanStringInput,
    dataSource: undefined,
  },
  startingAfter,
  endingBefore,
};
export const selectPriceInputs = {
  stripeConnection: connectionInput,
};
export const selectProductInputs = {
  stripeConnection: connectionInput,
};
export const selectSubscriptionInputs = {
  stripeConnection: connectionInput,
};
