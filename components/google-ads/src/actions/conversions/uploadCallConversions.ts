import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { uploadCallConversionsExamplePayload } from "../../examplePayloads";
import { uploadCallConversionsInputs } from "../../inputs";
import { uploadCallConversionsOutputSchema } from "../../outputSchemas";
export const uploadCallConversions = action({
  display: {
    label: "Upload Call Conversions",
    description:
      "Upload offline call conversions into Google Ads in order to track ads that led to sales.",
  },
  inputs: uploadCallConversionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadCallConversionsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, customerId, managerCustomerId, conversions, validateOnly },
  ) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
    });
    const { data } = await client.post(
      `/customers/${customerId}:uploadCallConversions`,
      {
        conversions,
        partialFailure: true,
        validateOnly,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => uploadCallConversionsExamplePayload,
  examplePayload: uploadCallConversionsExamplePayload,
});
