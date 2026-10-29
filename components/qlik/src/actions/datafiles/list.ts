import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDatafilesExamplePayload } from "../../examplePayloads";
import { connectionInput, limit, page, paramsInputFields } from "../../inputs";

export const listDatafiles = action({
  display: {
    label: "List Data Files",
    description: "Get all data files.",
  },
  examplePayload: listDatafilesExamplePayload,
  perform: async (context, { connection, limit, page, paramsInputFields }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/data-files`, {
      params: {
        limit: limit || undefined,
        page: page || undefined,
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
    page,
    paramsInputFields,
  },
});
