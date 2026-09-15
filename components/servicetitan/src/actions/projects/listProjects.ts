import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listProjectsExamplePayload } from "../../examplePayloads";
import { listProjectsInputs } from "../../inputs";
import { listProjectsOutputSchema } from "../../outputSchemas";
import type { Project } from "../../types";
import { fetchAllRecords } from "../../util";
export const listProjects = action({
  display: {
    label: "List Projects",
    description: "Retrieve a list of projects.",
  },
  inputs: listProjectsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProjectsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, pagination, includeTotal, sort, customQueryParams, fetchAll },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    if (fetchAll) {
      const data = await fetchAllRecords<Project>(client, "/projects", {
        includeTotal,
        sort,
        ...customQueryParams,
      });
      return {
        data,
      };
    }
    const { data } = await client.get(`/projects`, {
      params: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => listProjectsExamplePayload,
  examplePayload: listProjectsExamplePayload,
});
