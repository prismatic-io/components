import { action } from "@prismatic-io/spectral";
import {
  accountIdInput,
  connectionInput,
  customerIdInput,
  offlineConversionsBody,
} from "../inputs";
import { getClient, sendAsync } from "../client";
import { BING_API } from "../util";
import { OfflineConversion } from "../types";
import { applyOfflineConversionsExamplePayload } from "../examplePayloads";

const SOAP_ACTION = "ApplyOfflineConversions";

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

export const applyOfflineConversions = action({
  display: {
    label: "Apply Offline Conversions",
    description: "Applies offline conversions to a Microsoft Bing Ads account.",
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
      soapAction: SOAP_ACTION,
      targetNamespace: BING_API.CAMPAIGN_MANAGEMENT_API.TN,
    });

    return {
      data: response,
    };
  },
  inputs: {
    offlineConversionsBody,
    accountIdInput: {
      ...accountIdInput,
      label: "Customer Account Id",
      comments:
        "The identifier of the ad account that owns or is associated with the entities in the request. This header element must have the same value as the AccountId body element when both are required",
      required: true,
    },
    customerIdInput: {
      ...customerIdInput,
      comments:
        "The identifier of the manager account (customer) the user is accessing or operating from. A user can have access to multiple manager accounts.",
    },
    connection: connectionInput,
  },
  examplePayload: {
    data: applyOfflineConversionsExamplePayload,
  },
});
