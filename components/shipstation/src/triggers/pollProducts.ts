import { pollingTrigger } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { pollingTriggerInputs } from "../inputs";
import type { PollingState, TimestampedRecord } from "../types";
import {
  fetchAllPages,
  getModifiedOrCreatedRecords,
  hasChanges,
} from "./pollingUtils";

export const pollProducts = pollingTrigger({
  display: {
    label: "New and Updated Products",
    description:
      "Checks for new and updated products in ShipStation on a configured schedule.",
  },
  inputs: pollingTriggerInputs,
  perform: async (context, payload, { connection }) => {
    const state = (context.polling.getState() as PollingState) || {};
    const lastPolledAt = state.lastPolledAt || new Date().toISOString();

    const client = createShipStationClient(connection);

    const records = await fetchAllPages<TimestampedRecord>(
      client,
      "/products",
      { startDate: lastPolledAt },
      "products",
    );

    const result = getModifiedOrCreatedRecords(records, lastPolledAt);

    context.polling.setState({ lastPolledAt: new Date().toISOString() });

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
