import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listProductTypesExamplePayload } from "../../examplePayloads";
import { listProductTypesInputs } from "../../inputs";
export const listProductTypes = action({
  display: {
    label: "List Product Types",
    description: "Retrieve available product types",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = await getClient(connection, context.debug.enabled);
    const { data } = await client.get(ENDPOINTS.productTypes);
    return { data };
  },
  inputs: listProductTypesInputs,
  examplePayload: listProductTypesExamplePayload,
});
