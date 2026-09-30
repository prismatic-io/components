import { action, outputSchema } from "@prismatic-io/spectral";
import { pageSingleSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { updatePageInputs } from "../../inputs";
import { getPageExamplePayload as updatePageExamplePayload } from "../../examplePayloads";
export const updatePage = action({
  display: {
    label: "Update Page",
    description: "Update a page by id.",
  },
  inputs: updatePageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: pageSingleSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connectionInput,
      pageId,
      body,
      parentId,
      spaceId,
      status,
      title,
      version,
    },
  ) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.put(`/pages/${pageId}`, {
      id: pageId || undefined,
      body: body || undefined,
      parentId: parentId || undefined,
      spaceId: spaceId || undefined,
      status: status || undefined,
      title: title || undefined,
      version: version || undefined,
    });
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { pageId, title, spaceId, parentId, status },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updatePageExamplePayload,
      ...(pageId ? { id: pageId } : {}),
      ...(title ? { title } : {}),
      ...(spaceId ? { spaceId } : {}),
      ...(parentId ? { parentId } : {}),
      ...(status ? { status } : {}),
    },
  }),
  examplePayload: {
    data: updatePageExamplePayload,
  },
});
