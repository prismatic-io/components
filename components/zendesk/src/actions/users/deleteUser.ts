import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { userId, connectionInput } from "../../inputs";
import { SUCCESS_MESSAGE } from "../../constants";
import { successMessagePayload } from "../../examplePayloads";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Delete a user by ID.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    await client.users.delete(util.types.toInt(params.userId));

    return {
      data: SUCCESS_MESSAGE,
    };
  },
  inputs: {
    userId,
    zendeskConnection: connectionInput,
  },
  examplePayload: {
    data: successMessagePayload,
  },
});
