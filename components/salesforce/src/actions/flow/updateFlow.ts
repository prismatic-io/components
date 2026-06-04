import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { updateFlowInputs } from "../../inputs";
import type { FlowMetadata } from "../../types";
import { getFlowFunction, updateFlowFunction, processMetadataResult } from "../../util";
import { generateApiName } from "../../util";
import { updateFlowExamplePayload } from "../../examplePayloads";

export const updateFlow = action({
  display: {
    label: "Update Flow",
    description: "Update an existing Flow in Salesforce by name.",
  },
  inputs: updateFlowInputs,
  perform: async (
    _context,
    { version, flowName, description, status, flowMetadata, connection },
  ) => {
    const client = await createSalesforceClient(connection, version);

    
    const fullName = generateApiName(flowName);

    const flowData = await getFlowFunction(client, fullName);

    if (description) {
      flowData.description = description;
    }

    if (status) {
      flowData.status = status as FlowMetadata["status"];
    }

    for (const key in flowMetadata) {
      flowData[key] = flowMetadata[key];
    }

    const result = await updateFlowFunction(client, flowData as FlowMetadata);
    return { data: processMetadataResult(result) };
  },
  examplePayload: updateFlowExamplePayload,
});
