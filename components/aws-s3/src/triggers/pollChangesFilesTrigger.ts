import { pollingTrigger } from "@prismatic-io/spectral";
import { createS3Client } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesFilesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesFilesTriggerInputs } from "../inputs";
import type {
  FileListingCursor,
  PolledFileChange,
  PollingState,
} from "../types";
import {
  listObjectsInWindow,
  resolveFileListingWindow,
  resolvePolledFileChanges,
} from "../utils";
export const pollChangesFilesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Files",
    description:
      "Checks for new and updated files in a specified S3 bucket on a configured schedule.",
  },
  inputs: pollChangesFilesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PolledFileChange[] =>
      resolvePolledFileChanges(payload.body.data as string[] | undefined),
    getNextPaginationState: (_context, { payload }): FileListingCursor | null =>
      (payload.paginationState as FileListingCursor | undefined) ?? null,
  },
  perform: async (
    context,
    payload,
    {
      accessKey,
      awsRegion,
      bucket,
      lookBackDate,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
    },
  ) => {
    const isBatching = context.batch?.enabled === true;
    const incoming = payload.paginationState as FileListingCursor | undefined;
    const state = context.polling.getState() as PollingState;
    const window = resolveFileListingWindow(
      state,
      incoming,
      isBatching,
      lookBackDate,
      new Date().toISOString(),
    );
    const windowIsEmpty = window.windowStart >= window.windowEnd;
    const s3 = await createS3Client({
      awsConnection: accessKey,
      awsRegion,
      dynamicAccessKeyId,
      dynamicSecretAccessKey,
      dynamicSessionToken,
      logger: context.logger,
      debug: context.debug.enabled,
    });
    const { keys, startAfter } = windowIsEmpty
      ? { keys: [], startAfter: undefined }
      : await listObjectsInWindow(s3, bucket, window, isBatching);
    const nextCursor: FileListingCursor | undefined = startAfter
      ? {
          windowStart: window.windowStart,
          windowEnd: window.windowEnd,
          startAfter,
        }
      : undefined;
    context.polling.setState(
      nextCursor
        ? {
            ...(state.lastPolledAt ? { lastPolledAt: state.lastPolledAt } : {}),
            cursor: nextCursor,
          }
        : {
            lastPolledAt: windowIsEmpty ? window.windowStart : window.windowEnd,
          },
    );
    if (context.debug.enabled) {
      context.logger.debug(
        `Listed ${bucket} from ${window.startAfter ?? "the first key"}: ${keys.length} keys modified between ${window.windowStart} and ${window.windowEnd}; ${nextCursor ? "more pages remain" : "window exhausted"}`,
      );
    }
    return {
      payload: {
        ...payload,
        paginationState: nextCursor,
        body: { data: keys },
      },
      polledNoChanges: keys.length === 0 && !nextCursor && !incoming,
    };
  },
  examplePayload: pollChangesFilesTriggerExamplePayload,
});
