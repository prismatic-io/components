import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { jobsV1DataSourceExamplePayload } from "../../examplePayloads/v1/dataSources";
import { connectionInput, version } from "../../inputs";
import type { JobDataSources } from "../../types";

export const jobs = dataSource({
  display: {
    label: "Fetch Jobs (Harvest v1/v2)",
    description: "Fetches an array of job names.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version);
    const { data } = await client.get<JobDataSources[]>("/jobs");
    const result = data.map<Element>((job) => ({
      label: job.name,
      key: job.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: jobsV1DataSourceExamplePayload,
});
