import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteMetadataComponentOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deleteFlowInputs } from "../../inputs";
import { deleteFlowFunction, processMetadataResult } from "../../util";
import { generateApiName } from "../../util";
import { deleteFlowExamplePayload } from "../../examplePayloads";
export const deleteFlow = action({
  display: {
    label: "Delete Flow",
    description: "Delete a Flow from Salesforce by name.",
  },
  inputs: deleteFlowInputs,
  performSafety: "notAllowed",
  perform: async (_context, { version, flowName, connection }) => {
    const client = await createSalesforceClient(connection, version);
    const fullName = generateApiName(flowName);
    const result = await deleteFlowFunction(client, fullName);
    return { data: processMetadataResult(result) };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteFlowExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteMetadataComponentOutputSchema,
  }),
  examplePayload: deleteFlowExamplePayload,
});
