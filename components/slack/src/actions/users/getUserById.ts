import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads";
import { getUserByIdInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const getUserById = action({
  display: {
    label: "Get User By ID",
    description: "Get a user's information by ID.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, user }) => {
    debugLogger({ debug, user });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.users.info({
      user,
    });
    return { data };
  },
  inputs: getUserByIdInputs,
  examplePayload: {
    data: getUserExamplePayload,
  },
});
