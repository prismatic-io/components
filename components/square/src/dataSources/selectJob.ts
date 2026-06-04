import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectJobInputs } from "../inputs";
import { fetchAllPages, sortByLabel } from "../util";

export const selectJob = dataSource({
  display: {
    label: "Select Job",
    description: "Lists jobs in the Square account.",
  },
  inputs: selectJobInputs,
  perform: async (_context, { squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection);

    const allJobs = await fetchAllPages(client, "/v2/team-members/jobs", "jobs");

    const result = (allJobs.jobs as Record<string, unknown>[])
      .map((job: Record<string, unknown>) => ({
        label: job.title as string,
        key: job.id as string,
      }))
      .sort(sortByLabel);

    return {
      result,
    };
  },
  dataSourceType: "picklist",
});
