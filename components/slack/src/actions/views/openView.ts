import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";
import { openViewExamplePayload } from "../../examplePayloads";
import { openViewInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const openView = action({
  display: {
    label: "Open View",
    description: "Open a view for a user.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, trigger_id, view }
  ) => {
    debugLogger({ debug, connection, trigger_id, view });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.views.open({
      trigger_id,
      view,
    });
    return { data };
  },
  inputs: openViewInputs,
  examplePayload: {
    data: openViewExamplePayload as unknown,
  },
});
