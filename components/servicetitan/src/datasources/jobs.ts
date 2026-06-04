import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { jobDatasource } from "../examplePayloads";
import { connection } from "../inputs";
import type { Job } from "../interfaces";

export const selectJob = dataSource({
  display: {
    label: "Select Job",
    description: "Select a job from a dropdown menu (up to 10,000 jobs)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "jpm");
    let jobs: Job[] = [];
    let cursor = false;
    let page = 1;
    do {
      const { data } = await client.get(`/jobs`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      jobs = [...jobs, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    
    const objects = jobs
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((job) => ({
        key: job.id.toString(),
        label: `#${job.id}`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: jobDatasource,
  },
});
