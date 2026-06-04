import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { bulkCreateVendorInputs } from "../../inputs/vendor";
import { bulkCreateVendorExamplePayload } from "../../examplePayloads";

export const bulkCreateVendor = action({
  display: {
    label: "Bulk Create Vendor",
    description: "Bulk create vendor objects.",
  },
  perform: async (context, { connection, vendorCreateBulk }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      bulk: vendorCreateBulk,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Bulk/Crud/Create/Vendor.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: bulkCreateVendorInputs,
  examplePayload: bulkCreateVendorExamplePayload,
});
