import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { deleteCustomerInputs } from "../../inputs/customer";
import { deleteCustomerExamplePayload } from "../../examplePayloads";

export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Delete a customer object.",
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
      "/Crud/Delete/Customer.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: deleteCustomerInputs,
  examplePayload: deleteCustomerExamplePayload,
});
