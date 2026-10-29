import { dataSource, type Element } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { applicationsV3DataSourceExamplePayload } from "../../examplePayloads/v3/dataSources";
import { connectionOnlyInputs } from "../../inputs/v3/common";
import type { V3Application } from "../../types";
import { fetchAllV3 } from "../../util/v3";

export const applicationsV3 = dataSource({
  display: {
    label: "Fetch Applications",
    description: "Fetches an array of applications.",
  },
  inputs: connectionOnlyInputs,
  perform: async (_context, { connection }) => {
    const client = createV3Client(connection);
    const data = await fetchAllV3<V3Application>(client, "/applications");
    const result = data.map<Element>((application) => ({
      label: `#${application.id} - ${application.stage_name ?? "No Stage"} (${application.status})`,
      key: application.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: applicationsV3DataSourceExamplePayload,
});
