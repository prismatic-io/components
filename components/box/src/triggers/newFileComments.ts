import { pollingTrigger, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { newFileCommentsInputs } from "../inputs";
import type { BoxCommentChange, BoxCommentChangesObject } from "../types";
import {
  computeNewEntries,
  getAllFileComments,
  getLastPolledAt,
  normalizeDatesBetweenEntries,
  resolveCommentChanges,
} from "../util";

export const newFileComments = pollingTrigger({
  display: {
    label: "New File Comments",
    description:
      "Retrieves existing and ongoing comments on a specified Box file. Load history once, check for changes on a schedule, or both.",
  },
  inputs: newFileCommentsInputs,
  allowsBranching: false,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): BoxCommentChange[] =>
      resolveCommentChanges(payload.body.data as BoxCommentChangesObject),
  },
  perform: async (context, payload, { connection, fileId, lookBackDate }) => {
    const now = new Date().toISOString();
    const client = createAuthorizedClient({ boxConnection: connection });
    const lastPolledAt = getLastPolledAt(context, lookBackDate || now);

    context.logger.debug(
      `Polling for comments from: ${lastPolledAt} to ${now}`,
    );

    const allComments = await getAllFileComments(
      client,
      util.types.toString(fileId),
    );

    context.logger.info(`Polled ${allComments.length} comments`);

    context.logger.info("Normalizing comment dates...");
    const normalizedComments = normalizeDatesBetweenEntries(
      allComments as { created_at?: string; modified_at?: string }[],
    );

    context.logger.info("Computing new comments...");
    const newComments = computeNewEntries(normalizedComments, lastPolledAt);

    context.logger.info("Setting polling state...");
    context.polling.setState({ lastPolledAt: now });
    return {
      payload: {
        ...payload,
        body: {
          data: {
            newComments: {
              data: newComments,
            },
          },
        },
      },
      polledNoChanges: newComments.length === 0,
    };
  },
});
