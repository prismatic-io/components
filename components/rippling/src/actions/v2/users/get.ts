import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getUserExamplePayload } from "../../../examplePayloads";
import { getUserInputs } from "../../../inputs";

export const getUser = action({
  display: {
    label: "Get User (V2)",
    description: "Retrieve a specific user by ID.",
  },
  inputs: getUserInputs,
  examplePayload: getUserExamplePayload,
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(`/users/${id}`);
    return { data };
  },
});
