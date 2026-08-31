import { action } from "@prismatic-io/spectral";
import { cleanReturnData } from "../../util";
import { stringify } from "qs";
import { getClient } from "../../client";
import { bulkUpdateVendorsInputs } from "../../inputs/vendor";
import { bulkUpdateVendorsExamplePayload } from "../../examplePayloads";
export const bulkUpdateVendors = action({
  display: {
    label: "Bulk Update Vendors",
    description: "Bulk update vendor objects.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, vendorUpdateBulk }) => {
    const { client, loginData } = await getClient(
      connection,
      context.debug.enabled,
    );
    const sendData = {
      bulk: vendorUpdateBulk,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });
    const { data } = await client.post(
      "/Bulk/Crud/Update/Vendor.json",
      stringifiedData,
    );
    return {
      data: cleanReturnData(data),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: bulkUpdateVendorsExamplePayload.data,
  }),
  inputs: bulkUpdateVendorsInputs,
  examplePayload: bulkUpdateVendorsExamplePayload,
});
