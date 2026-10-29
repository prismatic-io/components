import { pollingTrigger } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { TRIGGER_BATCH_SIZE } from "../constants";
import { raasReportPollingTriggerExamplePayload } from "../examplePayloads";
import { raasReportPollingInputs } from "../inputs";
import type {
  PollingState,
  RecordChange,
  RecordChangesObject,
  WatermarkFormat,
} from "../types";
import {
  buildRaasPollingUrl,
  fetchRaasReportRows,
  formatRaasWatermark,
  getBaseUrl,
  getPollingWindow,
  resolveRecordChanges,
  selectChangedRecords,
} from "../util";

export const raasReportPollingTrigger = pollingTrigger({
  display: {
    label: "Changed RaaS Report Rows",
    description:
      "Retrieves existing and ongoing rows for a specified Workday RaaS report. Load history once, check for changes on a schedule, or both.",
  },
  examplePayload: raasReportPollingTriggerExamplePayload,
  inputs: raasReportPollingInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: TRIGGER_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): RecordChange[] =>
      resolveRecordChanges(payload.body.data as RecordChangesObject),
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();
    const state = (context.polling.getState() ?? {}) as PollingState;
    const window = getPollingWindow(state, params.lookBackDate, now);
    const url = buildRaasPollingUrl(
      params.reportUrl,
      getBaseUrl(params.connection),
      params.prompts,
      params.watermarkPrompt,
      formatRaasWatermark(
        window.since,
        params.watermarkFormat as WatermarkFormat,
      ),
    );
    const client = getClient(
      params.connection,
      context.debug.enabled,
      url.origin,
    );
    const rows = await fetchRaasReportRows(client, url);
    const { changed, seen } = selectChangedRecords(
      rows,
      params.recordKeyField,
      window,
      state.seen,
      context.logger,
    );
    context.polling.setState({ lastPolledAt: now, seen });

    if (context.debug.enabled) {
      context.logger.debug(
        `Polled RaaS report from ${window.since}: ${rows.length} rows, ${changed.length} changed`,
      );
    }

    return {
      payload: { ...payload, body: { data: { changed } } },
      polledNoChanges: changed.length === 0,
    };
  },
});
