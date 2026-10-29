import { dataSource } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { selectProfileInputs } from "../../inputs";
import { filterAndSort, getRecordsForDatasource } from "../../util";
import type { ElementWithLabel } from "../../types";

export const selectProfile = dataSource({
  display: {
    label: "Select Profile",
    description: "A picklist of profiles in the Salesforce org.",
  },
  inputs: selectProfileInputs,
  perform: async (context, { version, filterQuery, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const records = await getRecordsForDatasource({
      context,
      salesforceClient,
      recordType: "Profile",
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
