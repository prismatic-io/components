import { createWebhook } from "./create";
import { deleteWebhookAction } from "./delete";
import { getWebhook } from "./get";
import { listWebhooks } from "./list";
import { updateWebhook } from "./update";
import { testWebhook } from "./test";

export default {
  createWebhook,
  deleteWebhook: deleteWebhookAction,
  getWebhook,
  listWebhooks,
  updateWebhook,
  testWebhook,
};
