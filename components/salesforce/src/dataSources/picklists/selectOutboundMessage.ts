import { dataSource } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { selectOutboundMessageInputs } from "../../inputs";
import {
  filterAndSort,
  listWorkflowOutboundMessagesFunction,
  removeObjectPrefix,
} from "../../util";
import type { ElementWithLabel } from "../../types";

export const selectOutboundMessage = dataSource({
  display: {
    label: "Select Outbound Message",
    description: "A picklist of available Outbound Messages in the Salesforce org.",
  },
  inputs: selectOutboundMessageInputs,
  perform: async (_context, { version, filterQuery, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const outboundMessages = await listWorkflowOutboundMessagesFunction(salesforceClient);

    const objects: ElementWithLabel[] = (outboundMessages || []).map((message) => {
      const fullName = removeObjectPrefix(message.fullName);
      return {
        label: fullName,
        key: fullName,
      };
    });

    return {
      result: filterAndSort(objects, filterQuery),
    };
  },
  dataSourceType: "picklist",
});
