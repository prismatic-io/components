import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { officesV1DataSourceExamplePayload } from "../../examplePayloads/v1/dataSources";
import { connectionInput, version } from "../../inputs";
import type { OfficeDataSources } from "../../types";

export const offices = dataSource({
  display: {
    label: "Fetch Offices (Harvest v1/v2)",
    description: "Fetches an array of office names.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version);
    const { data } = await client.get<OfficeDataSources[]>("/offices");
    const result = data.map<Element>((office) => ({
      label: office.name,
      key: office.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: officesV1DataSourceExamplePayload,
});
