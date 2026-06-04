import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { bulkUpdateCustomersInputs } from "../../inputs/customer";
import { bulkUpdateCustomersExamplePayload } from "../../examplePayloads";

export const bulkUpdateCustomers = action({
  display: {
    label: "Bulk Update Customers",
    description: "Bulk update customer objects.",
  },
  perform: async (context, { connection, customersUpdateBulk }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      bulk: customersUpdateBulk,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Bulk/Crud/Update/Customer.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: bulkUpdateCustomersInputs,
  examplePayload: bulkUpdateCustomersExamplePayload,
});
