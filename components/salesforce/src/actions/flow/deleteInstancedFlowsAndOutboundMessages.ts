import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { deleteInstancedFlowsAndOutboundMessagesInputs } from "../../inputs";

import { deleteInstancedFlowsAndOutboundMessagesExamplePayload } from "../../examplePayloads";
import { deleteFlowsAndOutboundMessages } from "../../helpers";

export const deleteInstancedFlowsAndOutboundMessages = action({
  display: {
    label: "Delete Instanced Flows and Outbound Messages",
    description: "Delete all instanced flows and outbound messages for a given endpoint URL.",
  },
  inputs: deleteInstancedFlowsAndOutboundMessagesInputs,
  perform: async (context, { connection, version, endpointUrl }) => {
    const client = await createSalesforceClient(connection, version);
    const { deletedFlows, deletedOutboundMessages } = await deleteFlowsAndOutboundMessages(
      client,
      endpointUrl.trim(),
      context.logger,
    );

    return { data: { deletedFlows, deletedOutboundMessages } };
  },
  examplePayload: deleteInstancedFlowsAndOutboundMessagesExamplePayload,
});
