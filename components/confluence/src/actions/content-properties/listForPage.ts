import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PAGES_URL_REGEX } from "../../constants";
import {
  connectionInput,
  cursor,
  fetchAll,
  limit,
  pageId,
  queryParameters,
  sort,
} from "../../inputs";
import type { ContentProperty } from "../../interfaces";
import { listContentPropertiesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listContentPropertiesForPage = action({
  display: {
    label: "List Content Properties for Page",
    description: "Retrieves Content Properties tied to a specified page.",
  },
  inputs: {
    connectionInput,
    pageId,
    fetchAll,
    limit,
    cursor,
    sort,
    queryParameters,
  },
  perform: async (
    context,
    { connectionInput, cursor, limit, sort, pageId, queryParameters, fetchAll },
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
