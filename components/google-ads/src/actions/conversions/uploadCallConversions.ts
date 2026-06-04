import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { uploadConversionGenericResponseExamplePayload } from "../../examplePayloads";
import { uploadCallConversionsInputs } from "../../inputs";

export const uploadCallConversions = action({
  display: {
    label: "Upload Call Conversions",
    description:
      "Upload offline call conversions into Google Ads in order to track ads that led to sales.",
  },
  inputs: uploadCallConversionsInputs,
  perform: async (
    context,
    { connection, customerId, managerCustomerId, conversions, validateOnly },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      context.logger,
      managerCustomerId,
    );
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
  examplePayload: uploadConversionGenericResponseExamplePayload,
});
