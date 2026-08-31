import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectVendorInputs } from "../inputs";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";
import { PAGE_SIZE, RESOURCE_CONFIG } from "../constants";
export const selectVendor = dataSource({
  display: {
    label: "Select Vendor",
    description: "Select a vendor from the list of available vendors.",
  },
  inputs: selectVendorInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const { client, loginData } = await getClient(connection, false);
    const sendData = {
      start: 0,
      max: PAGE_SIZE,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });
    const { data } = await client.post(
      RESOURCE_CONFIG.vendors.endpoint,
      stringifiedData,
    );
    const cleanData = cleanReturnData(data);
    const objects = (
      cleanData as {
        id: string;
        name: string;
      }[]
    ).map<Element>((vendor) => ({
      key: vendor.id,
      label: vendor.name,
    }));
    return { result: objects };
  },
});
