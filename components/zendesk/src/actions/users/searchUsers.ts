import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { searchUsersPayload } from "../../examplePayloads";
import {
  connectionInput,
  userExternalIdInput,
  userQueryInput,
} from "../../inputs";

export const searchUsers = action({
  display: {
    label: "Search Users",
    description: "Return an array of users who meet the search criteria.",
  },
  perform: async (
    context,
    { externalId: externalIdBase, zendeskConnection, query },
  ) => {
    const client = createClient({
      zendeskConnection,
      debug: context.debug.enabled,
    });

    const externalId = util.types.toString(externalIdBase);

    const result = await client.users.search({
      ...(externalId ? { external_id: externalId } : {}),
      query: util.types.toString(query) || undefined,
    });

    return {
      data: result,
    };
  },
  inputs: {
    externalId: {
      ...userExternalIdInput,
      comments:
        "The external_id parameter does not support the search syntax. It only accepts ids.",
    },
    query: userQueryInput,
    zendeskConnection: connectionInput,
  },
  examplePayload: {
    data: searchUsersPayload,
  },
});
