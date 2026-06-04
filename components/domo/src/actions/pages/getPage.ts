import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getPageInputs } from "../../inputs";
import { getPageExamplePayload } from "../../examplePayloads";

export const getPage = action({
  display: {
    label: "Get Page",
    description: "Retrieves the details of an existing page.",
  },
  examplePayload: getPageExamplePayload,
  perform: async (context, { connection, pageId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(`/pages/${pageId}`, {
      headers: { Accept: "application/json" },
    });
    return { data };
  },
  inputs: getPageInputs,
});

export default { getPage };
