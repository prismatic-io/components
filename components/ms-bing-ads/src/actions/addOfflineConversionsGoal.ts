import { action } from "@prismatic-io/spectral";
import {
  accountIdInput,
  connectionInput,
  conversionGoalCategory,
  conversionGoalName,
  conversionScope,
  conversionStatus,
  conversionWindowInMinutes,
  countType,
  customerIdInput,
  excludeFromBidding,
  isEnhancedConversionsEnabled,
  isExternallyAttributed,
} from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API } from "../util";
import { addOfflineConversionGoalExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "AddConversionGoals";

export interface OperationError {
  Code: number;
  Details: string;
  Message: string;
}

export interface AddClientLinksResponse {
  OperationErrors: {
    OperationError: OperationError | OperationError[];
  };
  PartialErrors: {
    ArrayOfOperationError: {
      OperationError: OperationError | OperationError[];
    };
  };
}

export const addOfflineConversionsGoal = action({
  display: {
    label: "Add Offline Conversions Goal",
    description: "Creates a new offline conversions goal.",
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
      soapAction: SOAP_ACTION,
      targetNamespace: BING_API.CAMPAIGN_MANAGEMENT_API.TN,
    });

    return {
      data: response,
    };
  },
  inputs: {
    accountIdInput: {
      ...accountIdInput,
      comments:
        "The identifier of the ad account that owns or is associated with the entities in the request. This header element must have the same value as the AccountId body element when both are required",
      required: true,
    },
    name: conversionGoalName,
    conversionGoalCategory,
    conversionWindowInMinutes,
    countType,
    excludeFromBidding,
    isEnhancedConversionsEnabled,
    conversionScope,
    conversionStatus,
    isExternallyAttributed,
    customerIdInput: {
      ...customerIdInput,
      comments:
        "The identifier of the manager account (customer) the user is accessing or operating from. A user can have access to multiple manager accounts.",
    },
    connection: connectionInput,
  },
  examplePayload: {
    data: addOfflineConversionGoalExamplePayload,
  },
});
