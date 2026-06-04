import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { bulkCreateCustomersInputs } from "../../inputs/customer";
import { bulkCreateCustomersExamplePayload } from "../../examplePayloads";

export const bulkCreateCustomers = action({
  display: {
    label: "Bulk Create Customers",
    description: "Bulk create customer objects.",
  },
  perform: async (context, { connection, customersCreateBulk }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      bulk: customersCreateBulk,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Bulk/Crud/Create/Customer.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: bulkCreateCustomersInputs,
  examplePayload: bulkCreateCustomersExamplePayload,
});
