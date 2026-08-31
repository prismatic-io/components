import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { mutateCampaignExamplePayload } from "../../examplePayloads";
import { mutateCampaignInputs } from "../../inputs";
import { mutateCampaignOutputSchema } from "../../outputSchemas";
export const mutateCampaign = action({
  display: {
    label: "Mutate Campaign",
    description:
      "Creates, updates, or removes campaigns as well as local services campaigns. Operation statuses are returned. When using API v22+, the containsEuPoliticalAdvertising field is required for campaign creation and location targeting changes.",
  },
  inputs: mutateCampaignInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: mutateCampaignOutputSchema,
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
      `/customers/${customerId}/campaigns:mutate`,
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
  }> => mutateCampaignExamplePayload,
  examplePayload: mutateCampaignExamplePayload,
});
