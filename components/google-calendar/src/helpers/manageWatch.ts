import { util } from "@prismatic-io/spectral";
import type { CalendarWatch, ManageWatchParams } from "../types";
import { stopWatchWithErrorHandling } from "./stopWatch";

export const manageWatch = async ({
  calendar,
  calendarId,
  webhookAddress,
  newChannelId,
  previousWatch,
  logger,
}: ManageWatchParams): Promise<CalendarWatch> => {
  if (previousWatch?.channelId && previousWatch?.resourceId) {
    await stopWatchWithErrorHandling(
      {
        calendar,
        channelId: previousWatch.channelId,
        resourceId: previousWatch.resourceId,
      },
      logger
    );
  }
  const expiration = Date.now() + 7 * 24 * 60 * 60 * 1000;
  try {
    const res = await calendar.events.watch({
      calendarId,
      requestBody: {
        id: newChannelId,
        type: "web_hook",
        address: webhookAddress,
        expiration: util.types.toString(expiration),
      },
    });

    logger.info("New Calendar watch created successfully");

    if (!res.data.id || !res.data.resourceId || !res.data.expiration) {
      throw new Error("Calendar watch creation returned incomplete data");
    }

    return {
      channelId: res.data.id,
      resourceId: res.data.resourceId,
      expiration: res.data.expiration,
    };
  } catch (error) {
    logger.error(
      "Failed to create Calendar watch. Does the calendar still exist?"
    );
    throw error;
  }
};
