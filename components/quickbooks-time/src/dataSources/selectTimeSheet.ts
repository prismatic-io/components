import type { Element } from "@prismatic-io/spectral";
import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectTimeSheetExamplePayload as examplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs";

export const selectTimeSheet = dataSource({
  display: {
    label: "Select Time Sheet",
    description: "Select a timesheet from a list of timesheets.",
  },
  inputs: { connection },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const { data } = await client.get("/timesheets");

    const timesheetsObj = data?.results?.timesheets ?? {};
    const timesheets = Object.values(timesheetsObj) as { id?: number }[];

    const result: Element[] = timesheets
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
