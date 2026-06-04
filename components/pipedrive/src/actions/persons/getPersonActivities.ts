import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput, personIdInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const getPersonActivities = action({
  display: {
    label: "Get Person Activities",
    description: "Lists activities associated with a person.",
  },
  perform: async (context, { connection, id, limit, done, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/activities", {
      params: { limit, done, person_id: id, cursor },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
    limit: paginationLimitInput,
    cursor,
    done: input({
      label: "Done",
      type: "boolean",
      clean: util.types.toBool,
      comments: "When true, returns only completed activities",
    }),
  },
});
