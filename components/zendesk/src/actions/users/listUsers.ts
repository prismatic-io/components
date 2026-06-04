import { action } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { connectionInput } from "../../inputs";
import { listUsersPayload } from "../../examplePayloads";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "List all users.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    const result = await client.users.list();

    return {
      data: result,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
  },

  examplePayload: {
    data: listUsersPayload,
  },
});
