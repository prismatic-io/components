import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { updateVendorInputs } from "../../inputs/vendor";
import { updateVendorExamplePayload } from "../../examplePayloads";

export const updateVendor = action({
  display: {
    label: "Update Vendor",
    description: "Update a vendor object.",
  },
  perform: async (
    context,
    { connection, vendorId, name, additionalFields },
  ) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );

    const sendData = {
      obj: {
        id: vendorId,
        entity: "Vendor",
        name,
        ...(additionalFields || {}),
      },
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post(
      "/Crud/Update/Vendor.json",
      stringifiedData,
    );

    return {
      data: cleanReturnData(data),
    };
  },
  inputs: updateVendorInputs,
  examplePayload: updateVendorExamplePayload,
});
