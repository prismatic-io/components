import { dataSource, type Element } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { officesV3DataSourceExamplePayload } from "../../examplePayloads/v3/dataSources";
import { connectionOnlyInputs } from "../../inputs/v3/common";
import type { V3Office } from "../../types";
import { fetchAllV3 } from "../../util/v3";

export const officesV3 = dataSource({
  display: {
    label: "Fetch Offices",
    description: "Fetches an array of office names.",
  },
  inputs: connectionOnlyInputs,
  perform: async (_context, { connection }) => {
    const client = createV3Client(connection);
    const data = await fetchAllV3<V3Office>(client, "/offices");
    const result = data.map<Element>((office) => ({
      label: office.name,
      key: office.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: officesV3DataSourceExamplePayload,
});
