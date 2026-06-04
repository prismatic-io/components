import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { searchUsersExamplePayload } from "../../examplePayloads";
import { connectionInput, searchString } from "../../inputs";

export const searchUsers = action({
  display: {
    label: "Search Users",
    description: "Return a single user that matches the given string of text.",
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/user/search", {
      params: {
        query: params.searchString,
      },
    });

    return { data };
  },
  inputs: {
    jiraConnection: connectionInput,
    searchString,
  },
  examplePayload: searchUsersExamplePayload,
});
