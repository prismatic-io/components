import { dataSource } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../client";
import { selectJobExamplePayload } from "../examplePayloads";
import { selectJobInputs } from "../inputs";
import type { Job } from "../types";
import { fetchAllPages, toPicklistResult } from "../util";








export const selectJob = dataSource({
  display: {
    label: "Select Job",
    description: "Select a job definition from the available jobs in UKG Pro.",
  },
  inputs: selectJobInputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection, companyId }) => {
    const client = createBasicAuthClient(connection);

    const jobs = await fetchAllPages<Job>(client, "/configuration/v2/jobs", {
      params: { company: companyId },
    });

    const result = toPicklistResult(jobs, {
      getLabel: (job) => `${job.title} (${job.jobCode})`,
      getKey: (job) => job.jobCode,
    });

    return { result };
  },
  examplePayload: selectJobExamplePayload,
});
