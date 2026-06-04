import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listProjectsResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { Project } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listProjects = action({
  display: {
    label: "List Projects",
    description: "Retrieve a list of Projects",
  },
  inputs: {
    connection,
    fetchAll,
    page,
    pageSize,
    includeTotal,
    sort,
    customQueryParams,
  },
  perform: async (
    context,
    {
      connection,
      page,
      pageSize,
      includeTotal,
      sort,
      customQueryParams,
      fetchAll,
    },
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
        page,
        pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listProjectsResponse,
  },
});
