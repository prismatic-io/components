import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { updateBillInputs } from "../../inputs/bill";
import { updateBillExamplePayload } from "../../examplePayloads";

export const updateBill = action({
  display: {
    label: "Update Bill",
    description: "Update a bill object.",
  },
  perform: async (
    context,
    {
      connection,
      billId,
      vendorId,
      invoiceNumber,
      invoiceDate,
      dueDate,
      billLineItems,
      allowDuplicateInvNum,
      additionalFields,
    },
  ) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      obj: {
        id: billId,
        entity: "Bill",
        vendorId,
        invoiceNumber,
        invoiceDate,
        dueDate,
        billLineItems,
        ...(additionalFields || {}),
      },
      allowDuplicateInvNum,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Update/Bill.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: updateBillInputs,
  examplePayload: updateBillExamplePayload,
});
