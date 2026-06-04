import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SPACES_URL, SPACES_URL_REGEX } from "../../constants";
import {
  connectionInput,
  cursor,
  fetchAll,
  limit,
  queryParameters,
} from "../../inputs";
import type { Space } from "../../interfaces";
import { listSpacesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listSpaces = action({
  display: {
    label: "List Spaces",
    description: "Returns all spaces.",
  },
  inputs: {
    connectionInput,
    fetchAll,
    limit,
    cursor,
    queryParameters,
  },
  perform: async (
    context,
    { connectionInput, cursor, limit, queryParameters, fetchAll },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);

    if (fetchAll) {
      const results = await paginateResults<Space>(
        client,
        SPACES_URL,
        SPACES_URL_REGEX,
      );
      return { data: { results } };
    }

    const { data } = await client.get(SPACES_URL, {
      params: {
        cursor,
        limit,
        ...queryParameters,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listSpacesExamplePayload,
  },
});
