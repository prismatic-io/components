import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { businessEntityDatasource } from "../examplePayloads/datasources";
import { connection } from "../inputs";
import type { BusinessEntity } from "../interfaces/businessEntities";
import { fetchAllData } from "../util";

export const selectBusinessEntity = dataSource({
  display: {
    label: "Select Business Entity",
    description: "Select a Business Entity from a dropdown menu.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection);
    const { data } = await fetchAllData<BusinessEntity>(client, "entities", {}, true);

    const objects = data
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((businessEntity) => ({
        key: businessEntity.id,
        label: businessEntity.entity_name,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: businessEntityDatasource,
  },
});
