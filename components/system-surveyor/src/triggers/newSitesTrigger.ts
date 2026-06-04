import { pollingTrigger, util } from "@prismatic-io/spectral";
import { listSites } from "../actions/sites/listSites";
import { newOrUpdatedSitesTriggerInputs } from "../inputs";
import { todayTimestamp } from "../util";




export const newOrUpdatedSitesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Sites",
    description:
      "Checks for new and updated sites in System Surveyor on a configured schedule.",
  },
  inputs: newOrUpdatedSitesTriggerInputs,
  perform: async (context, payload, params) => {
    const now = todayTimestamp();
    const state = context.polling.getState() as { cursor?: number };

    if (!state?.cursor) {
      context.polling.setState({ cursor: now });
      return { payload, polledNoChanges: true };
    }

    const { data } = await listSites.perform(context, {
      ssvConnection: params.ssvConnection,
      modifiedAfter: util.types.toString(state.cursor),
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
