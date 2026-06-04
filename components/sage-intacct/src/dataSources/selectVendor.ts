import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection, returnIdInput } from "../inputs";
import { queryRecordsPaginated } from "../utils";

export const selectVendor = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Vendor",
    description: "A picklist of vendors in Sage Intacct.",
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
          DISPLAYCONTACT: { CONTACTNAME: string };
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
  inputs: { connection, returnIdInput },
});
