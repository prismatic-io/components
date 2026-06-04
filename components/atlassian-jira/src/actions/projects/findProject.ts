import { action, input, util } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { findProjectExamplePayload } from "../../examplePayloads";
import { connectionInput } from "../../inputs";

export const findProject = action({
  display: {
    label: "Find Project",
    description: "Find a project by attribute.",
  },
  inputs: {
    jiraConnection: connectionInput,
    searchType: input({
      label: "Search Type",
      type: "string",
      required: true,
      model: [
        { label: "Name", value: "name" },
        { label: "Key", value: "key" },
      ],
      comments: "Attribute to search",
      clean: (rawValue) => {
        const value = util.types.toString(rawValue);
        if (!["name", "key"].includes(value)) {
          throw new Error(`Invalid Search Type provided: ${value}`);
        }
        return value;
      },
    }),
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
    const {
      data: { values },
    } = await client.get("/project/search", {
      params: {
        query: params.searchValue,
      },
    });

    return {
      data: values,
    };
  },
  examplePayload: findProjectExamplePayload,
});
