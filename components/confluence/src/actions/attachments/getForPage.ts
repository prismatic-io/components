import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  limit,
  pageId,
  queryParameters,
} from "../../inputs";
import { listAttachmentsExamplePayload } from "../../examplePayloads";

export const getPageAttachment = action({
  display: {
    label: "Get Attachments for Page",
    description: "Returns the attachments of specific page.",
  },
  inputs: {
    connectionInput,
    pageId,
    limit,
    cursor,
    queryParameters,
  },
  perform: async (
    context,
    { connectionInput, pageId, cursor, limit, queryParameters },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/pages/${pageId}/attachments`, {
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
    data: listAttachmentsExamplePayload,
  },
});
