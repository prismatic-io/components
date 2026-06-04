import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ATTACHMENTS_URL, ATTACHMENTS_URL_REGEX } from "../../constants";
import {
  connectionInput,
  cursor,
  fetchAll,
  limit,
  queryParameters,
} from "../../inputs";
import type { Attachment } from "../../interfaces";
import { listAttachmentsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listAttachments = action({
  display: {
    label: "List Attachments",
    description: "Returns all attachments.",
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
      const results = await paginateResults<Attachment>(
        client,
        ATTACHMENTS_URL,
        ATTACHMENTS_URL_REGEX,
      );
      return { data: { results } };
    }

    const { data } = await client.get(ATTACHMENTS_URL, {
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
