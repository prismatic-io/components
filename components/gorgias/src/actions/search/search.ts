import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { searchInputs as inputs } from "../../inputs/search";
import type { SearchResponse } from "../../interfaces/search";
import { searchExamplePayload as examplePayload } from "../../examplePayloads/search";

export const search = action({
  display: {
    label: "Search",
    description: "Search for resources.",
  },
  perform: async (context, { connection, ...body }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).post<SearchResponse>("/search", body);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
