import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { listFlowsInputs } from "../../inputs";
import { listFlowsFunction } from "../../util";
import { listFlowsExamplePayload } from "../../examplePayloads";

export const listFlows = action({
  display: {
    label: "List Flows",
    description: "List all Flows in the Salesforce org.",
  },
  inputs: listFlowsInputs,
  perform: async (_context, { version, connection }) => {
    const client = await createSalesforceClient(connection, version);
    const result = await listFlowsFunction(client);
    return { data: result };
  },
  examplePayload: listFlowsExamplePayload,
});
