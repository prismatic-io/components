import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectCustomerExamplePayload } from "../examplePayloads";
import { selectCustomerInputs } from "../inputs";
import { queryRecordsPaginated } from "../util";
export const selectCustomer = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Customer",
    description: "Lists customers in Sage Intacct.",
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
          DISPLAYCONTACT: {
            CONTACTNAME: string;
          };
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
  inputs: selectCustomerInputs,
  examplePayload: selectCustomerExamplePayload,
});
