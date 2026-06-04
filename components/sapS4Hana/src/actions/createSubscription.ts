import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { requestBodyCode, connectionInput } from "../inputs";

export const createSubscription = action({
  display: {
    label: "Create Subscription",
    description: "Creates business event subscriptions.",
  },
  perform: async (_context, { requestBodyCode, connectionInput }) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const client = getSapClient(connectionInput, headers);
    try {
      const { data } = await client.post(
        "/sap/opu/odata/sap/CA_BEH_SUBSCRIPTION_SRV/SubscriptionMaintain",
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
    requestBodyCode,
    connectionInput,
  },
});
