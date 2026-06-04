import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CUSTOM_CONTENT_URL_REGEX } from "../../constants";
import {
  connectionInput,
  cursor,
  customContentId,
  fetchAll,
  limit,
  queryParameters,
  sort,
} from "../../inputs";
import type { ContentProperty } from "../../interfaces";
import { listContentPropertiesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listContentPropertiesForCustomContent = action({
  display: {
    label: "List Content Properties for Custom Content",
    description:
      "Retrieves Content Properties tied to a specified Custom Content.",
  },
  inputs: {
    connectionInput,
    customContentId,
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
