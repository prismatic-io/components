import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { listVendorsInputs } from "../../inputs/vendor";
import { listVendorsExamplePayload } from "../../examplePayloads";

export const listVendors = action({
  display: {
    label: "List Vendors",
    description: "List vendor objects.",
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

    const { data } = await client.post("/List/Vendor.json", stringifiedData);

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: listVendorsInputs,
  examplePayload: listVendorsExamplePayload,
});
