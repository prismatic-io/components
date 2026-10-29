import { awsRegion, connectionInput, marker, maxItems, name } from "./common";

const triggerName = { ...name, dataSource: "selectTrigger" };

export const listTriggersInputs = {
  awsRegion,
  maxItems,
  marker,
  awsConnection: connectionInput,
};

export const startTriggerInputs = {
  awsRegion,
  name: triggerName,
  awsConnection: connectionInput,
};

export const stopTriggerInputs = {
  awsRegion,
  name: triggerName,
  awsConnection: connectionInput,
};
