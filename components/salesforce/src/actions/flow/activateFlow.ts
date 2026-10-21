import { action, outputSchema } from "@prismatic-io/spectral";
import { saveFlowOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { activateFlowInputs } from "../../inputs";
import { activateFlowFunction, processMetadataResult } from "../../util";
import { generateApiName } from "../../util";
import { activateFlowExamplePayload } from "../../examplePayloads";
export const activateFlow = action({
  display: {
    label: "Activate Flow",
    description: "Activate a Flow in Salesforce by name.",
  },
  inputs: activateFlowInputs,
  performSafety: "notAllowed",
  perform: async (_context, { version, flowName, connection }) => {
    const client = await createSalesforceClient(connection, version);
    const fullName = generateApiName(flowName);
    const result = await activateFlowFunction(client, fullName);
    return { data: processMetadataResult(result) };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => activateFlowExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: saveFlowOutputSchema,
  }),
  examplePayload: activateFlowExamplePayload,
});
