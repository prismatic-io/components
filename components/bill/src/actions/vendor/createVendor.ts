import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { createVendorInputs } from "../../inputs/vendor";
import { createVendorExamplePayload } from "../../examplePayloads";
export const createVendor = action({
  display: {
    label: "Create Vendor",
    description: "Create a vendor object.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, name, companyName, email, additionalFields },
  ) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );
    const sendData = {
      obj: {
        entity: "Vendor",
        name,
        companyName,
        email,
        ...(additionalFields || {}),
      },
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });
    const { data } = await client.post(
      "/Crud/Create/Vendor.json",
      stringifiedData,
    );
    return {
      data: cleanReturnData(data),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createVendorExamplePayload.data,
  }),
  inputs: createVendorInputs,
  examplePayload: createVendorExamplePayload,
});
