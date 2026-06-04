import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";
import type { JobDataSources } from "../types";

export const jobs = dataSource({
  display: {
    label: "Fetch Jobs",
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
  examplePayload: {
    result: [
      { label: "Archaeologist", key: "650" },
      { label: "Example", key: "47012" },
    ],
  },
});
