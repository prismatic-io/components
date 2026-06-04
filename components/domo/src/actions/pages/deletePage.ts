import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { deletePageInputs } from "../../inputs";
import { deletePageExamplePayload } from "../../examplePayloads";

export const deletePage = action({
  display: {
    label: "Delete Page",
    description: "Permanently deletes a page from a Domo instance.",
  },
  examplePayload: deletePageExamplePayload,
  perform: async (context, { connection, pageId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/pages/${pageId}`);
    return { data };
  },
  inputs: deletePageInputs,
});

export default { deletePage };
