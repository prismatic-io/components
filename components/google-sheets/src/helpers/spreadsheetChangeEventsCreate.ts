import type { ActionContext } from "@prismatic-io/spectral";
import { v4 as uuidv4 } from "uuid";
import type { DriveWatch, SpreadsheetChangeEventsInputs } from "../types";
import { createDriveClient } from "../client";
import { getBase64FromUrl } from "../util";
import { manageWatch } from "./manageWatch";

export const spreadsheetChangeEventsCreate = async (
  context: ActionContext,
  { connection, spreadsheetId }: SpreadsheetChangeEventsInputs,
) => {
  const drive = createDriveClient(connection);
  const integrationFlowName = context.flow.name;
  const address = context.webhookUrls[integrationFlowName];

  const stateKey = getBase64FromUrl(address);

  const newChannelId = uuidv4();
  const previousWatch = context.crossFlowState[stateKey] as
    | DriveWatch
    | undefined;

  context.logger.info(
    `Started Spreadsheet Change Events Trigger deploy for ${integrationFlowName}`,
  );

  context.logger.info(`Creating file watch for spreadsheet ${spreadsheetId}`);

  const watchResult = await manageWatch({
    drive,
    spreadsheetId,
    webhookAddress: address,
    newChannelId,
    logger: context.logger,
    previousWatch,
  });

  context.crossFlowState[stateKey] = watchResult;

  context.logger.info(
    `Finished Spreadsheet Change Events Trigger deploy for ${integrationFlowName}`,
  );
};
