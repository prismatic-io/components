import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { storeId, customerId, connectionInput } from "./../../../inputs";

export const getCustomerInfo = action({
  display: {
    label: "Get Customer",
    description: "Get information about a store's specific customer",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      `/ecommerce/stores/${params.storeId}/customers/${params.customerId}`,
    );
    return { data };
  },
  inputs: {
    storeId: { ...storeId, required: true },
    customerId: { ...customerId, required: true },
    connection: connectionInput,
  },
});

export default getCustomerInfo;
