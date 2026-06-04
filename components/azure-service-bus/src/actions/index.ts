import { createOrUpdateNamespaces } from "./createOrUpdateNamespaces";
import { createOrUpdateQueue } from "./createOrUpdateQueue";
import { createOrUpdateRules } from "./createOrUpdateRules";
import { createOrUpdateSubscription } from "./createOrUpdateSubscription";
import { createOrUpdateTopic } from "./createOrUpdateTopic";
import { deleteNamespace } from "./deleteNamespace";
import { deleteQueue } from "./deleteQueue";
import { deleteRule } from "./deleteRule";
import { deleteSubscriptions } from "./deleteSubscriptions";
import { deleteTopic } from "./deleteTopic";
import { getNamespaces } from "./getNamespaces";
import { getQueue } from "./getQueue";
import { getRule } from "./getRule";
import { getSubscriptions } from "./getSubscriptions";
import { getTopic } from "./getTopic";
import { listNamespaces } from "./listNamespaces";
import { listNamespacesByResourceGroup } from "./listNamespacesByResourceGroup";
import { listQueues } from "./listQueues";
import { listRules } from "./listRules";
import { listSubscriptions } from "./listSubscriptions";
import { listSubscriptionsByTopic } from "./listSubscriptionsByTopic";
import { listTopicsByNamespace } from "./listTopicsByNamespace";
import messages from "./messages";
import { rawRequest } from "./rawRequest";

export default {
  createOrUpdateNamespaces,
  createOrUpdateQueue,
  createOrUpdateRules,
  createOrUpdateSubscription,
  createOrUpdateTopic,
  deleteNamespace,
  deleteQueue,
  deleteRule,
  deleteSubscriptions,
  deleteTopic,
  getNamespaces,
  getQueue,
  getRule,
  getSubscriptions,
  getTopic,
  listNamespaces,
  listNamespacesByResourceGroup,
  listQueues,
  listRules,
  listSubscriptions,
  listSubscriptionsByTopic,
  listTopicsByNamespace,
  rawRequest,
  ...messages,
};
