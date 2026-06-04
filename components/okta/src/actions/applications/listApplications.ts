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
    { after, connection, expand, filter, includeNonDeleted, limit, q, useOptimization, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await paginateRecordsWithLink<Application>(client, "/apps", fetchAll, {
      after,
      expand,
      filter,
      includeNonDeleted,
      limit,
      q,
      useOptimization,
    });

    return {
      data,
    };
  },
  examplePayload: listApplicationsExamplePayload,
});
