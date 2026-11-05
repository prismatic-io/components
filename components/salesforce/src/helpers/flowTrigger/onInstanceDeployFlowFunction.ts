import type { ActionContext } from "@prismatic-io/spectral";

import {
  generatePrefixedHash,
  getBase64FromUrl,
  deactivateAndDeleteFlowResources,
} from "../../util";

import type { FlowTriggerInstanceState, OnInstanceDeployFlowFunctionParams } from "../../types";
import { createFlowRecordSubscription } from "./createFlowRecordSubscription";
import { createSalesforceClient } from "../../client";

export const onInstanceDeployFlowFunction = async (
  context: ActionContext,
  {
    version,
    prefix,
    triggerObject,
    triggerOn,
    fields,
    flowMetadata,
    filterFormula,
    connection,
  }: OnInstanceDeployFlowFunctionParams,
) => {
  const integrationFlowName = context.flow.name;
  context.logger.info(`Deploying flow trigger for ${integrationFlowName}`);
  try {
    const encodedId = getBase64FromUrl(context.webhookUrls[integrationFlowName]);
    const flowState: FlowTriggerInstanceState =
      context?.crossFlowState?.flowTriggerState?.[encodedId];
    const endpointUrl = context.webhookUrls[integrationFlowName];
    const client = await createSalesforceClient(connection, version);

    if (flowState?.flowFullName && flowState?.outboundMessageFullName) {
      const flowFullName = flowState.flowFullName;
      const outboundMessageFullName = flowState.outboundMessageFullName;

      context.logger.info(
        `Recreating flow and outbound message: deleting existing resources before deployment`,
      );

      await deactivateAndDeleteFlowResources(
        client,
        context.logger,
        flowFullName,
        outboundMessageFullName,
        context.debug.enabled,
      );
    }

    const name = generatePrefixedHash(prefix, encodedId);
    context.logger.info(`Creating new flow and outbound message with name ${name}`);
    if (context.debug.enabled) {
      context.logger.info(
        `Creating outbound message with fullName: ${triggerObject}.${name} (org will silently prefix with its NamespacePrefix if namespaced)`,
      );
    }
    const subscriptionResult = await createFlowRecordSubscription(context, {
      version,
      name,
      endpointUrl,
      flowMetadata,
      triggerObject,
      triggerOn,
      filterFormula,
      fields,
      client,
    });

    context.logger.info(
      `Flow ${subscriptionResult.flowFullName} created successfully using outbound message ${subscriptionResult.outboundMessageFullName}`,
    );
    context.crossFlowState.flowTriggerState ??= {};

    context.crossFlowState.flowTriggerState[encodedId] = {
      flowFullName: subscriptionResult.flowFullName,
      outboundMessageFullName: subscriptionResult.outboundMessageFullName,
    } as FlowTriggerInstanceState;
    context.logger.info(
      `Flow outbound message trigger for ${integrationFlowName} deployed successfully`,
    );
  } catch (error) {
    context.logger.error(
      `Error deploying flow outbound message trigger for ${integrationFlowName}: ${error}`,
    );
    throw error;
  }
};
