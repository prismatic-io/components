import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { publishViewExamplePayload } from "../../examplePayloads";
import { publishViewInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const publishView = action({
  display: {
    label: "Publish View",
    description: "Publish a static view for a user.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, userId, view }
  ) => {
    debugLogger({ connection, debug, userId, view });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.views.publish({
      user_id: userId,
      view,
    });
    return { data };
  },
  inputs: publishViewInputs,
  examplePayload: {
    data: publishViewExamplePayload as unknown,
  },
});
