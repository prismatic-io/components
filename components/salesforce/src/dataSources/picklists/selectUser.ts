import { dataSource } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { selectUserInputs } from "../../inputs";
import { filterAndSort, getRecordsForDatasource } from "../../util";
import type { ElementWithLabel } from "../../types";

export const selectUser = dataSource({
  display: {
    label: "Select User",
    description: "A picklist of users in the Salesforce org.",
  },
  inputs: selectUserInputs,
  perform: async (context, { version, filterQuery, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const records = await getRecordsForDatasource({
      context,
      salesforceClient,
      recordType: "User",
      labelKey: "Username",
      valueKey: "Username",
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
