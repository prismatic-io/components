import type { ActionLogger } from "@prismatic-io/spectral";
import type { Connection, Schema } from "jsforce";
import {
  deactivateFlowFunction,
  processMetadataResult,
  deleteFlowFunction,
  deleteWorkflowOutboundMessageFunction,
} from "../../util";
import { findFlowsUsingOutboundMessages } from "../flows/findFlowsUsingOutboundMessages";
import { getAllFlowMetadata } from "../flows/getAllFlowMetadata";
import { getOutboundMessagesPointingToEndpointUrl } from "./getOutboundMessagesPointingToEndpointUrl";

export const deleteFlowsAndOutboundMessages = async (
  client: Connection<Schema>,
  endpointUrl: string,
  logger: ActionLogger,
) => {
  const deletedFlows: string[] = [];
  const deletedOutboundMessages: string[] = [];

  const outboundMessages = await getOutboundMessagesPointingToEndpointUrl(
    client,
    endpointUrl,
    logger,
  );

  if (outboundMessages.length > 0) {
    const flows = await getAllFlowMetadata(client);
    const flowsUsingOutboundMessages = findFlowsUsingOutboundMessages(flows, outboundMessages);

    for (const flow of flowsUsingOutboundMessages) {
      const flowName = flow.fullName;

      const deactivateResult = await deactivateFlowFunction(client, flowName);
      processMetadataResult(deactivateResult);
      logger.info(`Deactivated flow ${flowName}`);
      deletedFlows.push(flowName);
      await deleteFlowFunction(client, flowName);
      logger.info(`Deleted flow ${flowName}`);
    }

    for (const om of outboundMessages) {
      const omFullName = om.FullName;

      await deleteWorkflowOutboundMessageFunction(client, omFullName);
      logger.info(`Deleted outbound message ${omFullName}`);
      deletedOutboundMessages.push(omFullName);
    }
  }

  return { deletedFlows, deletedOutboundMessages };
};
