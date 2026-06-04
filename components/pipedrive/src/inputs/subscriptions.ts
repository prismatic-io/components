import { input, util } from "@prismatic-io/spectral";
import { connectionInput, subscriptionIdInput } from "./common";
import { cleanString } from "../util";

const dealId = input({
  label: "Deal ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier for the deal associated with the subscription.",
  example: "123",
  placeholder: "Enter Deal ID",
});

const endDate = input({
  label: "End Date",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The date when the subscription should be terminated. Format: YYYY-MM-DD.",
  example: "2024-12-31",
  placeholder: "Enter end date (YYYY-MM-DD)",
});

export const getSubscriptionInputs = {
  connection: connectionInput,
  id: subscriptionIdInput,
};

export const deleteSubscriptionInputs = {
  connection: connectionInput,
  id: subscriptionIdInput,
};

export const findSubscriptionByDealInputs = {
  connection: connectionInput,
  dealId,
};

export const getSubscriptionPaymentsInputs = {
  connection: connectionInput,
  id: subscriptionIdInput,
};

export const cancelRecurringSubscriptionInputs = {
  connection: connectionInput,
  id: subscriptionIdInput,
  endDate,
};
