import { dataSource, type Element } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { departmentsV3DataSourceExamplePayload } from "../../examplePayloads/v3/dataSources";
import { connectionOnlyInputs } from "../../inputs/v3/common";
import type { V3Department } from "../../types";
import { fetchAllV3 } from "../../util/v3";

export const departmentsV3 = dataSource({
  display: {
    label: "Fetch Departments",
    description: "Fetches an array of department names.",
  },
  inputs: connectionOnlyInputs,
  perform: async (_context, { connection }) => {
    const client = createV3Client(connection);
    const data = await fetchAllV3<V3Department>(client, "/departments");
    const result = data.map<Element>((department) => ({
      label: department.name,
      key: department.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: departmentsV3DataSourceExamplePayload,
});
