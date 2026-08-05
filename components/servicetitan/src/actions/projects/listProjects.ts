import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listProjectsExamplePayload } from "../../examplePayloads";
import { listProjectsInputs } from "../../inputs";
import type { Project } from "../../types";
import { fetchAllRecords } from "../../util";
export const listProjects = action({
  display: {
    label: "List Projects",
    description: "Retrieve a list of Projects",
  },
  inputs: listProjectsInputs,
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
  examplePayload: listProjectsExamplePayload,
});
