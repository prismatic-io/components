import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getUsersExamplePayload } from "../../examplePayloads";
import { getUsersInputs } from "../../inputs";
export const getUsers = action({
  display: {
    label: "Get User",
    description: "Get the information and metadata of a user.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/users/${params.userId}`);
    return { data };
  },
  inputs: getUsersInputs,
  examplePayload: getUsersExamplePayload,
});
