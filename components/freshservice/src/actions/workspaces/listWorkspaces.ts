import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listWorkspacesExamplePayload as examplePayload } from "../../examplePayloads";
import { listWorkspacesInputs as inputs } from "../../inputs";
import { listWorkspacesOutputSchema } from "../../outputSchemas";
import { getListData } from "../../util";
export const listWorkspaces = action({
  display: {
    label: "List Workspaces",
    description: "Returns a list of all workspaces.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fetchAll, pagination, additionalQueryParams },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await getListData(client, `/workspaces`, "workspaces", {
      fetchAll,
      params: {
        ...additionalQueryParams,
        per_page: pagination.perPage,
        page: pagination.page,
      },
    });
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWorkspacesOutputSchema,
  }),
  inputs,
  examplePayload,
});
