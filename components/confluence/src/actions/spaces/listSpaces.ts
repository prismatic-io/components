import { action, outputSchema } from "@prismatic-io/spectral";
import { listSpacesOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { SPACES_URL, SPACES_URL_REGEX } from "../../constants";
import { listSpacesInputs } from "../../inputs";
import type { Space } from "../../types";
import { listSpacesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";
export const listSpaces = action({
  display: {
    label: "List Spaces",
    description: "Returns all spaces.",
  },
  inputs: listSpacesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSpacesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, pagination, queryParameters, fetchAll },
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
        cursor: pagination.cursor,
        limit: pagination.limit,
        ...queryParameters,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listSpacesExamplePayload,
  }),
  examplePayload: {
    data: listSpacesExamplePayload,
  },
});
