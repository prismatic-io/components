import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { listCustomerInputs } from "../../inputs/customer";
import { listCustomerExamplePayload } from "../../examplePayloads";

export const listCustomer = action({
  display: {
    label: "List Customers",
    description: "List customer objects.",
  },
  perform: async (
    context,
    { connection, filters, sort, start, max, nested },
  ) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      start,
      max,
      filters,
      sort,
      nested,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post("/List/Customer.json", stringifiedData);

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: listCustomerInputs,
  examplePayload: listCustomerExamplePayload,
});
