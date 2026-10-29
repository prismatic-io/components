import { dataSource, type Element } from "@prismatic-io/spectral";
import { createWorkflowClient } from "../client";
import { selectJobResponse } from "../examplePayloads";
import { connection } from "../inputs";
import type { Records } from "../types";
import { sortArray } from "../util";

export const selectJob = dataSource({
  display: {
    label: "Select Job",
    description: "Select a job from the list of jobs available in Bynder.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createWorkflowClient(connection, false);
    const { data } = await client.get("/jobs");
    if (Array.isArray(data)) {
      const objects = sortArray<Records>(data, "name").map<Element>((job) => ({
        key: job.id.toString(),
        label: `${job.name} (ID: ${job.id})`,
      }));

      return { result: objects };
    }
    return { result: [] };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectJobResponse,
  },
});
