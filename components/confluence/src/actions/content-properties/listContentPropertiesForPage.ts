import { action, outputSchema } from "@prismatic-io/spectral";
import { listContentPropertiesOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { PAGES_URL_REGEX } from "../../constants";
import { listContentPropertiesForPageInputs } from "../../inputs";
import type { ContentProperty } from "../../types";
import { listContentPropertiesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";
export const listContentPropertiesForPage = action({
  display: {
    label: "List Content Properties for Page",
    description: "Retrieves Content Properties tied to a specified page.",
  },
  inputs: listContentPropertiesForPageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listContentPropertiesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, pagination, sort, pageId, queryParameters, fetchAll },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const url = `/pages/${pageId}/properties`;
    if (fetchAll) {
      const results = await paginateResults<ContentProperty>(
        client,
        url,
        PAGES_URL_REGEX,
      );
      return { data: { results } };
    }
    const { data } = await client.get(url, {
      params: {
        cursor: pagination.cursor,
        limit: pagination.limit,
        sort,
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
    data: listContentPropertiesExamplePayload,
  }),
  examplePayload: {
    data: listContentPropertiesExamplePayload,
  },
});
