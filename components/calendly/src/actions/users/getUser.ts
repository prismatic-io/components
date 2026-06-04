import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, uuid } from "../../inputs";
import { getUserExamplePayload } from "../../examplePayloads";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Returns information about a specified User.",
  },
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get(`/users/${uuid}`);
    return { data };
  },
  inputs: {
    connection,
    uuid,
  },
  examplePayload: getUserExamplePayload,
});
