import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { searchStreamExamplePayload } from "../../examplePayloads";
import { searchStreamInputs } from "../../inputs";
import type { SearchStreamQueryParams } from "../types/SearchStreamQueryParams";

export const searchStream = action({
  display: {
    label: "Search Stream",
    description: "Searches for streams that match the specified criteria.",
  },
  examplePayload: searchStreamExamplePayload,
  perform: async (context, { connection, qualifiers, fields }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: SearchStreamQueryParams = {
      qualifiers,
    };
    if (fields.length) queryParams.fields = fields;
    const { data } = await client.get(`/streams/search`, {
      params: queryParams,
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: searchStreamInputs,
});

export default { searchStream };
