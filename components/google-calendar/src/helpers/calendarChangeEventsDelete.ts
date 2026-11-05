import type { ActionContext } from "@prismatic-io/spectral";
import { createClient } from "../client";
import type { CalendarChangeEventsInputs, CalendarWatch } from "../types";
import { getBase64FromUrl } from "../utils";
import { stopWatchWithErrorHandling } from "./stopWatch";

export const calendarChangeEventsDelete = async (
  context: ActionContext,
  { connection }: CalendarChangeEventsInputs
) => {
  const integrationFlowName = context.flow.name;

  context.logger.info(
    `Started Calendar Change Events Trigger delete for ${integrationFlowName}`
  );

  const address = context.webhookUrls[integrationFlowName];

  const stateKey = getBase64FromUrl(address);
  const syncStateKey = `${stateKey}_syncToken`;
  const lastListExecutedAtStateKey = `${stateKey}_lastListExecutedAt`;

  const previousWatch = context.crossFlowState[stateKey] as
    | CalendarWatch
    | undefined;

  if (previousWatch?.channelId && previousWatch?.resourceId) {
    const calendar = createClient({ connection });
    await stopWatchWithErrorHandling(
      {
        calendar,
        channelId: previousWatch.channelId,
        resourceId: previousWatch.resourceId,
      },
      context.logger
    );
  } else {
    context.logger.info(
      "No previous Calendar watch found in state, nothing to stop"
    );
  }

  delete context.crossFlowState[stateKey];
  delete context.crossFlowState[syncStateKey];
  delete context.crossFlowState[lastListExecutedAtStateKey];

  context.logger.info(
    `Finished Calendar Change Events Trigger delete for ${integrationFlowName}`
  );
};
