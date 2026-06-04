import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ATTACHMENTS_URL_REGEX } from "../../constants";
import {
  attachmentId,
  connectionInput,
  cursor,
  fetchAll,
  limit,
  queryParameters,
  sort,
} from "../../inputs";
import type { ContentProperty } from "../../interfaces";
import { listContentPropertiesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listContentPropertiesForAttachments = action({
  display: {
    label: "List Content Properties for Attachments",
    description:
      "Retrieves all Content Properties tied to a specified attachment.",
  },
  inputs: {
    connectionInput,
    attachmentId,
    fetchAll,
    limit,
    cursor,
    sort,
    queryParameters,
  },
  perform: async (
    context,
    {
      connectionInput,
      cursor,
      limit,
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
        cursor,
        limit,
        sort,
        ...queryParameters,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listContentPropertiesExamplePayload,
  },
});
