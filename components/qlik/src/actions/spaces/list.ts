import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSpacesExamplePayload } from "../../examplePayloads";
import { connectionInput, limit, paramsInputFields, sort } from "../../inputs";

export const listSpaces = action({
  display: {
    label: "List Spaces",
    description: "Get all Spaces.",
  },
  examplePayload: listSpacesExamplePayload,
  perform: async (context, { connection, limit, sort, paramsInputFields }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/spaces`, {
      params: {
        limit: limit || undefined,
        sort: sort || undefined,
        ...paramsInputFields,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    limit,
    sort,
    paramsInputFields,
  },
});
