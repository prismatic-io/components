import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getBillResponse } from "../../examplePayloads/bills";
import { billId, connection } from "../../inputs";

export const getBill = action({
  display: {
    label: "Get Bill",
    description: "Retrieve a bill by ID",
  },
  inputs: {
    billId,
    connection,
  },
  perform: async (context, { connection, billId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/bills/${billId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getBillResponse,
  },
});
