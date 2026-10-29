import { connection } from "./common";
import { webhookCustomHeaders, webhookName, webhookPayload } from "./webhooks";

export const webhookInputs = {
  connection,
  webhookName,
  webhookPayload,
  webhookCustomHeaders,
};
