import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteMetadataComponentOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteWorkflowRuleInputs } from "../../inputs";
import { deleteWorkflowRuleFunction } from "../../util";
import { genericCreateUpdateFullNameExamplePayload } from "../../examplePayloads";

export const deleteWorkflowRule = action({
  display: {
    label: "Delete Workflow Rule",
    description:
      "Delete a Workflow Rule. Workflow Rules are deprecated by Salesforce; migrate to Flow-based actions.",
  },
  inputs: deleteWorkflowRuleInputs,
  performSafety: "notAllowed",
  perform: async (_context, { version, fullName, connection }) => {
    const client = await createSalesforceClient(connection, version);

    const result = await deleteWorkflowRuleFunction(client, fullName);
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
