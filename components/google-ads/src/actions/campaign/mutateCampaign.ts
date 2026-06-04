import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { mutateCampaignExamplePayload } from "../../examplePayloads";
import { mutateCampaignInputs } from "../../inputs";

export const mutateCampaign = action({
  display: {
    label: "Mutate Campaign",
    description:
      "Creates, updates, or removes campaigns as well as local services campaigns. Operation statuses are returned. When using API v22+, the containsEuPoliticalAdvertising field is required for campaign creation and location targeting changes.",
  },
  inputs: mutateCampaignInputs,
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
      `/customers/${customerId}/campaigns:mutate`,
      {
        operations,
        partialFailure,
        validateOnly,
      },
    );
    return { data };
  },
  examplePayload: mutateCampaignExamplePayload,
});
