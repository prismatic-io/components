import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PAGES_URL, PAGES_URL_REGEX } from "../../constants";
import {
  bodyFormatPages,
  connectionInput,
  cursor,
  fetchAll,
  id,
  limit,
  sort,
  spaceIdFilter,
  statusPages,
  titlePages,
} from "../../inputs";
import type { Page } from "../../interfaces";
import { listPagesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listPages = action({
  display: {
    label: "List Pages",
    description: "Returns all pages.",
  },
  inputs: {
    connectionInput,
    fetchAll,
    limit,
    cursor,
    id,
    spaceIdFilter,
    sort,
    statusPages,
    titlePages,
    bodyFormatPages,
  },
  perform: async (
    context,
    {
      connectionInput,
      cursor,
      limit,
      id,
      spaceIdFilter,
      sort,
      statusPages,
      titlePages,
      bodyFormatPages,
      fetchAll,
    },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);

    if (fetchAll) {
      const results = await paginateResults<Page>(
        client,
        PAGES_URL,
        PAGES_URL_REGEX,
      );
      return { data: { results } };
    }

    const params = {
      id,
      "space-id": spaceIdFilter,
      sort,
      status: statusPages,
      title: titlePages,
      "body-format": bodyFormatPages,
      cursor,
      limit,
    };
    const { data } = await client.get(PAGES_URL, {
      params,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listPagesExamplePayload,
  },
});
