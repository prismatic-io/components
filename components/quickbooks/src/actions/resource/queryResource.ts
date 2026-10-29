import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, minorVersion, queryString } from "../../inputs";

export const queryResource = action({
  display: {
    label: "Query Resource",
    description:
      "Query a QuickBooks resource using their SQL-like data query language.",
  },

  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );

    const { data } = await client.get("/query", {
      params: {
        query: params.queryString,
        minorversion: params.minorVersion,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    queryString,
    minorVersion,
  },
});
