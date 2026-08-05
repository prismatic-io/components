import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTechniciansExamplePayload } from "../../examplePayloads";
import { listTechniciansInputs } from "../../inputs";
import type { Technician } from "../../types";
import { fetchAllRecords } from "../../util";
export const listTechnicians = action({
  display: {
    label: "List Technicians",
    description: "Retrieve a list of technicians",
  },
  inputs: listTechniciansInputs,
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
  examplePayload: listTechniciansExamplePayload,
});
