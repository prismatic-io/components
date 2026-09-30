import { action, outputSchema } from "@prismatic-io/spectral";
import { pageSingleSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { createPageInputs } from "../../inputs";
import { createPageExamplePayload } from "../../examplePayloads";
export const createPage = action({
  display: {
    label: "Create Page",
    description: "Creates a page in the space.",
  },
  inputs: createPageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: pageSingleSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connectionInput,
      body,
      parentId,
      spaceId,
      status,
      title,
      embedded,
      privateInput,
      queryParameters,
    },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      "/pages",
      {
        body: body || undefined,
        parentId: parentId || undefined,
        spaceId: spaceId || undefined,
        status: status || undefined,
        title: title || undefined,
      },
      {
        params: {
          embedded: embedded || undefined,
          private: privateInput || undefined,
          ...queryParameters,
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { title, spaceId, parentId, status },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createPageExamplePayload,
      ...(title ? { title } : {}),
      ...(spaceId ? { spaceId } : {}),
      ...(parentId ? { parentId } : {}),
      ...(status ? { status } : {}),
    },
  }),
  examplePayload: {
    data: createPageExamplePayload,
  },
});
