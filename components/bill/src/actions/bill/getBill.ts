import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { getBillInputs } from "../../inputs/bill";
import { getBillExamplePayload } from "../../examplePayloads";

export const getBill = action({
  display: {
    label: "Get Bill",
    description: "Read a bill object.",
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

    const { data } = await client.post("/Crud/Read/Bill.json", stringifiedData);

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: getBillInputs,
  examplePayload: getBillExamplePayload,
});
