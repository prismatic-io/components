import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, pageId, purge, draft } from "../../inputs";

export const deletePage = action({
  display: {
    label: "Delete Page",
    description: "Delete a page by id.",
  },
  inputs: {
    connectionInput,
    pageId,
    purge,
    draft,
  },
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
  examplePayload: {
    data: null,
  },
});
