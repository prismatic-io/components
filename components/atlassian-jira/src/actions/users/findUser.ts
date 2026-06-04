import { action, input, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { findUserExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const findUser = action({
  display: {
    label: "Find User",
    description: "Find a user by attribute.",
  },
  inputs: {
    jiraConnection: connectionInput,
    searchValue: input({
      label: "Search Value",
      type: "string",
      required: true,
      comments: "Value to search for",
      clean: (rawValue) => util.types.toString(rawValue).toLowerCase().trim(),
    }),
  },
  perform: async (context, params) => {
    const client = await createV3Client(params.jiraConnection, context.debug.enabled);
    const { data } = await client.get("/user/search", {
      params: {
        query: params.searchValue,
      },
    });
    return { data };
  },
  examplePayload: findUserExamplePayload,
});
