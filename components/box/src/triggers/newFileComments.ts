import { pollingTrigger } from "@prismatic-io/spectral";
import { connectionInput, fileIdInput } from "../inputs";
import { createAuthorizedClient } from "../client";
import {
  computeNewEntries,
  getLastPolledAt,
  normalizeDatesBetweenEntries,
} from "../utils";

export const newFileComments = pollingTrigger({
  display: {
    label: "New File Comments",
    description:
      "Checks for new comments on a specified file on a configured schedule.",
  },
  inputs: { connection: connectionInput, fileId: fileIdInput },
  allowsBranching: false,
  perform: async (context, payload, { connection, fileId }) => {
    const now = new Date().toISOString();
    const client = createAuthorizedClient({ boxConnection: connection });
    const lastPolledAt = getLastPolledAt(context, now);

    context.logger.debug(
      `Polling for comments from: ${lastPolledAt} to ${now}`,
    );

    
    const response = await client.files.getComments(fileId, {
      fields: "created_at,id,message",
    });

    context.logger.info("Polled comments: ", JSON.stringify(response, null, 2));

    
    context.logger.info("Normalizing comment dates...");
    const normalizedComments = normalizeDatesBetweenEntries(
      response.entries || [],
    );

    context.logger.info("Computing new comments...");
    const newComments = computeNewEntries(normalizedComments, lastPolledAt);

    context.logger.info("Setting polling state...");
    context.polling.setState({ lastPolledAt: now });
    return {
      payload: {
        ...payload,
        data: {
          newComments: {
            data: newComments,
          },
        },
      },
      polledNoChanges: newComments.length === 0,
    };
  },
});
