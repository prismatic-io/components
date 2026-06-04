import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { getCustomerInputs } from "../../inputs/customer";
import { getCustomerExamplePayload } from "../../examplePayloads";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Read a customer object.",
  },
  perform: async (context, { connection, customerId }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = { id: customerId };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Read/Customer.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: getCustomerInputs,
  examplePayload: getCustomerExamplePayload,
});
