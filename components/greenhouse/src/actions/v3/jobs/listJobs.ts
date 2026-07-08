import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { listJobsV3ExamplePayload } from "../../../examplePayloads/v3/jobs";
import { listJobsV3Inputs } from "../../../inputs/v3/jobs";
import type { V3Job } from "../../../types";
import { generatePayload, paginateV3 } from "../../../util";
export const listJobsV3 = action({
  display: {
    label: "List Jobs",
    description: "Retrieves a list of jobs.",
  },
  inputs: listJobsV3Inputs,
  perform: async (
    context,
    {
      connection,
      fetchAll,
      pagination: { perPage, cursor } = {},
      idFilters = {},
      requisitionId,
      status,
      confidential,
      dateRangeFilters = {},
    },
  ) => {
    const client = createV3Client(connection, context.debug.enabled);
    const filterParams = generatePayload({
      ids: idFilters.ids,
      requisition_id: requisitionId,
      status,
      department_id: idFilters.departmentId,
      office_id: idFilters.officeId,
      confidential,
      "created_at[gte]": dateRangeFilters.createdAtGte,
      "created_at[lte]": dateRangeFilters.createdAtLte,
      "updated_at[gte]": dateRangeFilters.updatedAtGte,
      "updated_at[lte]": dateRangeFilters.updatedAtLte,
    });
    const data = await paginateV3<V3Job>(client, "/jobs", fetchAll, {
      perPage,
      cursor,
      params: filterParams,
    });
    return { data };
  },
  examplePayload: listJobsV3ExamplePayload,
});
