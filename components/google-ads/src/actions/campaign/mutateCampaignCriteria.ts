import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { mutateCampaignCriteriaExamplePayload } from "../../examplePayloads";
import { mutateCampaignCriteriaInputs } from "../../inputs";
import { mutateCampaignCriteriaOutputSchema } from "../../outputSchemas";
export const mutateCampaignCriteria = action({
  display: {
    label: "Mutate Campaign Criteria",
    description:
      "Creates, updates, or removes campaign criteria as well as local services campaign criterion. Operation statuses are returned. When using API v22+, the containsEuPoliticalAdvertising field must be set on the parent campaign before modifying location or proximity targeting criteria.",
  },
  inputs: mutateCampaignCriteriaInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: mutateCampaignCriteriaOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerId,
      managerCustomerId,
      operations,
      partialFailure,
      validateOnly,
    },
  ) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
    });
    const { data } = await client.post(
      `/customers/${customerId}/campaignCriteria:mutate`,
      {
        operations,
        partialFailure,
        validateOnly,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => mutateCampaignCriteriaExamplePayload,
  examplePayload: mutateCampaignCriteriaExamplePayload,
});
