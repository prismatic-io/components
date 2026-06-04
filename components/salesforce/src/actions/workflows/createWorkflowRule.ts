import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { createWorkflowRuleInputs } from "../../inputs";
import {
  createWorkflowRuleFunction,
  processFilterCriteria,
  processMetadataResult,
  processOutboundMessageActions,
  toFullNameIdentifier,
} from "../../util";
import { genericCreateUpdateFullNameExamplePayload } from "../../examplePayloads";

export const createWorkflowRule = action({
  display: {
    label: "Create Workflow Rule",
    description:
      "Create a Workflow Rule. Workflow Rules are deprecated by Salesforce; migrate to Flow-based actions.",
  },
  inputs: createWorkflowRuleInputs,
  perform: async (
    context,
    {
      version,
      recordType,
      ruleName,
      active,
      description,
      triggerType,
      filterCriteria,
      outboundMessageActions,
      formulaInput,
      connection,
    },
  ) => {
    const client = await createSalesforceClient(connection, version);

    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        recordType,
        ruleName,
        active,
        description,
        triggerType,
        filterCriteria,
        outboundMessageActions,
        formula: formulaInput,
      });
    }

    const result = await createWorkflowRuleFunction(client, {
      fullName: toFullNameIdentifier(recordType, ruleName),
      active,
      description,
      triggerType,
      criteriaItems: processFilterCriteria(filterCriteria),
      actions: processOutboundMessageActions(outboundMessageActions),
      formula: formulaInput,
    });
    return { data: processMetadataResult(result) };
  },
  examplePayload: genericCreateUpdateFullNameExamplePayload,
});
