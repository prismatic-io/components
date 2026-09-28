import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listProductOptionTypesExamplePayload } from "../../examplePayloads";
import { listProductOptionTypesInputs } from "../../inputs";
export const listProductOptionTypes = action({
  display: {
    label: "List Product Option Types",
    description: "Get custom option types",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = await getClient(connection, context.debug.enabled);
    const { data } = await client.get(ENDPOINTS.productOptionTypes);
    return { data };
  },
  inputs: listProductOptionTypesInputs,
  examplePayload: listProductOptionTypesExamplePayload,
});
