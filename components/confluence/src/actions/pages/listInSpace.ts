import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SPACES_URL_REGEX } from "../../constants";
import {
  bodyFormatPages,
  connectionInput,
  cursor,
  depth,
  fetchAll,
  limit,
  sort,
  spaceId,
  status,
  titlePages,
} from "../../inputs";
import type { Page } from "../../interfaces";
import { listPagesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";

export const listPagesInSpace = action({
  display: {
    label: "List Pages in Space",
    description: "Returns all pages in a space.",
  },
  inputs: {
    connectionInput,
    spaceId,
    fetchAll,
    depth,
    sort,
    status,
    titlePages,
    bodyFormatPages,
    limit,
    cursor,
  },
  perform: async (
    context,
    {
      connectionInput,
      spaceId,
      cursor,
      limit,
      depth,
      sort,
      status,
      titlePages,
      bodyFormatPages,
      fetchAll,
    },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const url = `/spaces/${spaceId}/pages`;

    if (fetchAll) {
      const results = await paginateResults<Page>(
        client,
        url,
        SPACES_URL_REGEX,
      );
      return { data: { results } };
    }

    const params = {
      depth,
      sort,
      status,
      title: titlePages,
      "body-format": bodyFormatPages,
      cursor,
      limit,
    };
    const { data } = await client.get(url, {
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
