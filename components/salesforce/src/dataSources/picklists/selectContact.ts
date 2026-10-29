import { dataSource } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { selectContactInputs } from "../../inputs";
import { filterAndSort, getRecordsForDatasource } from "../../util";
import type { ElementWithLabel } from "../../types";

export const selectContact = dataSource({
  display: {
    label: "Select Contact",
    description: "A picklist of contacts in the Salesforce org.",
  },
  inputs: selectContactInputs,
  perform: async (context, { version, filterQuery, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const records = await getRecordsForDatasource({
      context,
      salesforceClient,
      recordType: "Contact",
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
