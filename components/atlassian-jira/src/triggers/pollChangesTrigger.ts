import { pollingTrigger } from "@prismatic-io/spectral";
import { createV3Client } from "../connections/auth";
import { TRIGGER_BATCH_SIZE } from "../constants";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type {
  JiraIssueChange,
  JiraIssueChangesObject,
  PollingCursor,
  PollingState,
} from "../types";
import {
  buildPollingCursor,
  buildPollingState,
  fetchStreamWindow,
  partitionIssuesByTimestamp,
  resolveJiraIssueChanges,
  resolvePollingStart,
  resolvePollingStream,
} from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Issues",
    description:
      "Retrieves existing and ongoing issues from Jira. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesInputs,
  allowsBranching: false,
  examplePayload: pollChangesExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): JiraIssueChange[] =>
      resolveJiraIssueChanges(payload.body.data as JiraIssueChangesObject),
    getNextPaginationState: (_context, { payload }): PollingCursor | null =>
      (payload.paginationState as PollingCursor | undefined) ?? null,
  },
  perform: async (
    context,
    payload,
    {
      jiraConnection,
      lookBackDate,
      pollJqlFilter,
      showNewIssues,
      showUpdatedIssues,
    },
  ) => {
    const now = new Date();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const incoming = payload.paginationState as PollingCursor | undefined;
    const {
      nextPageToken,
      streamStartedAt,
      timeZone: heldTimeZone,
    } = resolvePollingStream(state, incoming, pollJqlFilter, now);
    const { sinceDate, isBackfill } = resolvePollingStart(
      state,
      lookBackDate,
      now,
    );

    const skipFetch = !isBackfill && !showNewIssues && !showUpdatedIssues;
    const { timeZone, ...window } = await fetchStreamWindow(
      () => createV3Client(jiraConnection, context.debug.enabled),
      {
        skipFetch,
        heldTimeZone,
        nextPageToken,
        sinceISO: sinceDate.toISOString(),
        additionalJql: pollJqlFilter,
        batching: context.batch?.enabled === true,
        logger: context.logger,
      },
    );

    const { created, updated } = partitionIssuesByTimestamp(
      window.issues,
      sinceDate,
    );
    const result: JiraIssueChangesObject = {
      created: isBackfill || showNewIssues ? created : [],
      updated: isBackfill || showUpdatedIssues ? updated : [],
    };
    const next = buildPollingCursor(
      window.nextPageToken,
      streamStartedAt,
      timeZone,
      pollJqlFilter,
    );

    context.polling.setState(
      buildPollingState(next, streamStartedAt, sinceDate, isBackfill),
    );

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Jira issues since ${sinceDate.toISOString()}: ${window.issues.length} read → ${created.length} new, ${updated.length} updated, ${next === null ? "stream drained" : "more pending"}`,
      );
    }

    return {
      payload: {
        ...payload,
        paginationState: next ?? undefined,
        body: { data: result },
      },
      polledNoChanges:
        result.created.length === 0 &&
        result.updated.length === 0 &&
        next === null &&
        !incoming,
    };
  },
});
