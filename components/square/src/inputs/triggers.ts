import { squareConnection } from "./common";
import { showNewRecords, showUpdatedRecords } from "./payments";

export const squareWebhookTriggerInputs = {};

export const pollChangesTriggerInputs = {
  squareConnection,
  showNewRecords,
  showUpdatedRecords,
};
