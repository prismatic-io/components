import { pollingTrigger, util } from "@prismatic-io/spectral";
import { listSites } from "../actions/sites/listSites";
import { newOrUpdatedSitesTriggerInputs } from "../inputs";
import type { SiteRecordChange } from "../util";
import { resolveSiteChanges, todayTimestamp } from "../util";

export const newOrUpdatedSitesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Sites",
    description:
      "Retrieves existing and ongoing sites from System Surveyor. Load history once, check for changes on a schedule, or both.",
  },
  inputs: newOrUpdatedSitesTriggerInputs,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50 },
  triggerResolver: {
    resolveItems: (_context, { payload }): SiteRecordChange[] =>
      resolveSiteChanges(payload.body.data as unknown[]),
  },
  perform: async (context, payload, params) => {
    const now = todayTimestamp();
    const state = context.polling.getState() as { cursor?: number };

    if (!state?.cursor) {
      const lookBack = params.lookBackDate;
      const seed = lookBack
        ? Math.floor(new Date(lookBack).getTime() / 1000)
        : now;
      context.polling.setState({ cursor: seed });
      if (!lookBack) {
        return { payload, polledNoChanges: true };
      }
    }

    const cursor = (context.polling.getState() as { cursor: number }).cursor;

    const { data } = await listSites.perform(context, {
      ssvConnection: params.ssvConnection,
      modifiedAfter: util.types.toString(cursor),
      fetchAll: true,
      pageNumber: undefined,
      pageSize: undefined,
    });

    const sites = data as unknown[];
    context.polling.setState({ cursor: now });

    if (sites?.length) {
      return {
        payload: { ...payload, body: { data: sites } },
        polledNoChanges: false,
      };
    }

    return { payload, polledNoChanges: true };
  },
});
