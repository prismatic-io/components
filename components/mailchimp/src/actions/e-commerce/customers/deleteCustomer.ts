import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { storeId, customerId, connectionInput } from "./../../../inputs";

export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Delete a customer from a store",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
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

export default deleteCustomer;
