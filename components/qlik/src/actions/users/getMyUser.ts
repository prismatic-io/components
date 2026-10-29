import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getMyUserExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const getMyUser = action({
  display: {
    label: "Get My User",
    description:
      "Redirects to retrieve the user resource associated with the JWT claims.",
  },
  examplePayload: getMyUserExamplePayload,
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/me`);

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
  },
});
