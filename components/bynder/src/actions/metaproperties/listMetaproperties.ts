import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listMetapropertiesResponse } from "../../examplePayloads";
import { connection, count, ids, options, type } from "../../inputs";

export const listMetaproperties = action({
  display: {
    label: "List Metaproperties",
    description: "Retrieve all metaproperties.",
  },
  inputs: {
    count: {
      ...count,
      comments:
        "Indicates whether or not the response should include asset count results for metaproperty-options.",
    },
    type,
    options,
    ids,
    connection,
  },
  perform: async (context, { connection, count, ids, options, type }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/metaproperties`, {
      params: {
        count,
        ids,
        options,
        type,
      },
    });
    return { data };
  },
  examplePayload: {
    data: listMetapropertiesResponse,
  },
});
