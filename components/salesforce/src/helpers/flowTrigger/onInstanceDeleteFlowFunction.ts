import type { ActionContext } from "@prismatic-io/spectral";

import { getBase64FromUrl, deactivateAndDeleteFlowResources } from "../../util";

import type { FlowTriggerInstanceState, OnInstanceDeleteFlowFunctionParams } from "../../types";
import { createSalesforceClient } from "../../client";

export const onInstanceDeleteFlowFunction = async (
  context: ActionContext,
  { version, connection }: OnInstanceDeleteFlowFunctionParams,
) => {
  const integrationFlowName = context.flow.name;
  context.logger.info(`Deleting flow trigger for ${integrationFlowName}`);
  try {
    const encodedId = getBase64FromUrl(context.webhookUrls[integrationFlowName]);
    const flowState: FlowTriggerInstanceState =
      context?.crossFlowState?.flowTriggerState?.[encodedId];

    if (flowState?.flowFullName && flowState?.outboundMessageFullName) {
      const client = await createSalesforceClient(connection, version);
      const flowFullName = flowState.flowFullName;
      const outboundMessageFullName = flowState.outboundMessageFullName;

      await deactivateAndDeleteFlowResources(
        client,
        context.logger,
        flowFullName,
        outboundMessageFullName,
        context.debug.enabled,
      );
    }

    delete context?.crossFlowState?.flowTriggerState?.[encodedId];
    context.logger.info(`Flow trigger for ${integrationFlowName} deleted successfully`);
  } catch (error) {
    context.logger.error(`Error deleting flow trigger for ${integrationFlowName}: ${error}`);
    throw error;
  }
};
