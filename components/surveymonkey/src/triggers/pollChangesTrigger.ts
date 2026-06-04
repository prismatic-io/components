import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesInputs } from "../inputs";
import type { PollingState, SurveyResponseDetails } from "../types";
import { paginateResults, toSurveyMonkeyDate } from "../util";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated survey responses in SurveyMonkey on a configured schedule. New responses are emitted on the created branch and previously created responses that changed are emitted on the updated branch. Requires the responses_read_detail scope, available on paid SurveyMonkey plans.",
  },
  examplePayload: pollChangesTriggerExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    
    
    
    const client = createClient(params.connection, context.debug.enabled);
    const response = await paginateResults<SurveyResponseDetails>(
      client,
      `/surveys/${params.surveyId}/responses/bulk`,
      true,
      {
        start_modified_at: toSurveyMonkeyDate(lastPolledAt),
        sort_by: "date_modified",
        sort_order: "ASC",
      },
    );
    const records = response.data ?? [];

    
    
    
    
    const lastPolledAtDate = new Date(lastPolledAt);
    const created: SurveyResponseDetails[] = [];
    const updated: SurveyResponseDetails[] = [];

    for (const record of records) {
      const createdValue = record.date_created;
      const createdAtDate =
        typeof createdValue === "string" ? new Date(createdValue) : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && params.showNewRecords !== false) created.push(record);
      else if (!isNew && params.showUpdatedRecords !== false)
        updated.push(record);
    }

    context.polling.setState({ lastPolledAt: now });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled SurveyMonkey survey ${params.surveyId}: ${records.length} fetched, ${created.length} created, ${updated.length} updated`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
