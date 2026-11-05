import type { Element } from "@prismatic-io/spectral";
import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectJobCodeAssignmentExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs";

export const selectJobCodeAssignment = dataSource({
  display: {
    label: "Select Job Code Assignment",
    description: "Select a job code assignment from a list of job code assignments.",
  },
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/jobcode_assignments");

    const assignmentsObj = data?.results?.jobcode_assignments ?? {};
    const assignments = Object.values(assignmentsObj) as { id?: number }[];

    const result: Element[] = assignments
      .map((item) => ({
        label: String(item.id || ""),
        key: String(item.id || ""),
      }))
      .sort((a: Element, b: Element) => (a.label ?? "").localeCompare(b.label ?? ""));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
