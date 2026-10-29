import { pollingTrigger } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { MS_PER_MINUTE, TRIGGER_BATCH_SIZE } from "../constants";
import { wqlQueryPollingTriggerExamplePayload } from "../examplePayloads";
import { wqlQueryPollingInputs } from "../inputs";
import type { PollingState, RecordChange, RecordChangesObject } from "../types";
import {
  advanceWqlWatermark,
  applyWqlWatermark,
  assertWqlWindowComplete,
  buildWqlPath,
  getConnectionTenant,
  getWqlWindow,
  queryWqlAll,
  resolveRecordChanges,
  selectChangedRecords,
} from "../util";

export const wqlQueryPollingTrigger = pollingTrigger({
  display: {
    label: "Changed WQL Query Rows",
    description:
      "Retrieves existing and ongoing rows for a specified Workday WQL query. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: wqlQueryPollingTriggerExamplePayload,
  inputs: wqlQueryPollingInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): RecordChange[] =>
      resolveRecordChanges(payload.body.data as RecordChangesObject),
  },
  perform: async (context, payload, params) => {
    const tenant = params.tenant || getConnectionTenant(params.connection);
    if (!tenant) {
      throw new Error(
        "Tenant is required when the connection doesn't include one. Enter the Workday tenant name.",
      );
    }
    const now = new Date().toISOString();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const overlapMs = (params.overlapMinutes ?? 0) * MS_PER_MINUTE;
    const window = getWqlWindow(state, params.lookBackDate, now, overlapMs);

    const client = getClient(params.connection, context.debug.enabled);
    const response = await queryWqlAll(
      client,
      buildWqlPath(tenant),
      applyWqlWatermark(params.query, window.since),
    );
    assertWqlWindowComplete(response, window.isInitialSync);
    const rows = response.data as Record<string, unknown>[];
    const { changed } = selectChangedRecords(
      rows,
      params.recordKeyField,
      window,
      state.seen,
      context.logger,
    );
    const cursor = advanceWqlWatermark(
      rows,
      {
        dateField: params.dateField,
        recordKeyField: params.recordKeyField,
        floor: state.watermark ?? window.since,
        overlapMs,
      },
      context.logger,
    );
    context.polling.setState({
      watermark: cursor.watermark,
      seen: cursor.seen ?? state.seen ?? [],
    });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled WQL query from ${window.since}: ${response.data.length} rows, ${changed.length} changed`,
      );
    }

    return {
      payload: { ...payload, body: { data: { changed } } },
      polledNoChanges: changed.length === 0,
    };
  },
});
