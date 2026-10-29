import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";

export interface FullfillmentCenter {
  id?: number;
  name?: string;
  timezone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  phone_number?: string;
  email?: string;
}

export const fulfillmentCenters = dataSource({
  display: {
    label: "Fetch Fulfillment Centers",
    description: "Fetch an array of Fulfillment Centers",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version, false);
    const { data } =
      await client.get<FullfillmentCenter[]>("/fulfillmentCenter");
    const result = data.map<Element>((fulfillment) => ({
      label:
        fulfillment.name ||
        `${fulfillment.address1} ${fulfillment.address2} / ${fulfillment.country}, ${fulfillment.state}, ${fulfillment.city}`,
      key: fulfillment.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Cicero (IL)", key: "0" },
      { label: "5900 W Ogden Ave Suite 100 / USA, IL, Cicero", key: "47012" },
    ],
  },
});
