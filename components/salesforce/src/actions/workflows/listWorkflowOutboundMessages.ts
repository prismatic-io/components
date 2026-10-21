import { action, outputSchema } from "@prismatic-io/spectral";
import { listMetadataOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { listWorkflowOutboundMessagesInputs } from "../../inputs";
import { listWorkflowOutboundMessagesFunction } from "../../util";
import { listWorkflowOutboundMessagesExamplePayload } from "../../examplePayloads";
export const listWorkflowOutboundMessages = action({
  display: {
    label: "List Outbound Messages",
    description: "Retrieve all Outbound Messages in the Salesforce org.",
  },
  inputs: listWorkflowOutboundMessagesInputs,
  performSafety: "notAllowed",
  perform: async (_context, { version, connection }) => {
    const client = await createSalesforceClient(connection, version);
    const result = await listWorkflowOutboundMessagesFunction(client);
    return { data: result };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listWorkflowOutboundMessagesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMetadataOutputSchema,
  }),
  examplePayload: listWorkflowOutboundMessagesExamplePayload,
});
