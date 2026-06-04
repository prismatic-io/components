import type { ActionLogger } from "@prismatic-io/spectral";
import type { StopWatchParams } from "../types";

export const stopWatch = async ({
  drive,
  channelId,
  resourceId,
}: StopWatchParams) => {
  await drive.channels.stop({
    requestBody: {
      id: channelId,
      resourceId: resourceId,
    },
  });
};

export const stopWatchWithErrorHandling = async (
  params: StopWatchParams,
  logger: ActionLogger,
): Promise<void> => {
  try {
    await stopWatch(params);
    logger.info("Previous Drive watch stopped successfully");
  } catch (err: unknown) {
    const error = err as { errors?: { reason?: string }; message?: string };
    
    
    
    logger.warn(
      "Failed to stop previous Drive watch (continuing):",
      error?.errors?.[0]?.reason || error?.message,
    );
  }
};
