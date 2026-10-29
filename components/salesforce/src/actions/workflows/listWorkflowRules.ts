import { action, outputSchema } from "@prismatic-io/spectral";
import { listMetadataOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { listWorkflowRulesInputs } from "../../inputs";
import { listWorkflowRulesFunction } from "../../util";
import { listWorkflowRulesExamplePayload } from "../../examplePayloads";

export const listWorkflowRules = action({
  display: {
    label: "List Workflow Rules",
    description:
      "List all Workflow Rules. Workflow Rules are deprecated by Salesforce; migrate to Flow-based actions.",
  },
  inputs: listWorkflowRulesInputs,
  performSafety: "notAllowed",
  perform: async (_context, { version, connection }) => {
    const client = await createSalesforceClient(connection, version);
    const result = await listWorkflowRulesFunction(client);
    return { data: result };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listWorkflowRulesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listMetadataOutputSchema,
  }),
  examplePayload: listWorkflowRulesExamplePayload as unknown,
});
