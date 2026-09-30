import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ATTACHMENTS_URL, ATTACHMENTS_URL_REGEX } from "../../constants";
import { listAttachmentsInputs } from "../../inputs";
import type { Attachment } from "../../types";
import { listAttachmentsExamplePayload } from "../../examplePayloads";
import { listAttachmentsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util";
export const listAttachments = action({
  display: {
    label: "List Attachments",
    description: "Returns all attachments.",
  },
  inputs: listAttachmentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAttachmentsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, pagination, queryParameters, fetchAll },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    if (fetchAll) {
      const results = await paginateResults<Attachment>(
        client,
        ATTACHMENTS_URL,
        ATTACHMENTS_URL_REGEX,
      );
      return { data: { results } };
    }
    const { data } = await client.get(ATTACHMENTS_URL, {
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
  examplePerform: async () => listAttachmentsExamplePayload,
  examplePayload: listAttachmentsExamplePayload,
});
