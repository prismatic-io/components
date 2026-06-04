import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { deleteVendorInputs } from "../../inputs/vendor";
import { deleteVendorExamplePayload } from "../../examplePayloads";

export const deleteVendor = action({
  display: {
    label: "Delete Vendor",
    description: "Delete a vendor object.",
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
      "/Crud/Delete/Vendor.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: deleteVendorInputs,
  examplePayload: deleteVendorExamplePayload,
});
