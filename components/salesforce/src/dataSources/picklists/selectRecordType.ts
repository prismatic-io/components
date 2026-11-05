import { dataSource } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { selectRecordTypeInputs } from "../../inputs";
import { filterAndSort } from "../../util";
import type { ElementWithLabel } from "../../types";

export const selectRecordType = dataSource({
  display: {
    label: "Select Record Type",
    description: "A picklist of record types in the Salesforce org.",
  },
  inputs: selectRecordTypeInputs,
  perform: async (_context, { version, filterQuery, connection }) => {
    const httpClient = await createSalesforceHttpClient(version, connection);

    const {
      data: { sobjects },
    } = await httpClient.get("/sobjects");

    const objects: ElementWithLabel[] = sobjects.map((sobject: Record<string, unknown>) => ({
      label: sobject.label,
      key: sobject.name,
    }));

    return {
      result: filterAndSort(objects, filterQuery),
    };
  },
  dataSourceType: "picklist",
});
