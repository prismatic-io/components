import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { MERCHANT_API_BASE_URL } from "../../../constants";
import { rawRequestExamplePayload } from "../../../examplePayloads/v1";
import { rawRequestMerchantInputs } from "../../../inputs/v1";
import { getAccessToken } from "../../../util";
export const rawRequestMerchant = action({
  display: {
    label: "Raw Request (Merchant v1)",
    description: "Send a raw HTTP request to the Google Merchant API.",
  },
  inputs: rawRequestMerchantInputs,
  perform: async (context, { connection, ...requestInputs }) => {
    const token = getAccessToken(connection);
    const { data } = await sendRawRequest(
      MERCHANT_API_BASE_URL,
      { ...requestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
