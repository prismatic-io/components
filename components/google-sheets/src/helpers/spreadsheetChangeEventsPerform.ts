import {
  type ActionContext,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import { getBase64FromUrl } from "../util";
import { createDriveClient, createClient } from "../client";
import { v4 as uuidv4 } from "uuid";
import type { DriveWatch, SpreadsheetChangeEventsInputs } from "../types";
import { manageWatch } from "./manageWatch";

export const spreadsheetChangeEventsPerform = async (
  context: ActionContext,
  payload: TriggerPayload,
  { connection, spreadsheetId }: SpreadsheetChangeEventsInputs,
) => {
  const headers = util.types.lowerCaseHeaders(payload.headers);
  const invokeType = headers["prismatic-invoke-type"];
  const integrationFlowName = context.flow.name;
  const address = context.webhookUrls[integrationFlowName];
  const stateKey = getBase64FromUrl(address);
  const previousWatch = context.crossFlowState[stateKey] as
    | DriveWatch
    | undefined;

  if (!previousWatch) {
    throw new Error("No previous watch found in state");
  }

  if (invokeType === "Scheduled") {
    if (context.debug.enabled)
      context.logger.info("Scheduled renewal triggered");

    const drive = createDriveClient(connection);
    const newChannelId = uuidv4();

    const watchResult = await manageWatch({
      drive,
      spreadsheetId,
      webhookAddress: address,
      newChannelId,
      logger: context.logger,
      previousWatch,
    });

    context.crossFlowState[stateKey] = watchResult;

    payload.body.data = watchResult;

    return {
      payload,
      branch: "Log Messages",
      response: { statusCode: 200, contentType: "application/json" },
    };
  }

  let changeDetails = null;

  const resourceState = headers["x-goog-resource-state"];
  const resourceId = headers["x-goog-resource-id"];
  const changedFields = headers["x-goog-changed"];
  const channelId = headers["x-goog-channel-id"];

  const isValidChannel = channelId === previousWatch.channelId;
  const isValidResource = resourceId === previousWatch.resourceId;

  if (!isValidChannel || !isValidResource) {
    throw new Error(
      "Unauthorized webhook call: Channel or resource ID mismatch",
    );
  }

  if (resourceState === "sync") {
    if (context.debug.enabled)
      context.logger.info("Sync notification received");

    payload.body.data = {
      notification: {
        resourceState,
        resourceId,
        timestamp: new Date().toISOString(),
        type: "sync",
      },
    };

    return {
      payload,
      branch: "Log Messages",
      response: { statusCode: 200, contentType: "application/json" },
    };
  }

  if (context.debug.enabled) context.logger.info("Notification received");

  if (resourceState === "remove") {
    changeDetails = {
      spreadsheet: null,
      file: null,
      notification: {
        resourceState,
        changedFields,
        resourceId,
        timestamp: new Date().toISOString(),
      },
    };
  } else {
    const drive = createDriveClient(connection);
    const fileResponse = await drive.files.get({
      fileId: spreadsheetId,
      fields: "id,name,modifiedTime,lastModifyingUser,webViewLink,size",
    });

    let spreadsheetInfo = null;

    const sheetsClient = await createClient(spreadsheetId, connection);

    const sheets = sheetsClient.sheetsByIndex.map((sheet) => ({
      title: sheet.title,
      sheetId: sheet.sheetId,
      rowCount: sheet.rowCount,
      columnCount: sheet.columnCount,
    }));

    spreadsheetInfo = {
      title: sheetsClient.title,
      spreadsheetId: sheetsClient.spreadsheetId,
      worksheets: sheets,
      worksheetCount: sheets.length,
    };

    changeDetails = {
      spreadsheet: spreadsheetInfo,
      file: {
        name: fileResponse.data.name,
        modifiedTime: fileResponse.data.modifiedTime,
        lastModifyingUser: fileResponse.data.lastModifyingUser,
        webViewLink: fileResponse.data.webViewLink,
        size: fileResponse.data.size,
      },
      notification: {
        resourceState,
        changedFields,
        resourceId,
        timestamp: new Date().toISOString(),
      },
    };
  }

  payload.body.data = changeDetails;

  return {
    payload,
    branch: "Push Notifications",
    response: { statusCode: 200, contentType: "application/json" },
  };
};
