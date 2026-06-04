import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updatePageInputs } from "../../inputs";
import type { UpdatePageBody } from "../types/UpdatePageBody";
import { updatePageExamplePayload } from "../../examplePayloads";

export const updatePage = action({
  display: {
    label: "Update Page",
    description: "Updates the specified page's attributes in a Domo instance.",
  },
  examplePayload: updatePageExamplePayload,
  perform: async (context, { connection, pageId, updatePageBody }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const body: UpdatePageBody = JSON.parse(updatePageBody);
    const { data } = await client.put(`/pages/${pageId}`, body, {
      headers: { "Content-Type": "application/json" },
    });
    return { data };
  },
  inputs: updatePageInputs,
});

export default { updatePage };
