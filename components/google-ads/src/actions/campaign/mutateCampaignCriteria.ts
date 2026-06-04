import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { mutateCampaignCriteriaExamplePayload } from "../../examplePayloads";
import { mutateCampaignCriteriaInputs } from "../../inputs";

export const mutateCampaignCriteria = action({
  display: {
    label: "Mutate Campaign Criteria",
    description:
      "Creates, updates, or removes campaign criteria as well as local services campaign criterion. Operation statuses are returned. When using API v22+, the containsEuPoliticalAdvertising field must be set on the parent campaign before modifying location or proximity targeting criteria.",
  },
  inputs: mutateCampaignCriteriaInputs,
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
    const client = createClient(
      connection,
      context.debug.enabled,
      context.logger,
      managerCustomerId,
    );
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
  examplePayload: mutateCampaignCriteriaExamplePayload,
});
