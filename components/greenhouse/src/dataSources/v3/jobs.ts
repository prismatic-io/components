import { dataSource, type Element } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { jobsV3DataSourceExamplePayload } from "../../examplePayloads/v3/dataSources";
import { connectionOnlyInputs } from "../../inputs/v3/common";
import type { V3Job } from "../../types";
import { fetchAllV3 } from "../../util/v3";

export const jobsV3 = dataSource({
  display: {
    label: "Fetch Jobs",
    description: "Fetches an array of job names.",
  },
  inputs: connectionOnlyInputs,
  perform: async (_context, { connection }) => {
    const client = createV3Client(connection);
    const data = await fetchAllV3<V3Job>(client, "/jobs");
    const result = data.map<Element>((job) => ({
      label: job.name,
      key: job.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: jobsV3DataSourceExamplePayload,
});
