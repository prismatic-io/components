import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { listJobsInputs } from "../../inputs";
import type { Job } from "../../types";
import { fetchWithPagination } from "../../util";
export const listJobs = action({
  display: {
    label: "List Jobs",
    description: "Retrieve a list of job definitions in the organization.",
  },
  inputs: listJobsInputs,
  perform: async (context, { connection, companyId, pagination, fetchAll }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);
    const { data } = await fetchWithPagination<Job>(
      client,
      "/configuration/v2/jobs",
      {
        company: companyId,
        page: pagination.page,
        per_page: pagination.perPage,
      },
      fetchAll,
    );
    return { data };
  },
});
