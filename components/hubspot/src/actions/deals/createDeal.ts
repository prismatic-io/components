import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createDealExamplePayload } from "../../examplePayloads";
import { createDealInputs } from "../../inputs";
export const createDeal = action({
  display: {
    label: "Create Deal",
    description: "Create a new deal.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      amount,
      closeDate,
      dealName,
      dealStage,
      hubspotOwnerId,
      pipeline,
      priority,
      dealType,
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
    const { data } = await client.post("/crm/v3/objects/deals", {
      properties: {
        amount,
        closedate: closeDate,
        dealname: dealName,
        dealstage: dealStage,
        hubspot_owner_id: hubspotOwnerId,
        pipeline,
        dealtype: dealType,
        hs_priority: priority,
        ...fieldValues,
        ...dynamicValues,
      },
    });
    return { data };
  },
  inputs: createDealInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createDealExamplePayload.data,
  }),
  examplePayload: createDealExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
