import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads";
import { getUserInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const getUser = action({
  display: {
    label: "Get User By Email",
    description: "Get a user's information by email.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, email }) => {
    debugLogger({ debug, email });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.users.lookupByEmail({
      email,
    });
    return { data };
  },
  inputs: getUserInputs,
  examplePayload: {
    data: getUserExamplePayload,
  },
});
