import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectCustomerInputs } from "../inputs";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";
import { PAGE_SIZE, RESOURCE_CONFIG } from "../constants";
export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "Select a customer from the list of available customers.",
  },
  inputs: selectCustomerInputs,
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
      RESOURCE_CONFIG.customers.endpoint,
      stringifiedData,
    );
    const cleanData = cleanReturnData(data);
    const objects = (
      cleanData as {
        id: string;
        name: string;
      }[]
    ).map<Element>((customer) => ({
      key: customer.id,
      label: customer.name,
    }));
    return { result: objects };
  },
});
