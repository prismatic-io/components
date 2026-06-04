import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTechniciansResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { Technician } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listTechnicians = action({
  display: {
    label: "List Technicians",
    description: "Retrieve a list of technicians",
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
    const client = createClient(connection, "settings", context.debug.enabled);

    if (fetchAll) {
      const data = await fetchAllRecords<Technician>(client, "/technicians", {
        includeTotal,
        sort,
        ...customQueryParams,
      });
      return {
        data,
      };
    }
    const { data } = await client.get(`/technicians`, {
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
    data: listTechniciansResponse,
  },
});
