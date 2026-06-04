import {
  connectionInput,
  eventAction,
  eventObject,
  httpAuthPassword,
  httpAuthUser,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
  webhookUserId,
  webhookVersion,
} from "./common";

export const pipedriveTriggerInputs = {
  connection: connectionInput,
  version: webhookVersion,
  eventAction,
  eventObject,
  userId: webhookUserId,
  httpAuthUser,
  httpAuthPassword,
};

export const pollChangesTriggerInputs = {
  connection: connectionInput,
  resourceType: pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
