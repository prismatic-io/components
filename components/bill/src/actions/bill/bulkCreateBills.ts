import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { bulkCreateBillsInputs } from "../../inputs/bill";
import { bulkCreateBillsExamplePayload } from "../../examplePayloads";

export const bulkCreateBills = action({
  display: {
    label: "Bulk Create Bills",
    description: "Bulk create bill objects.",
  },
  perform: async (context, { connection, billsCreateBulk }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      bulk: billsCreateBulk,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Bulk/Crud/Create/Bill.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: bulkCreateBillsInputs,
  examplePayload: bulkCreateBillsExamplePayload,
});
