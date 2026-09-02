import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createLineItemExamplePayload } from "../../examplePayloads";
import { createLineItemInputs } from "../../inputs";
export const createLineItem = action({
  display: {
    label: "Create Line Item",
    description: "Create a new line item.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      lineItemName,
      productId,
      recurringBillingPeriod,
      recurringBillingFrequency,
      quantity,
      price,
      timeout,
      fieldValues,
      dynamicValues,
      hubspotConnection,
    },
  ) => {
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest: context.debug.enabled,
    });
    const { data } = await client.post("/crm/v3/objects/line_items", {
      properties: {
        name: lineItemName,
        hs_product_id: productId,
        hs_recurring_billing_period: recurringBillingPeriod,
        recurringbillingfrequency: recurringBillingFrequency,
        quantity,
        price,
        ...fieldValues,
        ...dynamicValues,
      },
    });
    return { data };
  },
  inputs: createLineItemInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createLineItemExamplePayload.data,
  }),
  examplePayload: createLineItemExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
