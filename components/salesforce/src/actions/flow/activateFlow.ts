import { action } from "@prismatic-io/spectral";
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
  perform: async (_context, { version, flowName, connection }) => {
    const client = await createSalesforceClient(connection, version);
    const fullName = generateApiName(flowName);
    const result = await activateFlowFunction(client, fullName);
    return { data: processMetadataResult(result) };
  },
  examplePayload: activateFlowExamplePayload,
});
