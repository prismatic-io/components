import { customersPollingTrigger } from "./customersPollingTrigger";
import { eventTopicWebhookGql } from "./eventTopicWebhookGql";
import { ordersPollingTrigger } from "./ordersPollingTrigger";
import { productsPollingTrigger } from "./productsPollingTrigger";
import { webhook } from "./webhook";

export default {
  webhook,
  customersPollingTrigger,
  eventTopicWebhookGql,
  ordersPollingTrigger,
  productsPollingTrigger,
};
