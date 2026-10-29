import { util } from "@prismatic-io/spectral";
import type { DriveWatch, ManageWatchParams } from "../types";
import { stopWatchWithErrorHandling } from "./stopWatch";

export const manageWatch = async ({
  drive,
  spreadsheetId,
  webhookAddress,
  newChannelId,
  previousWatch,
  logger,
}: ManageWatchParams): Promise<DriveWatch> => {
  if (previousWatch?.channelId && previousWatch?.resourceId) {
    await stopWatchWithErrorHandling(
      {
        drive,
        channelId: previousWatch.channelId,
        resourceId: previousWatch.resourceId,
      },
      logger,
    );
  }
  const expiration = Date.now() + 7 * 24 * 60 * 60 * 1000;
  try {
    const res = await drive.files.watch({
      fileId: spreadsheetId,
      requestBody: {
        id: newChannelId,
        type: "web_hook",
        address: webhookAddress,
        expiration: util.types.toString(expiration),
      },
    });

    logger.info("New Drive watch created successfully");

    if (!res.data.id || !res.data.resourceId || !res.data.expiration) {
      throw new Error("Drive watch creation returned incomplete data");
    }

    return {
      channelId: res.data.id,
      resourceId: res.data.resourceId,
      expiration: res.data.expiration,
    };
  } catch (error) {
    logger.error(
      "Failed to create Drive watch. Does the spreadsheet still exist?",
    );
    throw error;
  }
};
