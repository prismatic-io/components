import { action, outputSchema } from "@prismatic-io/spectral";
import { listPagesOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { HttpMethod, MAX_PAGE_SIZE } from "../../constants";
import { listPagesExamplePayload } from "../../examplePayloads";
import { listPagesInputs } from "../../inputs";
import { getPaginatedData } from "../../utils";
export const listPages = action({
  display: {
    label: "List Pages",
    description: "List all pages",
  },
  inputs: listPagesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listPagesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await getPaginatedData(
      client,
      HttpMethod.POST,
      "/search",
      params.fetchAll,
      {
        filter: {
          value: "page",
          property: "object",
        },
        start_cursor: params.fetchAll ? undefined : params.startCursor,
        page_size: MAX_PAGE_SIZE,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listPagesExamplePayload,
  examplePayload: listPagesExamplePayload,
});
