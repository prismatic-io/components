import { action, outputSchema } from "@prismatic-io/spectral";
import { listPagesOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { SPACES_URL_REGEX } from "../../constants";
import { listPagesInSpaceInputs } from "../../inputs";
import type { Page } from "../../types";
import { listPagesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";
export const listPagesInSpace = action({
  display: {
    label: "List Pages in Space",
    description: "Returns all pages in a space.",
  },
  inputs: listPagesInSpaceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPagesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connectionInput,
      spaceId,
      pagination,
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
      cursor: pagination.cursor,
      limit: pagination.limit,
    };
    const { data } = await client.get(url, {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listPagesExamplePayload,
  }),
  examplePayload: {
    data: listPagesExamplePayload,
  },
});
