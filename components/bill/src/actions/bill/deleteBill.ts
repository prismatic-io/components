import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { deleteBillInputs } from "../../inputs/bill";
import { deleteBillExamplePayload } from "../../examplePayloads";

export const deleteBill = action({
  display: {
    label: "Delete Bill",
    description: "Delete a bill object.",
  },
  perform: async (context, { connection, billId }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      id: billId,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Delete/Bill.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: deleteBillInputs,
  examplePayload: deleteBillExamplePayload,
});
