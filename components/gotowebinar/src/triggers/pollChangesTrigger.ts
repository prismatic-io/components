import { pollingTrigger } from "@prismatic-io/spectral";
import { createGotoWebinarClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { connection, lookBackDate, webinarKey } from "../inputs";
import type {
  PollingChangesObject,
  PollingRecordChange,
  PollingState,
} from "../types";
import {
  fetchAllRegistrants,
  filterRegistrantsRegisteredAfter,
  lookBackDateToCursor,
  resolvePollingRecordChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New Registrants",
    description:
      "Retrieves existing and ongoing registrants for a specified GoTo Webinar webinar. Load history once, check for changes on a schedule, or both.",
  },
  inputs: { connection, webinarKey, lookBackDate },
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollingRecordChange[] =>
      resolvePollingRecordChanges(payload.body.data as PollingChangesObject),
  },
  perform: async (context, payload, params) => {
    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();
    const lastPolledAt =
      pollState?.lastPolledAt ||
      (params.lookBackDate ? lookBackDateToCursor(params.lookBackDate) : "");
    if (!lastPolledAt) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created: [] } } },
        polledNoChanges: true,
      };
    }
    const { client, organizerKey } = createGotoWebinarClient(
      params.connection,
      context.debug.enabled,
    );
    const registrants = await fetchAllRegistrants(
      client,
      organizerKey,
      params.webinarKey,
    );
    const newRegistrants = filterRegistrantsRegisteredAfter(
      registrants,
      lastPolledAt,
    );
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled GoToWebinar registrants (webinar ${params.webinarKey}): ${registrants.length} fetched, ${newRegistrants.length} new`,
      );
    }
    return {
      payload: { ...payload, body: { data: { created: newRegistrants } } },
      polledNoChanges: newRegistrants.length === 0,
    };
  },
});
