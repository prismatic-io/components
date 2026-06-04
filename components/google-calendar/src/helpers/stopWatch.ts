import type { ActionLogger } from "@prismatic-io/spectral";
import type { StopWatchParams } from "../types";

export const stopWatch = async ({
  calendar,
  channelId,
  resourceId,
}: StopWatchParams) => {
  await calendar.channels.stop({
    requestBody: {
      id: channelId,
      resourceId: resourceId,
    },
  });
};

export const stopWatchWithErrorHandling = async (
  params: StopWatchParams,
  logger: ActionLogger
): Promise<void> => {
  try {
    await stopWatch(params);
    logger.info("Previous Calendar watch stopped successfully");
  } catch (err: unknown) {
    const error = err as { errors?: { reason?: string }[]; message?: string };
    logger.warn(
      "Failed to stop previous Calendar watch (continuing):",
      error?.errors?.[0]?.reason || error?.message
    );
  }
};
