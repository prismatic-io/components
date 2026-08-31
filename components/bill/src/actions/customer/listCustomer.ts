import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { listCustomerInputs } from "../../inputs/customer";
import { listCustomerExamplePayload } from "../../examplePayloads";
import { RESOURCE_CONFIG } from "../../constants";
export const listCustomer = action({
  display: {
    label: "List Customers",
    description: "List customer objects.",
  },
  performSafety: "notAllowed",
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
    const { data } = await client.post(
      RESOURCE_CONFIG.customers.endpoint,
      stringifiedData,
    );
    return {
      data: cleanReturnData(data),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listCustomerExamplePayload.data,
  }),
  inputs: listCustomerInputs,
  examplePayload: listCustomerExamplePayload,
});
