import { action } from "@prismatic-io/spectral";
import { createOauthClient } from "../../client";



import { openViewExamplePayload as pushViewResponse } from "../../examplePayloads";
import { pushViewInputs } from "../../inputs";
import { debugLogger } from "../../util";

export const pushView = action({
  display: {
    label: "Push View",
    description: "Push a view onto the stack of a root view.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, trigger_id, view }
  ) => {
    debugLogger({ debug, connection, trigger_id, view });
    const client = await createOauthClient({
      slackConnection: connection,
    });
    const data = await client.views.push({
      trigger_id,
      view,
    });
    return { data };
  },
  inputs: pushViewInputs,
  examplePayload: {
    data: pushViewResponse as unknown,
  },
});
