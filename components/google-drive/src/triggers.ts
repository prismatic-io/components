import { pollingTrigger, trigger } from "@prismatic-io/spectral";
import changes from "./actions/changes";
import type { ListChangesResult, SearchRecordsPollingState } from "./interfaces";
import { ancestorName, connection, consolidationStrategy, itemName, triggerEvents } from "./inputs";
import {
  BASE_EXAMPLE_PAYLOAD,
  driveActivityPollingTriggerExamplePayload,
  pollChangesTriggerExamplePayload,
} from "./examplePayloads";
import { createActivityClient } from "./client";
import { cleanItemInput, getQueryDriveActivity } from "./util";
import type { driveactivity_v2 } from "googleapis";

export const pushNotificationWebhook = trigger({
  display: {
    label: "Push Notification Webhook",
    description:
      "Receive and validate webhook requests from Google Drive for webhooks you configure.",
  },
  perform: async (_context, payload) => {
    return Promise.resolve({
      payload,
      response: { statusCode: 200, contentType: "application/json" },
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: { ...BASE_EXAMPLE_PAYLOAD },
});

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Files",
    description:
      "Checks for new and updated files in a specified drive (or all drives, if omitted) on a configured schedule.",
  },
  pollAction: changes.listChanges,
  perform: async (context, payload, params) => {
    const actionReturn = await context.polling.invokeAction(params);
    const data = actionReturn.data as ListChangesResult;
    let polledNoChanges = true;

    if (data.changes.length > 0) {
      polledNoChanges = false;
    }

    return Promise.resolve({
      payload: { ...payload, body: { data } },
      ...(actionReturn.crossFlowState ? { crossFlowState: actionReturn.crossFlowState } : {}),
      ...(actionReturn.instanceState ? { instanceState: actionReturn.instanceState } : {}),
      polledNoChanges,
    });
  },
  examplePayload: { ...pollChangesTriggerExamplePayload },
});

export const driveActivityPollingTrigger = pollingTrigger({
  display: {
    label: "Drive Activity",
    description:
      "Checks for Google Drive activity on a configured schedule. By default yields activity on personal 'My Drive'. For activity on a shared drive, specify a shared drive's folder's 'Folder ID'.",
  },
  inputs: {
    triggerEvents,
    itemName,
    ancestorName: {
      ...ancestorName,
      comments:
        "Return activities for this Drive or folder, plus all children and descendants. You may supply an array of drive or folder IDs.",
      clean: (value) => (Array.isArray(value) ? value : [value]).map(cleanItemInput),
    },
    consolidationStrategy,
    connection,
  },
  perform: async (
    context,
    payload,
    { triggerEvents, connection, ancestorName: ancestors, ...params },
  ) => {
    const pollState = context.polling.getState() as SearchRecordsPollingState;
    const lastPolledAt: string = pollState.lastPolledAt || new Date().toISOString();

    let filter = `time > "${lastPolledAt}"`;
    filter +=
      triggerEvents.length > 0 ? ` AND detail.action_detail_case:(${triggerEvents.join(" ")})` : "";

    const drive = createActivityClient(connection);
    const searchRecords: driveactivity_v2.Schema$DriveActivity[] = [];

    for (const ancestor of ancestors) {
      const actionReturn = await getQueryDriveActivity(
        drive,
        {
          ...params,
          ancestorName: ancestor,
          filter,
        },
        true,
      );
      searchRecords.push(...(actionReturn.activities || []));
    }

    const newLastPolledAtDate = new Date().toISOString();
    context.polling.setState({ lastPolledAt: newLastPolledAtDate });

    return Promise.resolve({
      payload: { ...payload, body: { data: searchRecords } },
      polledNoChanges: searchRecords.length === 0,
    });
  },
  examplePayload: { ...driveActivityPollingTriggerExamplePayload },
});

export default {
  pushNotificationWebhook,
  pollChangesTrigger,
  driveActivityPollingTrigger,
};
