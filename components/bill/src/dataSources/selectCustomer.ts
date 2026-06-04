import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getClient } from "../client";
import { stringify } from "qs";
import { cleanReturnData } from "../util";

export const selectCustomer = dataSource({
  display: {
    label: "Select Customer",
    description: "Select a customer from the list of available customers.",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const { client, loginData } = await getClient(connection, false);

    const sendData = {
      start: 0,
      max: 999,
    };
    const stringifiedData = stringify({
      data: JSON.stringify(sendData),
      devKey: loginData.devKey,
      sessionId: loginData.sessionId,
    });

    const { data } = await client.post("/List/Customer.json", stringifiedData);
    const cleanData = cleanReturnData(data);
    const objects = (cleanData as { id: string; name: string }[]).map<Element>(
      (customer) => ({
        key: customer.id,
        label: customer.name,
      }),
    );

    return { result: objects };
  },
});
