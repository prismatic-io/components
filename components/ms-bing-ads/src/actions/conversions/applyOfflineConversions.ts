import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, SOAP_ACTION } from "../../constants";
import { applyOfflineConversionsExamplePayload } from "../../examplePayloads";
import { applyOfflineConversionsInputs } from "../../inputs/conversions";
import type { OfflineConversion } from "../../types";

export const applyOfflineConversions = action({
  display: {
    label: "Apply Offline Conversions",
    description:
      "Applies offline conversions to a Microsoft Advertising account. Utilizes the SOAP API.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, offlineConversionsBody, accountIdInput, customerIdInput },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CAMPAIGN_MANAGEMENT_API.WSDL,
      soapHeaders: {
        CustomerId: customerIdInput,
        CustomerAccountId: accountIdInput,
      },
    });

    const conversionGoal = {
      OfflineConversions: {
        ConversionGoal: offlineConversionsBody as OfflineConversion[],
      },
    };

    const response = await sendAsync({
      debug,
      args: conversionGoal,
      client,
      soapAction: SOAP_ACTION.ApplyOfflineConversions,
      targetNamespace: BING_API.CAMPAIGN_MANAGEMENT_API.TN,
    });

    return {
      data: response,
    };
  },
  inputs: applyOfflineConversionsInputs,
  examplePayload: applyOfflineConversionsExamplePayload,
});
