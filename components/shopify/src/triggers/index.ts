import { customersPollingTrigger } from "./customersPollingTrigger";
import { eventTopicWebhookGql } from "./eventTopicWebhook";
import { ordersPollingTrigger } from "./ordersPollingTrigger";
import { productsPollingTrigger } from "./productsPollingTrigger";
import { webhook } from "./restTriggers";
export default {
  webhook,
  customersPollingTrigger,
  eventTopicWebhookGql,
  ordersPollingTrigger,
  productsPollingTrigger,
};
