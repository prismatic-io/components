import { pollingTrigger } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollingTriggerInputs } from "../inputs";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
  TimestampedRecord,
} from "../types";
import {
  classifyRecords,
  fetchAllPages,
  hasChanges,
  resolvePollingRecordChanges,
  resolvePollWindow,
} from "./pollingUtils";
export const pollProducts = pollingTrigger({
  display: {
    label: "New and Updated Products",
    description:
      "Retrieves existing and ongoing products for a specified ShipStation account. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollingTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, { connection, lookBackDate }) => {
    const now = new Date().toISOString();
    const state = context.polling.getState() as PollingState | null;
    const window = resolvePollWindow(state, lookBackDate, now);
    const client = createShipStationClient(connection);
    const records = await fetchAllPages<TimestampedRecord>(
      client,
      "/products",
      { startDate: window.after },
      "products",
    );
    const result = classifyRecords(records, window);
    context.polling.setState({ lastPolledAt: now });
    if (!hasChanges(result)) {
      return {
        payload,
        polledNoChanges: true,
      };
    }
    return {
      payload: {
        ...payload,
        body: { data: result },
      },
    };
  },
});
