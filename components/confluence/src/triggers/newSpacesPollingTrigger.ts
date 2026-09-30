import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  DEFAULT_BATCH_SIZE,
  DEFAULT_PAGE_LIMIT,
  SPACES_URL,
  SPACES_URL_REGEX,
} from "../constants";
import { newSpacesPollingTriggerExamplePayload } from "../examplePayloads";
import { newSpacesPollingTriggerInputs } from "../inputs";
import type { Space, SpaceRecordChange } from "../types";
import { paginateResults, resolveSpaceRecordChanges } from "../util";
import type { PollingState } from "./interfaces";
import { buildPollingResult, filterByDate, getCreatedAt } from "./utils";
export const newSpacesPollingTrigger = pollingTrigger({
  display: {
    label: "New Spaces",
    description:
      "Retrieves existing and ongoing spaces from Confluence. Load history once, check for changes on a schedule, or both.",
  },
  inputs: newSpacesPollingTriggerInputs,
  examplePayload: newSpacesPollingTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): SpaceRecordChange[] =>
      resolveSpaceRecordChanges(payload.body.data as Space[]),
  },
  perform: async (context, payload, { connectionInput, lookBackDate }) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as PollingState;
    if (!lastState?.lastPolled) {
      const seedDate = lookBackDate || now;
      context.polling.setState({ lastPolled: seedDate });
      if (!lookBackDate) {
        return {
          payload: { ...payload, body: { data: [] } },
          polledNoChanges: true,
        };
      }
    }
    const lastPolled = lastState?.lastPolled ?? lookBackDate ?? now;
    const client = await createClient(connectionInput, context.debug.enabled);
    const pageLimit = context.batch?.enabled
      ? DEFAULT_BATCH_SIZE
      : DEFAULT_PAGE_LIMIT;
    const allSpaces = await paginateResults<Space>(
      client,
      SPACES_URL,
      SPACES_URL_REGEX,
      pageLimit,
    );
    const spaces = filterByDate<Space>(allSpaces, lastPolled, getCreatedAt);
    context.polling.setState({ lastPolled: now });
    return Promise.resolve(buildPollingResult(payload, spaces));
  },
});
