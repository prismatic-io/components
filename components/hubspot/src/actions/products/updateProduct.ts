import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { updateProductExamplePayload } from "../../examplePayloads";
import { updateProductInputs } from "../../inputs";
export const updateProduct = action({
  display: {
    label: "Update Product",
    description: "Update the information and metadata of an existing product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      productId,
      updateProductName,
      description,
      updateSku,
      updatePrice,
      recurringBillingPeriod,
      unitCost,
      timeout,
      fieldValues,
      dynamicValues,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.patch(
      `/crm/v3/objects/products/${productId}`,
      {
        properties: {
          description: description,
          hs_cost_of_goods_sold: unitCost,
          hs_recurring_billing_period: recurringBillingPeriod,
          hs_sku: updateSku,
          name: updateProductName,
          price: updatePrice,
          ...fieldValues,
          ...dynamicValues,
        },
      },
    );
    return { data };
  },
  inputs: updateProductInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: updateProductExamplePayload.data,
  }),
  examplePayload: updateProductExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
