import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectReportInputs } from "../inputs";

export const selectReport = dataSource({
  display: {
    label: "Select Report",
    description: "Select a report from the Smartsheet account.",
  },
  dataSourceType: "picklist",
  inputs: selectReportInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const {
      data: { data: reports },
    } = await client.get("/reports");

    if (!reports || !Array.isArray(reports)) {
      return { result: [] };
    }

    const result: Element[] = reports.map(({ name: label, id: key }) => ({
      label,
      key: util.types.toString(key),
    }));

    return { result };
  },
});
