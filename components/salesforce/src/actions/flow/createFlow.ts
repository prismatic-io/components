import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createFlowInputs } from "../../inputs";
import type { FlowMetadata } from "../../types";
import { createFlowFunction, generateApiName, processMetadataResult } from "../../util";
import { createFlowExamplePayload } from "../../examplePayloads";

export const createFlow = action({
  display: {
    label: "Create Flow",
    description: "Create a draft Flow in Salesforce.",
  },
  inputs: createFlowInputs,
  perform: async (
    _context,
    { version, flowName, description, runInMode, flowMetadata, connection },
  ) => {
    const client = await createSalesforceClient(connection, version);

    
    const label = flowName;
    const fullName = generateApiName(flowName);

    const metadata: FlowMetadata = {
      fullName: fullName,
      label,
      processType: "AutoLaunchedFlow", 
      description,
      runInMode: runInMode as FlowMetadata["runInMode"],
      status: "Draft", 
      processMetadataValues: [{ name: "CanvasMode", value: { stringValue: "AUTO_LAYOUT_CANVAS" } }],
      ...(flowMetadata ? flowMetadata : {}),
    };

    if (!metadata.runInMode) {
      metadata.runInMode = "DefaultMode";
    }

    const result = await createFlowFunction(client, metadata);

    return { data: processMetadataResult(result) };
  },
  examplePayload: createFlowExamplePayload,
});
