import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection, returnIdInput } from "../inputs";
import { queryRecordsPaginated } from "../utils";

export const selectCustomer = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Customer",
    description: "A picklist of customers in Sage Intacct.",
  },
  perform: async (_context, { connection, returnIdInput }) => {
    const customers = await queryRecordsPaginated(
      connection,
      "CUSTOMER",
      
      ["*"],
      "",
    );

    return {
      result: customers.map(
        (customer: {
          RECORDNO: string;
          CUSTOMERID: string;
          NAME: string;
          DISPLAYCONTACT: { CONTACTNAME: string };
        }): Element => {
          const label = customer?.DISPLAYCONTACT?.CONTACTNAME || customer.NAME;
          return {
            label,
            key: returnIdInput ? customer.CUSTOMERID : customer.RECORDNO,
          };
        },
      ),
    };
  },
  inputs: { connection, returnIdInput },
});
