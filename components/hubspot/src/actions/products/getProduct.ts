import { action, outputSchema } from "@prismatic-io/spectral";
import { getProductOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { getProductInputs } from "../../inputs";
import { getProps } from "../../util";
export const getProduct = action({
  display: {
    label: "Get Product",
    description:
      "Retrieve the information and metadata of a product by Id or name.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      productId,
      productName,
      additionalProperties,
      timeout,
      hubspotConnection,
      archived,
      associationsList,
    },
  ) => {
    if (!productId && !productName) {
      throw new Error(
        "You must supply an Id or name to retrieve a product record",
      );
    }
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const parameterizedProperties = getProps(
      ["name"],
      additionalProperties || [],
    );
    const params = {
      ...parameterizedProperties,
      associations: associationsList,
      archived: archived,
    };
    if (productName) {
      const result = await client.get("/crm/v3/objects/products", {
        params,
      });
      const { results: products } = result.data;
      const filteredProducts = (products || []).filter((product) => {
        return product?.properties?.name === productName;
      });
      if (filteredProducts.length === 0) {
        throw new Error(`No line items found matching ${productName}`);
      }
      return { data: filteredProducts };
    }
    const { data } = await client.get(`/crm/v3/objects/products/${productId}`, {
      params,
    });
    return { data };
  },
  inputs: getProductInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProductOutputSchema,
  }),
});
