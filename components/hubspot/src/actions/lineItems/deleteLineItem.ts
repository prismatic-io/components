import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { deleteLineItemExamplePayload } from "../../examplePayloads";
import { deleteLineItemInputs } from "../../inputs";
export const deleteLineItem = action({
  display: {
    label: "Delete Line Item",
    description: "Delete an existing line item by Id.",
  },
  performSafety: "notAllowed",
  perform: async (context, { lineItemId, timeout, hubspotConnection }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.delete(
      `/crm/v3/objects/line_items/${lineItemId}`,
    );
    return { data };
  },
  inputs: deleteLineItemInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteLineItemExamplePayload.data,
  }),
  examplePayload: deleteLineItemExamplePayload,
});
