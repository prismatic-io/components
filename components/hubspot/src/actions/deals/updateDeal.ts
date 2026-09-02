import { action, outputSchema } from "@prismatic-io/spectral";
import { crmObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { updateDealExamplePayload } from "../../examplePayloads";
import { updateDealInputs } from "../../inputs";
export const updateDeal = action({
  display: {
    label: "Update Deal",
    description: "Update the information or metadata of an existing deal.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      dealId,
      amount,
      closeDate,
      updateDealName,
      hubspotOwnerId,
      updatePipeline,
      updateDealStage,
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
    const { data } = await client.patch(`/crm/v3/objects/deals/${dealId}`, {
      properties: {
        amount,
        closedate: closeDate,
        dealname: updateDealName,
        dealstage: updateDealStage,
        hubspot_owner_id: hubspotOwnerId,
        pipeline: updatePipeline,
        dealtype: dealType,
        hs_priority: priority,
        ...fieldValues,
        ...dynamicValues,
      },
    });
    return { data };
  },
  inputs: updateDealInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: updateDealExamplePayload.data,
  }),
  examplePayload: updateDealExamplePayload,
  outputSchema: outputSchema({ type: "actionOutput", schema: crmObjectSchema }),
});
