import { dataSource } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { selectBulkJobInputs } from "../../inputs";
import { filterAndSort } from "../../util";
import type { ElementWithLabel } from "../../types";

export const selectBulkJob = dataSource({
  display: {
    label: "Select Bulk Job",
    description: "A picklist of bulk ingest jobs in the Salesforce org.",
  },
  inputs: selectBulkJobInputs,
  perform: async (_context, { version, filterQuery, connection }) => {
    const salesforceClient = await createSalesforceHttpClient(version, connection);
    const { data } = await salesforceClient.get("/jobs/ingest", {
      params: {
        isPkChunkingEnabled: false,
      },
    });
    const objects: ElementWithLabel[] = data.records.map((record: Record<string, unknown>) => ({
      label: `${record.object} / ${record.operation}, ${record.jobType} - ${record.state}`,
      key: record.id,
    }));
    return {
      result: filterAndSort(objects, filterQuery),
    };
  },
  dataSourceType: "picklist",
});
