import { connection } from "../general";
import { input, util } from "@prismatic-io/spectral";
import { USER_SUBSCRIPTION_STATUS_MODEL } from "../../constants";
import { webhookUrl } from "./createUserSubscriptionInputs";
import { toOptionalString } from "../../utils";

export const webhookKey = input({
  label: "Webhook Key",
  comments: "The key of the webhook to update",
  type: "string",
  required: true,
  example: "webhookKey1",
  placeholder: "webhookKey1",
  clean: util.types.toString,
});

export const userSubscriptionKey = input({
  label: "User Subscription Key",
  comments: "The key of the user subscription to update",
  type: "string",
  required: true,
  example: "userSubscriptionKey1",
  placeholder: "userSubscriptionKey1",
  clean: util.types.toString,
});

export const userSubscriptionState = input({
  label: "User Subscription State",
  comments: "The state of the user subscription",
  type: "string",
  required: true,
  example: "ACTIVE",
  placeholder: "ACTIVE",
  clean: util.types.toString,
  model: USER_SUBSCRIPTION_STATUS_MODEL,
});

export const updateUserSubscriptionInputs = {
  connection,
  webhookKey,
  userSubscriptionKey,
  userSubscriptionState,
  callbackUrl: {
    ...webhookUrl,
    required: false,
    clean: toOptionalString,
  },
};
