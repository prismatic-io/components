import { action, outputSchema } from "@prismatic-io/spectral";
import { listContentPropertiesOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { ATTACHMENTS_URL_REGEX } from "../../constants";
import { listContentPropertiesForAttachmentsInputs } from "../../inputs";
import type { ContentProperty } from "../../types";
import { listContentPropertiesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";
export const listContentPropertiesForAttachments = action({
  display: {
    label: "List Content Properties for Attachments",
    description:
      "Retrieves all Content Properties tied to a specified attachment.",
  },
  inputs: listContentPropertiesForAttachmentsInputs,
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
      attachmentId,
      queryParameters,
      fetchAll,
    },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const url = `/attachments/${attachmentId}/properties`;
    if (fetchAll) {
      const results = await paginateResults<ContentProperty>(
        client,
        url,
        ATTACHMENTS_URL_REGEX,
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
