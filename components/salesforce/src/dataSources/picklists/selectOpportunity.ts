import { dataSource } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { selectOpportunityInputs } from "../../inputs";
import { filterAndSort, getRecordsForDatasource } from "../../util";
import type { ElementWithLabel } from "../../types";

export const selectOpportunity = dataSource({
  display: {
    label: "Select Opportunity",
    description: "A picklist of opportunities in the Salesforce org.",
  },
  inputs: selectOpportunityInputs,
  perform: async (context, { version, filterQuery, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const records = await getRecordsForDatasource({
      context,
      salesforceClient,
      recordType: "Opportunity",
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
