import type { ActionContext } from "@prismatic-io/spectral";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "../client";
import type { CalendarChangeEventsInputs, CalendarWatch } from "../types";
import { getBase64FromUrl } from "../utils";
import { listAllEvents } from "./listAllEvents";
import { manageWatch } from "./manageWatch";

export const calendarChangeEventsCreate = async (
  context: ActionContext,
  { connection, calendarId }: CalendarChangeEventsInputs
) => {
  const calendar = createClient({ connection });
  const integrationFlowName = context.flow.name;
  const address = context.webhookUrls[integrationFlowName];

  const stateKey = getBase64FromUrl(address);

  const newChannelId = uuidv4();
  const previousWatch = context.crossFlowState[stateKey] as
    | CalendarWatch
    | undefined;

  context.logger.info(
    `Started Calendar Change Events Trigger deploy for ${integrationFlowName}`
  );

  context.logger.info(`Creating watch for calendar ${calendarId}`);

  const watchResult = await manageWatch({
    calendar,
    calendarId,
    webhookAddress: address,
    newChannelId,
    logger: context.logger,
    previousWatch,
  });

  context.crossFlowState[stateKey] = watchResult;

  context.logger.info("Establishing initial sync token for incremental sync");

  const syncStateKey = `${stateKey}_syncToken`;
  const lastListExecutedAtStateKey = `${stateKey}_lastListExecutedAt`;

  try {
    const response = await listAllEvents({
      googleConnection: connection,
      calendarId,
      fetchAll: true,
      singleEvents: true,
      showDeleted: true,
    });

    if (response.data.nextSyncToken) {
      
      context.crossFlowState[syncStateKey] = response.data.nextSyncToken;
      context.crossFlowState[lastListExecutedAtStateKey] =
        new Date().toISOString();
      context.logger.info(
        "Initial sync token established. Future notifications will track changes from this point."
      );
    } else {
      throw new Error("No sync token found");
    }
  } catch (error) {
    context.logger.error(
      "Failed to establish initial sync token:",
      error instanceof Error ? error.message : "Unknown error"
    );
    throw error;
  }

  context.logger.info(
    `Finished Calendar Change Events Trigger deploy for ${integrationFlowName}`
  );
};
