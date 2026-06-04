import { createWebhookSubscription } from "./create";
import { deleteWebhookSubscription } from "./delete";
import { deleteAllInstanceWebhooks } from "./deleteAllInstanceWebhooks";
import { enableWebhookSubscription } from "./enable";
import { getWebhookSubscription } from "./get";
import { listWebhookSubscriptions } from "./list";
import { testWebhookSubscription } from "./test";
import { updateWebhookSubscription } from "./update";

export default {
  createWebhookSubscription,
  listWebhookSubscriptions,
  getWebhookSubscription,
  updateWebhookSubscription,
  deleteWebhookSubscription,
  enableWebhookSubscription,
  testWebhookSubscription,
  deleteAllInstanceWebhooks,
};
