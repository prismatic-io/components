import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { listWorkflowOutboundMessagesInputs } from "../../inputs";
import { listWorkflowOutboundMessagesFunction } from "../../util";

export const listWorkflowOutboundMessages = action({
  display: {
    label: "List Outbound Messages",
    description: "Retrieve all Outbound Messages in the Salesforce org.",
  },
  inputs: listWorkflowOutboundMessagesInputs,
  perform: async (_context, { version, connection }) => {
    const client = await createSalesforceClient(connection, version);
    const result = await listWorkflowOutboundMessagesFunction(client);
    return { data: result };
  },
});
