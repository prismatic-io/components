import { pollingTrigger } from "@prismatic-io/spectral";
import { POLL_UNBATCHED_MAX_PAGES, TRIGGER_BATCH_SIZE } from "../../constants";
import { crmPollingTriggerInputs } from "../../inputs";
import type {
  CRMChangesObject,
  CRMPollingCursor,
  CRMPollingState,
  CRMRecordChange,
} from "../../types";
import {
  buildCRMPollingCursor,
  buildCRMPollingState,
  fetchCRMStreamWindow,
  getCRMModifiedOrCreatedRecords,
  mergeCRMPollingFields,
  resolveCRMRecordChanges,
  resolveCRMStream,
  resolvePollingStart,
} from "../../util";
export const contactsPollingTrigger = pollingTrigger({
  display: {
    label: "New and Updated CRM Contacts",
    description:
      "Retrieves existing and ongoing contacts from Zoho CRM. Load history once, check for changes on a schedule, or both.",
  },
  inputs: crmPollingTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): CRMRecordChange[] =>
      resolveCRMRecordChanges(payload.body.data as CRMChangesObject),
    getNextPaginationState: (_context, { payload }): CRMPollingCursor | null =>
      (payload.paginationState as CRMPollingCursor | undefined) ?? null,
  },
  perform: async (context, payload, { connection, fields, lookBackDate }) => {
    const now = new Date();
    const state = (context.polling.getState() ?? {}) as CRMPollingState;
    const incoming = payload.paginationState as CRMPollingCursor | undefined;
    const { sinceDate, isBackfill } = resolvePollingStart(
      state,
      lookBackDate,
      now,
    );
    const stream = resolveCRMStream(state, incoming, now);
    const window = await fetchCRMStreamWindow(context, {
      connection,
      recordType: "Contacts",
      fields: mergeCRMPollingFields(fields),
      sinceDate,
      pageToken: stream.pageToken,
      restartedStream: stream.restartedStream,
      maxPages: context.batch?.enabled === true ? 1 : POLL_UNBATCHED_MAX_PAGES,
    });
    const streamStartedAt = window.restarted ? now : stream.streamStartedAt;
    const changes = getCRMModifiedOrCreatedRecords(
      window.records,
      sinceDate.toISOString(),
    );
    const next = buildCRMPollingCursor(
      window.nextPageToken,
      streamStartedAt,
      window.restarted || stream.restartedStream,
    );
    context.polling.setState(
      buildCRMPollingState(next, streamStartedAt, sinceDate, isBackfill),
    );
    return {
      payload: {
        ...payload,
        paginationState: next ?? undefined,
        body: { data: changes },
      },
      polledNoChanges:
        changes.created.length + changes.updated.length === 0 &&
        !next &&
        !incoming,
    };
  },
});
