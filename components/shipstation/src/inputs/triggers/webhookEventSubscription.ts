import { toOptionalNumber } from "../../util";
import { connectionInput } from "../common";
import {
  friendlyNameInput,
  storeIdWebhookInput,
  webhookEventInput,
} from "../webhooks";

export const webhookEventSubscriptionInputs = {
  connection: connectionInput,
  webhookEvent: webhookEventInput,
  storeId: {
    ...storeIdWebhookInput,
    clean: toOptionalNumber,
  },
  friendlyName: friendlyNameInput,
};
