import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTechniciansExamplePayload } from "../../examplePayloads";
import { listTechniciansInputs } from "../../inputs";
import { listTechniciansOutputSchema } from "../../outputSchemas";
import type { Technician } from "../../types";
import { fetchAllRecords } from "../../util";
export const listTechnicians = action({
  display: {
    label: "List Technicians",
    description: "Retrieve a list of technicians.",
  },
  inputs: listTechniciansInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTechniciansOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => listTechniciansExamplePayload,
  examplePayload: listTechniciansExamplePayload,
});
