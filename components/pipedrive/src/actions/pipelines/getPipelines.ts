import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput, sortBy, sortDirection } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getPipelines = action({
  display: {
    label: "Get Pipelines",
    description: "Gets all pipelines.",
  },
  perform: async (context, { connection, sortBy, sortDirection, limit, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/pipelines", {
      params: { sort_by: sortBy, sort_direction: sortDirection, limit, cursor },
    });
    return { data };
  },
  inputs: {
    sortBy,
    sortDirection,
    limit: paginationLimitInput,
    cursor,
    connection: connectionInput,
  },
});
