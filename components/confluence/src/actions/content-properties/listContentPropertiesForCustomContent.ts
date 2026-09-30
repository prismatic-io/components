import { action, outputSchema } from "@prismatic-io/spectral";
import { listContentPropertiesOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { CUSTOM_CONTENT_URL_REGEX } from "../../constants";
import { listContentPropertiesForCustomContentInputs } from "../../inputs";
import type { ContentProperty } from "../../types";
import { listContentPropertiesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";
export const listContentPropertiesForCustomContent = action({
  display: {
    label: "List Content Properties for Custom Content",
    description:
      "Retrieves Content Properties tied to a specified Custom Content.",
  },
  inputs: listContentPropertiesForCustomContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listContentPropertiesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connectionInput,
      pagination,
      sort,
      customContentId,
      queryParameters,
      fetchAll,
    },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const url = `/custom-content/${customContentId}/properties`;
    if (fetchAll) {
      const results = await paginateResults<ContentProperty>(
        client,
        url,
        CUSTOM_CONTENT_URL_REGEX,
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
