import { createWebhook } from "./createWebhook";
import { deleteWebhookAction } from "./deleteWebhookAction";
import { getWebhook } from "./getWebhook";
import { listWebhooks } from "./listWebhooks";
import { testWebhook } from "./testWebhook";
import { updateWebhook } from "./updateWebhook";
export default {
  createWebhook,
  deleteWebhook: deleteWebhookAction,
  getWebhook,
  listWebhooks,
  updateWebhook,
  testWebhook,
};
