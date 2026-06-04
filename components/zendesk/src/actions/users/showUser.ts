import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { showUserPayload } from "../../examplePayloads";
import { userId, connectionInput } from "../../inputs";

export const showUser = action({
  display: {
    label: "Get User",
    description: "Get a user by ID.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    const { result } = await client.users.show(util.types.toInt(params.userId));

    return {
      data: result,
    };
  },
  inputs: {
    userId,
    zendeskConnection: connectionInput,
  },
  examplePayload: {
    data: showUserPayload as unknown,
  },
});
