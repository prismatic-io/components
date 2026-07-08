import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { listApplicationsV3ExamplePayload } from "../../../examplePayloads/v3/applications";
import { listApplicationsV3Inputs } from "../../../inputs/v3/applications";
import type { V3Application } from "../../../types";
import { generatePayload, paginateV3 } from "../../../util";
export const listApplicationsV3 = action({
  display: {
    label: "List Applications",
    description: "Retrieves a list of applications.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      pagination: { perPage, cursor } = {},
      idFilters = {},
      dateRangeFilters = {},
      status,
      stageName,
      prospect,
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const filterParams = generatePayload({
      ids: idFilters.ids,
      candidate_ids: idFilters.candidateIds,
      job_ids: idFilters.jobIds,
      prospective_job_ids: idFilters.prospectiveJobIds,
      job_post_ids: idFilters.jobPostIds,
      source_ids: idFilters.sourceIds,
      referrer_ids: idFilters.referrerIds,
      stage_ids: idFilters.stageIds,
      status,
      stage_name: stageName,
      prospect,
      "created_at[gte]": dateRangeFilters.createdAtGte,
      "created_at[lte]": dateRangeFilters.createdAtLte,
      "updated_at[gte]": dateRangeFilters.updatedAtGte,
      "updated_at[lte]": dateRangeFilters.updatedAtLte,
      "last_activity_at[gte]": dateRangeFilters.lastActivityAtGte,
      "last_activity_at[lte]": dateRangeFilters.lastActivityAtLte,
    });
    const data = await paginateV3<V3Application>(
      client,
      "/applications",
      fetchAll,
      { perPage, cursor, params: filterParams },
    );
    return { data };
  },
  inputs: listApplicationsV3Inputs,
  examplePayload: listApplicationsV3ExamplePayload,
});
