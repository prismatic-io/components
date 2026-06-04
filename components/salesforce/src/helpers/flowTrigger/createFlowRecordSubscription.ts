import { type ActionContext, util } from "@prismatic-io/spectral";

import type { FlowMetadata, CreateFlowRecordSubscriptionParams } from "../../types";
import {
  createFlowFunction,
  createWorkflowOutboundMessageFunction,
  generateApiName,
  processMetadataResult,
  processOutboundMessageFields,
  removeObjectPrefix,
  toFullNameIdentifier,
} from "../../util";

export const createFlowRecordSubscription = async (
  _context: ActionContext,
  {
    version,
    name,
    endpointUrl,
    flowMetadata,
    triggerObject,
    triggerOn,
    filterFormula,
    fields,
    dynamicFields,
    client,
  }: CreateFlowRecordSubscriptionParams,
) => {
  const label = name;
  const fullName = generateApiName(name);

  const outboundMessageDescription = `Flow: ${name}.`;
  const flowDescription = `Outbound message: ${name}.`;

  let metadata: FlowMetadata = {
    fullName: fullName,
    label,
    processType: "AutoLaunchedFlow", 
    description: flowDescription,
    runInMode: "DefaultMode",
    status: "Active",
    processMetadataValues: [{ name: "CanvasMode", value: { stringValue: "AUTO_LAYOUT_CANVAS" } }],
    ...(flowMetadata ? flowMetadata : {}),
  };
  const { username: integrationUser } = await client.identity();

  const createOutboundMessageResult = await createWorkflowOutboundMessageFunction(client, {
    apiVersion: util.types.toNumber(version) || util.types.toNumber(client.version),
    fullName: toFullNameIdentifier(triggerObject, name),
    name,
    description: outboundMessageDescription,
    endpointUrl,
    integrationUser,
    fields: processOutboundMessageFields(fields, dynamicFields),
  });

  const outboundMessageFullName = createOutboundMessageResult.fullName;

  const outboundMessageName = removeObjectPrefix(outboundMessageFullName);

  
  const cleanOutboundMessageName = outboundMessageName.replace(/^Send_/i, "");

  
  const actionCallName = `Send_${cleanOutboundMessageName}`;

  
  const fullOutboundMessageName = cleanOutboundMessageName.includes(".")
    ? cleanOutboundMessageName
    : `${triggerObject}.${cleanOutboundMessageName}`;

  const flowDefinition = {
    actionCalls: {
      name: actionCallName,
      label: `Send ${cleanOutboundMessageName.replace(/_/g, " ")}`,
      locationX: 176,
      locationY: 158,
      actionName: fullOutboundMessageName,
      actionType: "outboundMessage",
    },
    environments: "Default",
    formulas: {
      name: "TriggerCondition",
      dataType: "Boolean",
      expression: true,
    },
    start: {
      locationX: 50,
      locationY: 0,
      connector: {
        targetReference: actionCallName,
      },
      object: triggerObject,
      recordTriggerType: triggerOn,
      ...(filterFormula ? { filterFormula } : {}),
      triggerType: "RecordAfterSave",
    },
    variables: {
      name: "TriggeringRecord",
      dataType: "SObject",
      isCollection: false,
      isInput: true,
      isOutput: false,
      objectType: triggerObject,
    },
  };

  metadata = {
    ...metadata,
    ...flowDefinition,
  };

  const createFlowResult = await createFlowFunction(client, metadata);

  processMetadataResult(createFlowResult);

  const flowFullName = createFlowResult.fullName;

  return {
    outboundMessageFullName,
    flowFullName,
  };
};
