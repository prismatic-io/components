import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { SPACES_URL, SPACES_URL_REGEX } from "../constants";
import { connectionInput } from "../inputs";
import type { Space } from "../interfaces";
import { paginateResults } from "../util";
import type { PollingState } from "./interfaces";
import {
  buildPollingResult,
  filterByDate,
  getCreatedAt,
  getLastPolled,
} from "./utils";

export const newSpacesPollingTrigger = pollingTrigger({
  display: {
    label: "New Spaces",
    description: "Checks for new spaces on a configured schedule.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (context, payload, { connectionInput }) => {
    const now = new Date().toISOString();
    const lastState = context.polling.getState() as PollingState;
    const client = await createClient(connectionInput, context.debug.enabled);

    const allSpaces = await paginateResults<Space>(
      client,
      SPACES_URL,
      SPACES_URL_REGEX,
    );

    const spaces = filterByDate<Space>(
      allSpaces,
      getLastPolled(lastState, now),
      getCreatedAt,
    );

    context.polling.setState({ lastPolled: now });
    return Promise.resolve(buildPollingResult(payload, spaces));
  },
});
