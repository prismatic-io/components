import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollPostsInputs } from "../inputs";
import type {
  CannyPostChange,
  CannyPostChangesObject,
  PollingState,
  Post,
} from "../types";
import {
  collectPostChanges,
  paginateOffset,
  resolvePostChanges,
} from "../util";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Posts",
    description:
      "Retrieves existing and ongoing posts from Canny. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollPostsInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): CannyPostChange[] =>
      resolvePostChanges(payload.body.data as CannyPostChangesObject),
  },
  perform: async (context, payload, params) => {
    const pollState = context.polling.getState() as PollingState;
    const now = new Date().toISOString();
    const isInitialSync = !pollState?.lastPolledAt;
    if (isInitialSync && !params.lookBackDate) {
      context.polling.setState({ lastPolledAt: now });
      return {
        payload: { ...payload, body: { data: { created: [], updated: [] } } },
        polledNoChanges: true,
      };
    }
    const since = pollState?.lastPolledAt ?? params.lookBackDate;
    const client = createClient(params.connection, context.debug.enabled);
    const { posts } = await paginateOffset<"posts", Post>(
      client.post,
      "/posts/list",
      "posts",
      {},
      true,
    );
    const { created, updated } = collectPostChanges(posts, since, {
      isInitialSync,
      showNewRecords: params.showNewRecords,
      showUpdatedRecords: params.showUpdatedRecords,
    });
    context.polling.setState({ lastPolledAt: now });
    if (context.debug.enabled) {
      context.logger.debug(
        `Polled Canny posts: ${posts.length} fetched, ${created.length} created, ${updated.length} updated`,
      );
    }
    return {
      payload: {
        ...payload,
        body: { data: { created, updated } },
      },
      polledNoChanges: created.length + updated.length === 0,
    };
  },
  examplePayload: pollChangesTriggerExamplePayload,
});
