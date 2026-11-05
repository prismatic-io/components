import { secretKey } from "./common";
import { lookBackDate, shopifyConnection, webhookTopics } from "./graphql/common";

export const webhookInputs = {
  secret_key: secretKey,
};

export const eventTopicWebhookGqlInputs = {
  shopifyConnection,
  secret_key: secretKey,
  webhookTopics,
};

export const customersPollingTriggerInputs = {
  shopifyConnection,
  lookBackDate,
};

export const ordersPollingTriggerInputs = {
  shopifyConnection,
  lookBackDate,
};

export const productsPollingTriggerInputs = {
  shopifyConnection,
  lookBackDate,
};
