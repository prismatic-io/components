import { connection, topicName } from "./general";
import { subscriptionId, resourceGroupName } from "./eventSubscriptions";

export const selectSubscriptionInputs = {
  connection,
  topicName,
  subscriptionId,
  resourceGroupName,
};
