import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import {
  busEventSubscriberCode,
  sapObjectType,
  sapObjectTaskCode,
  requestBodyCode,
  connectionInput,
} from "../inputs";

export const updateSubscription = action({
  display: {
    label: "Update Subscription",
    description:
      "Updates business events subscription status using the business event subscriber code, SAP object type, SAP object task code, and business event subscription state code.",
  },
  perform: async (
    _context,
    { busEventSubscriberCode, sapObjectType, sapObjectTaskCode, requestBodyCode, connectionInput },
  ) => {
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.patch(
        `/sap/opu/odata/sap/CA_BEH_SUBSCRIPTION_SRV/SubscriptionMaintain(BusEventSubscriberCode='${busEventSubscriberCode}',SAPObjectType='${sapObjectType}',SAPObjectTaskCode='${sapObjectTaskCode}')`,
        requestBodyCode,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    busEventSubscriberCode,
    sapObjectType,
    sapObjectTaskCode,
    requestBodyCode: {
      ...requestBodyCode,
      required: true,
      default: `{
      "d": {
        "BusEventSubscriptionStateCode": "s",
        "BusEventPriority": 0
      }
    }`,
    },
    connectionInput,
  },
});
