import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { owner, repo } from "../inputs";

const activityListPublicEventsForRepoNetwork = action({
  display: {
    label: "Activity List Public Events For Repo Network",
    description: "List public events for a network of repositories",
  },
  perform: async (context, { connection, owner, repo, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/networks/${owner}/${repo}/events`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    owner,
    repo,
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

export default {
  activityListPublicEventsForRepoNetwork,
};
