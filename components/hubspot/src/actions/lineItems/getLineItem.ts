import { action, outputSchema } from "@prismatic-io/spectral";
import { getLineItemOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { getLineItemInputs } from "../../inputs";
import { getProps } from "../../util";
export const getLineItem = action({
  display: {
    label: "Get Line Item",
    description: "Retrieve the information and metadata of a line item by Id.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      additionalProperties,
      lineItemId,
      lineItemName,
      timeout,
      hubspotConnection,
      archived,
      associationsList,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    if (!lineItemId && !lineItemName) {
      throw new Error(
        "You must supply an Id or name to retrieve a line item record.",
      );
    }
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
    if (lineItemName) {
      const result = await client.get("/crm/v3/objects/line_items", {
        params,
      });
      const { results: lineItems } = result.data;
      const filteredLineItems = (lineItems || []).filter((item) => {
        return item?.properties?.name === lineItemName;
      });
      if (filteredLineItems.length === 0) {
        throw new Error(`No line items found matching ${lineItemName}`);
      }
      return { data: filteredLineItems };
    }
    const { data } = await client.get(
      `/crm/v3/objects/line_items/${lineItemId}`,
      {
        params,
      },
    );
    return { data };
  },
  inputs: getLineItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getLineItemOutputSchema,
  }),
});
