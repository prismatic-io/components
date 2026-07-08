import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listJobsExamplePayload } from "../../../examplePayloads";
import {
  connectionInput,
  created_after,
  created_before,
  custom_fields,
  department_id,
  external_department_id,
  external_office_id,
  office_id,
  opening_id,
  pagination,
  requisition_id,
  status,
  updated_after,
  updated_before,
  version,
} from "../../../inputs";
import { generatePayload } from "../../../util";
export const listJobs = action({
  display: {
    label: "List Jobs (Harvest v1/v2)",
    description: "Retrieves a list of jobs.",
  },
  perform: async (
    context,
    { connection, version, pagination = {}, ...params },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const generatedParams = generatePayload({
      ...params,
      per_page: pagination.per_page,
      page: pagination.page,
    });
    const { data } = await client.get("/jobs", {
      params: generatedParams,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    version,
    pagination,
    created_before,
    created_after,
    updated_before,
    updated_after,
    requisition_id,
    opening_id,
    status: {
      ...status,
      comments:
        "One of 'open', 'closed', or 'draft'. If included, will only return jobs with that status.",
    },
    department_id,
    external_department_id,
    office_id,
    external_office_id,
    custom_fields,
  },
  examplePayload: listJobsExamplePayload,
});
