import { pollingTrigger } from "@prismatic-io/spectral";
import { getAdobeSignClient } from "../client";
import { POLL_BOOTSTRAP_WINDOW_MS } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { PollingState } from "../types";
import {
  fetchAgreementsModifiedSince,
  partitionAgreementsByTimestamp,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Agreements",
    description:
      "Checks for new and updated agreements in Adobe Acrobat Sign on a configured schedule.",
  },
  inputs: pollChangesInputs,
  perform: async (
    context,
    payload,
    { connection, showNewRecords, showUpdatedRecords },
  ) => {
    const now = new Date();
    const lastState = context.polling.getState() as PollingState | undefined;
    
    
    const lastPolledAt =
      lastState?.lastPolledAt ??
      new Date(now.getTime() - POLL_BOOTSTRAP_WINDOW_MS).toISOString();
    const sinceDate = new Date(lastPolledAt);

    const client = getAdobeSignClient(connection, context.debug.enabled);
    const { records, truncated, latestModifiedDate } =
      await fetchAgreementsModifiedSince(client, lastPolledAt);

    const { created, updated } = partitionAgreementsByTimestamp(
      records,
      sinceDate,
    );

    
    
    
    
    
    const nextLastPolledAt =
      truncated && latestModifiedDate ? latestModifiedDate : now.toISOString();
    context.polling.setState({ lastPolledAt: nextLastPolledAt });

    const result = {
      created: showNewRecords ? created : [],
      updated: showUpdatedRecords ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled agreements: ${records.length} fetched → ${created.length} new, ${updated.length} updated (truncated=${truncated})`,
      );
      if (truncated) {
        context.logger.warn(
          `Page cap reached during poll; cursor advanced to newest fetched modifiedDate: ${latestModifiedDate ?? "<unknown>"}`,
        );
      }
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges: result.created.length + result.updated.length === 0,
    };
  },
  examplePayload: pollChangesTriggerExamplePayload,
});
