import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, organizationIdInput, paginationLimitInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getOrganizationActivities = action({
  display: {
    label: "Get Organization Activities",
    description: "Lists activities associated with an organization.",
  },
  perform: async (context, { connection, id, limit, done, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/activities", {
      params: { limit, done, org_id: id, cursor },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: organizationIdInput,
    limit: paginationLimitInput,
    cursor,
    done: input({
      label: "Done",
      type: "boolean",
      comments: "When true, returns only completed activities",
      clean: util.types.toBool,
    }),
  },
});
