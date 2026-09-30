import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deletePageInputs } from "../../inputs";
export const deletePage = action({
  display: {
    label: "Delete Page",
    description: "Delete a page by id.",
  },
  inputs: deletePageInputs,
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, pageId, purge, draft }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const params = {
      purge,
      draft,
    };
    const { data } = await client.delete(`/pages/${pageId}`, { params });
    return {
      data,
    };
  },
  examplePerform: async () => null,
  examplePayload: {
    data: null,
  },
});
