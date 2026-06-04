import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { connectionInput } from "../inputs";
import { getCurrentUserExamplePayload } from "../examplePayloads";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description:
      "Get the information and metadata of the user that is currently logged in",
  },
  perform: async (context, { boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const result = await client.users.get(client.CURRENT_USER_ID);
    return { data: result };
  },
  inputs: { boxConnection: connectionInput },
  examplePayload: getCurrentUserExamplePayload,
});
