import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectVendorExamplePayload } from "../examplePayloads";
import { selectVendorInputs } from "../inputs";
import { queryRecordsPaginated } from "../util";
export const selectVendor = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Vendor",
    description: "Lists vendors in Sage Intacct.",
  },
  perform: async (_context, { connection, returnIdInput }) => {
    const vendors = await queryRecordsPaginated(
      connection,
      "VENDOR",
      ["*"],
      "",
    );
    return {
      result: vendors.map(
        (vendor: {
          RECORDNO: string;
          VENDORID: string;
          NAME: string;
          DISPLAYCONTACT: {
            CONTACTNAME: string;
          };
        }): Element => {
          const label = vendor?.DISPLAYCONTACT?.CONTACTNAME || vendor.NAME;
          return {
            label,
            key: returnIdInput ? vendor.VENDORID : vendor.RECORDNO,
          };
        },
      ),
    };
  },
  inputs: selectVendorInputs,
  examplePayload: selectVendorExamplePayload,
});
