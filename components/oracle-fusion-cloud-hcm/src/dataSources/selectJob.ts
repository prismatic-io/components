import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DATASOURCE_PAGE_SIZE } from "../constants";
import { selectJobExamplePayload } from "../examplePayloads";
import { selectJobInputs } from "../inputs";
import type { Job } from "../types";
import { mapToElements } from "../util";
export const selectJob = dataSource({
  display: {
    label: "Select Job",
    description: "Select a job definition from Oracle Fusion Cloud HCM.",
  },
  dataSourceType: "picklist",
  inputs: selectJobInputs,
  perform: async (_context, { connection, effectiveDate }) => {
    const client = createClient(connection, false);
    const { data } = await client.get<{
      items: Job[];
    }>("/jobs", {
      params: { limit: DATASOURCE_PAGE_SIZE, onlyData: "true", effectiveDate },
    });
    const result = mapToElements(
      data.items,
      (j) => `${j.JobCode} - ${j.Name}`,
      (j) => j.JobId,
    );
    return { result };
  },
  examplePayload: selectJobExamplePayload,
});
