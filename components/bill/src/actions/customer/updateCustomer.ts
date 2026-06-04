import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { updateCustomerInputs } from "../../inputs/customer";
import { updateCustomerExamplePayload } from "../../examplePayloads";

export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description: "Update a customer object.",
  },
  perform: async (
    context,
    { connection, customerName, customerId, additionalFields },
  ) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      obj: {
        entity: "Customer",
        name: customerName,
        ...(additionalFields || {}),
        id: customerId,
      },
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Update/Customer.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: updateCustomerInputs,
  examplePayload: updateCustomerExamplePayload,
});
