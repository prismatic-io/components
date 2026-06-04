import { dataSource } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { selectLeadInputs } from "../../inputs";
import { filterAndSort, getRecordsForDatasource } from "../../util";
import type { ElementWithLabel } from "../../types";

export const selectLead = dataSource({
  display: {
    label: "Select Lead",
    description: "A picklist of leads in the Salesforce org.",
  },
  inputs: selectLeadInputs,
  perform: async (context, { version, filterQuery, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const records = await getRecordsForDatasource({
      context,
      salesforceClient,
      recordType: "Lead",
    });
    const objects: ElementWithLabel[] = records.map((record) => ({
      label: record.label,
      key: record.key,
    }));
    return {
      result: filterAndSort(objects, filterQuery),
    };
  },
  dataSourceType: "picklist",
});
