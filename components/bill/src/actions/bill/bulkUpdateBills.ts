import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { bulkUpdateBillsInputs } from "../../inputs/bill";
import { bulkUpdateBillsExamplePayload } from "../../examplePayloads";

export const bulkUpdateBills = action({
  display: {
    label: "Bulk Update Bills",
    description: "Bulk update bill objects.",
  },
  perform: async (context, { connection, billsUpdateBulk }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      bulk: billsUpdateBulk,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Bulk/Crud/Update/Bill.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: bulkUpdateBillsInputs,
  examplePayload: bulkUpdateBillsExamplePayload,
});
