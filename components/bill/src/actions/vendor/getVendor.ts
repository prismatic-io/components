import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { getVendorInputs } from "../../inputs/vendor";
import { getVendorExamplePayload } from "../../examplePayloads";

export const getVendor = action({
  display: {
    label: "Get Vendor",
    description: "Read a vendor object.",
  },
  perform: async (context, { connection, vendorId }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      id: vendorId,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Read/Vendor.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: getVendorInputs,
  examplePayload: getVendorExamplePayload,
});
