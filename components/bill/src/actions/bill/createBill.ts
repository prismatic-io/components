import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { createBillInputs } from "../../inputs/bill";
import { createBillExamplePayload } from "../../examplePayloads";

export const createBill = action({
  display: {
    label: "Create Bill",
    description: "Create a bill object.",
  },
  perform: async (
    context,
    {
      connection,
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
      "/Crud/Create/Bill.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: createBillInputs,
  examplePayload: createBillExamplePayload,
});
