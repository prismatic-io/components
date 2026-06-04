import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput, personIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getPersonFollowers = action({
  display: {
    label: "Get Person Followers",
    description: "Lists followers of a person.",
  },
  perform: async (context, { connection, id, limit, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get(`/persons/${id}/followers`, {
      params: { limit, cursor },
    });
    return { data };
  },
  inputs: {
    id: personIdInput,
    limit: paginationLimitInput,
    cursor,
    connection: connectionInput,
  },
});
