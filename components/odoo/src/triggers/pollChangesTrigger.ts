import { pollingTrigger } from "@prismatic-io/spectral";
import { createOdooClient } from "../client";
import {
  createOdooAwaitClient,
  fetchOdooRecordsSinceLegacy,
  isLegacyConnection,
} from "../legacy";
import type { OdooRecord, PollingState } from "../types";
import { pollChangesExamplePayload } from "../examplePayloads";
import { fetchOdooRecordsSince } from "../util";
import { pollChangesInputs } from "../inputs";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Polls an Odoo model for records whose `write_date` is at or after the last poll. Records whose `create_date` is also after the last poll go to the `created` bucket; older records modified since the last poll go to `updated`.",
  },
  examplePayload: pollChangesExamplePayload,
  inputs: pollChangesInputs,
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const pollState = context.polling.getState() as PollingState;
    const lastPolledAt = pollState?.lastPolledAt ?? now;

    let records: OdooRecord[];
    let truncated: boolean;
    if (isLegacyConnection(params.connection)) {
      const client = await createOdooAwaitClient(params.connection);
      ({ records, truncated } = await fetchOdooRecordsSinceLegacy(
        client,
        params.model,
        lastPolledAt,
      ));
    } else {
      const client = createOdooClient(params.connection, context.debug.enabled);
      ({ records, truncated } = await fetchOdooRecordsSince(
        client,
        params.model,
        lastPolledAt,
      ));
    }

    
    
    
    
    const lastPolledAtDate = new Date(lastPolledAt);
    const created: OdooRecord[] = [];
    const updated: OdooRecord[] = [];

    for (const record of records) {
      const createValue = record.create_date;
      const createdAtDate =
        typeof createValue === "string"
          ? new Date(`${createValue.replace(" ", "T")}Z`)
          : null;
      const isNew = createdAtDate !== null && createdAtDate > lastPolledAtDate;
      if (isNew && params.showNewRecords) created.push(record);
      else if (!isNew && params.showUpdatedRecords) updated.push(record);
    }

    
    
    
    let nextCursor = now;
    if (truncated) {
      const oldestWriteDate = records[records.length - 1]?.write_date;
      nextCursor =
        typeof oldestWriteDate === "string"
          ? new Date(`${oldestWriteDate.replace(" ", "T")}Z`).toISOString()
          : lastPolledAt;
      context.logger.warn(
        `Polling truncated at the page cap for Odoo ${params.model}. Advancing cursor to ${nextCursor}; next poll will resume from there.`,
      );
    }
    context.polling.setState({ lastPolledAt: nextCursor });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Odoo ${params.model}: ${records.length} fetched, ${created.length} created, ${updated.length} updated, truncated=${truncated}`,
      );
    }

    const totalMatched = created.length + updated.length;
    return {
      payload: { ...payload, body: { data: { created, updated } } },
      polledNoChanges: totalMatched === 0,
    };
  },
});
