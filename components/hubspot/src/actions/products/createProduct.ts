import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createProductExamplePayload } from "../../examplePayloads";
import { createProductInputs } from "../../inputs";
export const createProduct = action({
  display: {
    label: "Create Product",
    description: "Create a new product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      productName,
      description,
      sku,
      price,
      recurringBillingPeriod,
      unitCost,
      fieldValues,
      dynamicValues,
      timeout,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.post("/crm/v3/objects/products", {
      properties: {
        description: description,
        hs_cost_of_goods_sold: unitCost,
        hs_recurring_billing_period: recurringBillingPeriod,
        hs_sku: sku,
        name: productName,
        price: price,
        ...fieldValues,
        ...dynamicValues,
      },
    });
    return { data };
  },
  inputs: createProductInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createProductExamplePayload.data,
  }),
  examplePayload: createProductExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
