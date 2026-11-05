import { dataSource } from "@prismatic-io/spectral";
import { getMsBusinessCentralClient } from "../client";
import { connectionInput } from "../inputs/general";
import type { Company, MultipleItemsResponse } from "../interfaces";
import { toSortedPicklist } from "./helpers";

export const listCompanies = dataSource({
  display: {
    label: "Select Companies",
    description: "A picklist of company objects in your Business Central organization.",
  },
  perform: async (context, { connection }) => {
    const client = getMsBusinessCentralClient(connection, context, false);
    const { data } = await client.get<MultipleItemsResponse<Company[]>>(`/companies`);

    return {
      result: toSortedPicklist(data.value, (company) => ({
        key: company.id,
        label: company.name,
      })),
    };
  },
  inputs: {
    connection: connectionInput,
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "CRONUS USA, Inc.", key: "5d115c9c-44e3-ea11-bb43-000d3a2feca1" }],
  },
});
