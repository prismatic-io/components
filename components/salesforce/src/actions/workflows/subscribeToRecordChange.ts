import { action, util } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { subscribeToRecordChangeInputs } from "../../inputs";
import {
  createWorkflowOutboundMessageFunction,
  createWorkflowRuleFunction,
  getIntegrationUser,
  processFilterCriteria,
  processOutboundMessageActions,
  processOutboundMessageFields,
  toFullNameIdentifier,
} from "../../util";
import { subscribeRecordChangeExamplePayload } from "../../examplePayloads";

export const subscribeToRecordChange = action({
  display: {
    label: "Subscribe to Record Change",
    description:
      "Create a Workflow Rule to subscribe to record changes in Salesforce. Workflow Rules are deprecated by Salesforce; migrate to Flow-based actions.",
  },
  inputs: subscribeToRecordChangeInputs,
  perform: async (
    context,
    {
      version,
      recordType,
      name,
      operation: triggerType,
      filterCriteria,
      endpointUrl,
      integrationUserEmail,
      connection,
      description,
      fields,
      dynamicFields,
      formulaInput,
    },
  ) => {
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        recordType,
        name,
        triggerType,
        filterCriteria,
        formula: formulaInput,
        endpointUrl,
        integrationUserEmail,
        connection,
        description,
        fields,
        dynamicFields,
      });
    }

    const uniqueName = `${name}_${Math.random().toString(36).slice(2, 7)}`;

    const client = await createSalesforceClient(connection, version);

    const integrationUser = await getIntegrationUser(client, integrationUserEmail);

    const fullName = toFullNameIdentifier(recordType, uniqueName);

    const outboundResult = await createWorkflowOutboundMessageFunction(client, {
      apiVersion: util.types.toNumber(version) || util.types.toNumber(client.version),
      fullName,
      name,
      description,
      endpointUrl,
      integrationUser,
      fields: processOutboundMessageFields(fields, dynamicFields),
    });

    const ruleResult = await createWorkflowRuleFunction(client, {
      fullName,
      active: true,
      description,
      triggerType,
      criteriaItems: processFilterCriteria(filterCriteria),
      actions: processOutboundMessageActions([outboundResult.fullName]),
      formula: formulaInput,
    });

    return {
      data: {
        WorkflowRule: ruleResult,
        WorkflowOutboundMessage: outboundResult,
      },
    };
  },
  examplePayload: subscribeRecordChangeExamplePayload,
});
