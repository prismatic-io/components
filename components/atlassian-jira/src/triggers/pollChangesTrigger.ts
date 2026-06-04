import { pollingTrigger } from "@prismatic-io/spectral";
import { createV3Client } from "../connections/auth";
import { pollChangesExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { JiraIssue, PollingState } from "../types";
import { fetchUpdatedIssuesSince, partitionIssuesByTimestamp } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Issues",
    description:
      "Checks for new and updated issues in Jira on a configured schedule, separated into new and updated buckets using JQL on /search/jql.",
  },
  inputs: pollChangesInputs,
  allowsBranching: false,
  examplePayload: pollChangesExamplePayload,
  perform: async (
    context,
    payload,
    { jiraConnection, pollJqlFilter, showNewIssues, showUpdatedIssues },
  ) => {
    const now = new Date();
    const pollState = context.polling.getState() as PollingState | undefined;
    const sinceISO = pollState?.lastPolledAt ?? now.toISOString();
    const sinceDate = new Date(sinceISO);

    const skipFetch = !showNewIssues && !showUpdatedIssues;
    const issues: JiraIssue[] = skipFetch
      ? []
      : await fetchUpdatedIssuesSince(
          await createV3Client(jiraConnection, context.debug.enabled),
          sinceISO,
          pollJqlFilter,
        );

    const { created, updated } = partitionIssuesByTimestamp(issues, sinceDate);

    context.polling.setState({
      lastPolledAt: now.toISOString(),
    } as Record<string, unknown>);

    const result = {
      created: showNewIssues ? created : [],
      updated: showUpdatedIssues ? updated : [],
    };

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Jira issues since ${sinceISO}: ${issues.length} total → ${created.length} new, ${updated.length} updated`,
      );
    }

    return {
      payload: { ...payload, body: { data: result } },
      polledNoChanges: result.created.length === 0 && result.updated.length === 0,
    };
  },
});
