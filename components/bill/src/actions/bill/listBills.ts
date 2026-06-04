import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { listBillsInputs } from "../../inputs/bill";
import { listBillsExamplePayload } from "../../examplePayloads";

export const listBills = action({
  display: {
    label: "List Bills",
    description: "List bill objects.",
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

    const { data } = await client.post("/List/Bill.json", stringifiedData);

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: listBillsInputs,
  examplePayload: listBillsExamplePayload,
});
