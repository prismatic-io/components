import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listApplicationsExamplePayload } from "../../examplePayloads/applications";
import { listApplicationsInputs } from "../../inputs/applications";
import type { Application } from "../../interfaces/application";
import { paginateRecordsWithLink } from "../../util/util";
export const listApplications = action({
  display: {
    label: "List Applications",
    description: "List applications with optional search and filtering.",
  },
  inputs: listApplicationsInputs,
  perform: async (
    context,
    { connection, filter, q, resultOptions = {}, fetchAll, pagination = {} },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateRecordsWithLink<Application>(
      client,
      "/apps",
      fetchAll,
      {
        after: pagination.after,
        expand: resultOptions.expand,
        filter,
        includeNonDeleted: resultOptions.includeNonDeleted,
        limit: pagination.limit,
        q,
        useOptimization: resultOptions.useOptimization,
      },
    );
    return {
      data,
    };
  },
  examplePayload: listApplicationsExamplePayload,
});
