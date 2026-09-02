import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { deleteProductExamplePayload } from "../../examplePayloads";
import { deleteProductInputs } from "../../inputs";
export const deleteProduct = action({
  display: {
    label: "Delete Product",
    description: "Delete a product by Id.",
  },
  performSafety: "notAllowed",
  perform: async (context, { productId, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.delete(
      `/crm/v3/objects/products/${productId}`,
    );
    return { data };
  },
  inputs: deleteProductInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteProductExamplePayload.data,
  }),
  examplePayload: deleteProductExamplePayload,
});
