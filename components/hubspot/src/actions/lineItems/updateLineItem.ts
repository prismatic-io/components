import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { updateLineItemExamplePayload } from "../../examplePayloads";
import { updateLineItemInputs } from "../../inputs";
export const updateLineItem = action({
  display: {
    label: "Update Line Item",
    description:
      "Update the information and metadata of an existing line item.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      lineItemId,
      updateLineItemName,
      updateProductId,
      recurringBillingPeriod,
      recurringBillingFrequency,
      quantity,
      updatePrice,
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
    const { data } = await client.patch(
      `/crm/v3/objects/line_items/${lineItemId}`,
      {
        properties: {
          name: updateLineItemName,
          hs_product_id: updateProductId,
          hs_recurring_billing_period: recurringBillingPeriod,
          recurringbillingfrequency: recurringBillingFrequency,
          quantity: quantity,
          price: updatePrice,
          ...fieldValues,
          ...dynamicValues,
        },
      },
    );
    return { data };
  },
  inputs: updateLineItemInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: updateLineItemExamplePayload.data,
  }),
  examplePayload: updateLineItemExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
