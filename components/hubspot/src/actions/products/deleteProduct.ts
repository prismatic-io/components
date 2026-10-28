import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { deleteProductExamplePayload } from "../../examplePayloads";
import { deleteProductInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
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
      hubspotPaths.objects("products", `/${productId}`),
    );
    return { data };
  },
  inputs: deleteProductInputs,
  examplePerform: async () => ({
    data: deleteProductExamplePayload.data,
  }),
  examplePayload: deleteProductExamplePayload,
});
