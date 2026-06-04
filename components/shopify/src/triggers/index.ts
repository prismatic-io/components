import { customersPollingTrigger } from "./customersPollingTrigger";
import { eventTopicWebhookGql } from "./eventTopicWebhook";
import { ordersPollingTrigger } from "./ordersPollingTrigger";
import { productsPollingTrigger } from "./productsPollingTrigger";
import { eventTopicWebhook, webhook } from "./restTriggers";

export default {
  webhook,
  eventTopicWebhook,
  customersPollingTrigger,
  eventTopicWebhookGql,
  ordersPollingTrigger,
  productsPollingTrigger,
};
