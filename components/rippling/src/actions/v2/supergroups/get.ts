import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getSupergroupExamplePayload } from "../../../examplePayloads";
import { getSupergroupInputs } from "../../../inputs";

export const getSupergroup = action({
  display: {
    label: "Get Supergroup (V2)",
    description: "Retrieve a specific supergroup by ID.",
  },
  inputs: getSupergroupInputs,
  examplePayload: getSupergroupExamplePayload,
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/supergroups/${id}`);
    return { data };
  },
});
