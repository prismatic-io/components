import { action, outputSchema } from "@prismatic-io/spectral";
import { saveFlowOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { deactivateFlowInputs } from "../../inputs";
import { deactivateFlowFunction, processMetadataResult } from "../../util";
import { generateApiName } from "../../util";
import { deactivateFlowExamplePayload } from "../../examplePayloads";

export const deactivateFlow = action({
  display: {
    label: "Deactivate Flow",
    description: "Deactivate a Flow in Salesforce by name.",
  },
  inputs: deactivateFlowInputs,
  performSafety: "notAllowed",
  perform: async (_context, { version, flowName, connection }) => {
    const client = await createSalesforceClient(connection, version);
    const fullName = generateApiName(flowName);

    const result = await deactivateFlowFunction(client, fullName);

    return { data: processMetadataResult(result) };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    deactivateFlowExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: saveFlowOutputSchema,
  }),
  examplePayload: deactivateFlowExamplePayload,
});
