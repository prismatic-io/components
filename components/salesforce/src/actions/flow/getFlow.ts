import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { getFlowInputs } from "../../inputs";
import { getFlowFunction } from "../../util";
import { generateApiName } from "../../util";
import { getFlowExamplePayload } from "../../examplePayloads";

export const getFlow = action({
  display: {
    label: "Get Flow",
    description: "Get details of a specific Flow by name.",
  },
  inputs: getFlowInputs,
  perform: async (_context, { version, flowName, connection }) => {
    const client = await createSalesforceClient(connection, version);
    const fullName = generateApiName(flowName);
    const result = await getFlowFunction(client, fullName);
    
    return { data: result as unknown };
  },
  examplePayload: getFlowExamplePayload,
});
