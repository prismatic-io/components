import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listApplicationsExamplePayload } from "../../../examplePayloads";
import {
  connectionInput,
  created_after,
  created_before,
  job_id,
  last_activity_after,
  pagination,
  status,
  version,
} from "../../../inputs";
import { generatePayload } from "../../../util";
export const listApplications = action({
  display: {
    label: "List Applications (Harvest v1/v2)",
    description: "Retrieves a list of applications.",
  },
  perform: async (
    context,
    {
      connection,
      version,
      pagination = {},
      created_before,
      created_after,
      last_activity_after,
      job_id,
      status,
    },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const params = generatePayload({
      per_page: pagination.per_page,
      page: pagination.page,
      created_before,
      created_after,
      last_activity_after,
      job_id,
      status,
    });
    const { data } = await client.get("/applications", {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    pagination,
    job_id,
    created_before,
    created_after,
    version,
    status,
    last_activity_after,
  },
  examplePayload: listApplicationsExamplePayload,
});
