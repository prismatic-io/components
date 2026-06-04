import type { ActionContext } from "@prismatic-io/spectral";
import { getBase64FromUrl } from "../util";
import type { DriveWatch, SpreadsheetChangeEventsInputs } from "../types";
import { stopWatchWithErrorHandling } from "./stopWatch";
import { createDriveClient } from "../client";

export const spreadsheetChangeEventsDelete = async (
  context: ActionContext,
  { connection }: SpreadsheetChangeEventsInputs,
) => {
  const integrationFlowName = context.flow.name;

  context.logger.info(
    `Started Spreadsheet Change Events Trigger delete for ${integrationFlowName}`,
  );

  const address = context.webhookUrls[integrationFlowName];

  const stateKey = getBase64FromUrl(address);

  const previousWatch = context.crossFlowState[stateKey] as
    | DriveWatch
    | undefined;

  if (previousWatch?.channelId && previousWatch?.resourceId) {
    const drive = createDriveClient(connection);
    await stopWatchWithErrorHandling(
      {
        drive,
        channelId: previousWatch.channelId,
        resourceId: previousWatch.resourceId,
      },
      context.logger,
    );
  } else {
    context.logger.info(
      "No previous Drive watch found in state, nothing to stop",
    );
  }

  delete context.crossFlowState[stateKey];

  context.logger.info(
    `Finished Spreadsheet Change Events Trigger delete for ${integrationFlowName}`,
  );
};
