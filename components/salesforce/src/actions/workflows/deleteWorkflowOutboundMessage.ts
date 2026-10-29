import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteMetadataComponentOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteWorkflowOutboundMessageInputs } from "../../inputs";
import { deleteWorkflowOutboundMessageFunction } from "../../util";
import { genericCreateUpdateFullNameExamplePayload } from "../../examplePayloads";

export const deleteWorkflowOutboundMessage = action({
  display: {
    label: "Delete Workflow Outbound Message",
    description: "Delete a Workflow Outbound Message.",
  },
  inputs: deleteWorkflowOutboundMessageInputs,
  performSafety: "notAllowed",
  perform: async (_context, { version, fullName, connection }) => {
    const client = await createSalesforceClient(connection, version);

    const result = await deleteWorkflowOutboundMessageFunction(
      client,
      fullName,
    );
    return { data: result };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    genericCreateUpdateFullNameExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteMetadataComponentOutputSchema,
  }),
  examplePayload: genericCreateUpdateFullNameExamplePayload,
});
