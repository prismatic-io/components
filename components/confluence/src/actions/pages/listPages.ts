import { action, outputSchema } from "@prismatic-io/spectral";
import { listPagesOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { PAGES_URL, PAGES_URL_REGEX } from "../../constants";
import { listPagesInputs } from "../../inputs";
import type { Page } from "../../types";
import { listPagesExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util";
export const listPages = action({
  display: {
    label: "List Pages",
    description: "Returns all pages.",
  },
  inputs: listPagesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPagesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connectionInput,
      pagination,
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
      cursor: pagination.cursor,
      limit: pagination.limit,
    };
    const { data } = await client.get(PAGES_URL, {
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
