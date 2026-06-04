import type { Element } from "@prismatic-io/spectral";
import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectJobCodeExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs";

export const selectJobCode = dataSource({
  display: {
    label: "Select Job Code",
    description: "Select a job code from a list of job codes.",
  },
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/jobcodes");

    const jobcodesObj = data?.results?.jobcodes ?? {};
    const jobcodes = Object.values(jobcodesObj) as { name?: string; id?: number }[];

    const result: Element[] = jobcodes
      .map((item) => ({
        label: item.name || String(item.id || ""),
        key: String(item.id || ""),
      }))
      .sort((a: Element, b: Element) => (a.label ?? "").localeCompare(b.label ?? ""));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
