import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { createCustomerInputs } from "../../inputs/customer";
import { createCustomerExamplePayload } from "../../examplePayloads";

export const createCustomer = action({
  display: {
    label: "Create Customer",
    description: "Create a customer object.",
  },
  perform: async (context, { connection, customerName, additionalFields }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      obj: {
        entity: "Customer",
        name: customerName,
        ...(additionalFields || {}),
      },
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Create/Customer.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: createCustomerInputs,
  examplePayload: createCustomerExamplePayload,
});
