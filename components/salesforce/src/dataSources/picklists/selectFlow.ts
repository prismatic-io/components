import { dataSource } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { selectFlowInputs } from "../../inputs";
import { filterAndSort, listFlowsFunction } from "../../util";
import type { ElementWithLabel } from "../../types";

export const selectFlow = dataSource({
  display: {
    label: "Select Flow",
    description: "A picklist of available Flows in the Salesforce org.",
  },
  inputs: selectFlowInputs,
  perform: async (context, { version, filterQuery, connection }) => {
    try {
      const salesforceClient = await createSalesforceClient(connection, version);
      const flows = await listFlowsFunction(salesforceClient);

      if (!flows || !Array.isArray(flows)) {
        throw new Error("Invalid response format from Salesforce API");
      }

      const objects: ElementWithLabel[] = flows.map((flow) => ({
        label: flow.fullName,
        key: flow.fullName,
      }));

      return {
        result: filterAndSort(objects, filterQuery),
      };
    } catch (error) {
      if ((context as { debug?: { enabled: boolean } }).debug?.enabled) {
        console.error("Failed to fetch flows:", error);
      }
      throw new Error(`Failed to fetch flows: ${(error as Error).message}`);
    }
  },
  dataSourceType: "picklist",
});
