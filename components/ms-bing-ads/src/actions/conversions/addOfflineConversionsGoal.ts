import { action } from "@prismatic-io/spectral";
import { getClient, sendAsync } from "../../client";
import { BING_API, SOAP_ACTION } from "../../constants";
import { addOfflineConversionGoalExamplePayload } from "../../examplePayloads";
import { addOfflineConversionsGoalInputs } from "../../inputs/conversions";

export const addOfflineConversionsGoal = action({
  display: {
    label: "Add Offline Conversions Goal",
    description:
      "Creates a new offline conversions goal. Utilizes the SOAP API.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      conversionGoalCategory,
      conversionScope,
      conversionStatus,
      conversionWindowInMinutes,
      countType,
      excludeFromBidding,
      isEnhancedConversionsEnabled,
      isExternallyAttributed,
      name,
      accountIdInput,
      customerIdInput,
    },
  ) => {
    const client = await getClient({
      connection,
      wsdl: BING_API.CAMPAIGN_MANAGEMENT_API.WSDL,
      soapHeaders: {
        CustomerId: customerIdInput,
        CustomerAccountId: accountIdInput,
      },
    });

    const goalFields = Object.fromEntries(
      Object.entries({
        ConversionWindowInMinutes: conversionWindowInMinutes,
        CountType: countType,
        ExcludeFromBidding: excludeFromBidding,
        GoalCategory: conversionGoalCategory,
        IsEnhancedConversionsEnabled: isEnhancedConversionsEnabled,
        Name: name,
        Scope: conversionScope,
        Status: conversionStatus,
        IsExternallyAttributed: isExternallyAttributed,
      }).filter(([, v]) => v !== undefined && v !== ""),
    );

    const conversionGoal = {
      ConversionGoals: {
        "ConversionGoal xmlns:i='http://www.w3.org/2001/XMLSchema-instance' i:type='OfflineConversionGoal'":
          goalFields,
      },
    };

    const response = await sendAsync({
      debug,
      args: conversionGoal,
      client,
      soapAction: SOAP_ACTION.AddConversionGoals,
      targetNamespace: BING_API.CAMPAIGN_MANAGEMENT_API.TN,
    });

    return {
      data: response,
    };
  },
  inputs: addOfflineConversionsGoalInputs,
  examplePayload: addOfflineConversionGoalExamplePayload,
});
