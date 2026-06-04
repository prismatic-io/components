import { util } from "@prismatic-io/spectral";
import type { Connection, Schema } from "jsforce";
import type { FileProperties } from "jsforce/lib/api/metadata/schema";
import { createSalesforceClient } from "../client";
import type {
  CreateWorkflowOutboundMessage,
  CreateWorkflowRule,
  FilterItem,
  WorkflowAction,
} from "../types";
import { parseFullNameIdentifier, processMetadataResult, toFullNameIdentifier } from "./flows";

const addPropertiesToObject = (params) => {
  const object = {};
  for (const key in params) {
    if (params[key] || typeof params[key] === "boolean") {
      object[key] = params[key];
    }
  }
  return object;
};


export const processFilterCriteria = (criteriaValue: unknown): FilterItem[] => {
  if (typeof criteriaValue === "undefined" || criteriaValue === "") {
    return [];
  }

  const criteria = util.types.toString(criteriaValue);

  if (!util.types.isJSON(criteria)) {
    throw new Error("Filter Criteria must be specified as JSON.");
  }

  const data = JSON.parse(criteria);

  if (!Array.isArray(data)) {
    throw new Error("Filter Criteria must be a list of objects.");
  }

  return data as FilterItem[];
};


export const processOutboundMessageActions = (outboundMessages: unknown[]): WorkflowAction[] => {
  if (!outboundMessages) {
    return undefined;
  }

  if (Array.isArray(outboundMessages) && outboundMessages.length === 0) {
    return [];
  }

  return outboundMessages.map((v) => {
    const { name } = parseFullNameIdentifier(util.types.toString(v));
    return {
      type: "OutboundMessage",
      name,
    };
  });
};


export const processOutboundMessageFields = (
  fieldsValue: unknown,
  dynamicFieldsValue: unknown,
): string[] => {
  const fields = Array.isArray(fieldsValue) ? fieldsValue : [];
  const dynamicFields = Array.isArray(dynamicFieldsValue) ? dynamicFieldsValue : [];

  const combined = [...fields, ...dynamicFields];
  const strFields = combined.map((v) => util.types.toString(v));
  return [...new Set(strFields)];
};

export const listWorkflowOutboundMessagesFunction = async (client: Connection<Schema>) => {
  return await client.metadata.list({
    type: "WorkflowOutboundMessage",
  });
};

export const listWorkflowRulesFunction = async (client: Connection<Schema>) => {
  return await client.metadata.list({ type: "WorkflowRule" });
};

export const findWorkflowOutboundMessage = (
  workflowOutboundMessageArray: FileProperties[],
  fullName: string,
) => {
  return workflowOutboundMessageArray.find(
    (workflowOutboundMessage) => workflowOutboundMessage.fullName === fullName,
  );
};

export const findWorkflowRule = (workflowRules: FileProperties[], fullName: string) => {
  return workflowRules.find((workflowRule) => workflowRule.fullName === fullName);
};

export const createWorkflowOutboundMessageFunction = async (
  client: Connection<Schema>,
  params: CreateWorkflowOutboundMessage,
) => {
  const workflowOutboundMessage = addPropertiesToObject({
    apiVersion: params.apiVersion,
    fullName: params.fullName,
    name: params.name,
    description: params.description,
    endpointUrl: params.endpointUrl,
    integrationUser: params.integrationUser,
    fields: params.fields,
    protected: false,
    includeSessionId: false,
  });
  return processMetadataResult(
    await client.metadata.create("WorkflowOutboundMessage", workflowOutboundMessage),
  );
};

export const createWorkflowRuleFunction = async (
  client: Connection<Schema>,
  params: CreateWorkflowRule,
) => {
  const workflowRule = addPropertiesToObject({
    fullName: params.fullName,
    active: params.active,
    description: params.description,
    triggerType: params.triggerType,
    criteriaItems: params.criteriaItems,
    actions: params.actions,
    formula: params.formula,
  });
  return processMetadataResult(await client.metadata.create("WorkflowRule", workflowRule));
};

export const deleteWorkflowOutboundMessageFunction = async (
  client: Connection<Schema>,
  fullName: string,
) => {
  return processMetadataResult(await client.metadata.delete("WorkflowOutboundMessage", fullName));
};

export const deleteWorkflowRuleFunction = async (client: Connection<Schema>, fullName: string) => {
  return processMetadataResult(await client.metadata.delete("WorkflowRule", fullName));
};

export const getIntegrationUser = async (
  client: Connection<Schema>,
  integrationUserInput: string | undefined,
): Promise<string> => {
  
  if (!integrationUserInput) {
    const { username } = await client.identity();
    return username;
  }
  return integrationUserInput;
};

export const onInstanceDeployFunction = async (
  context,
  {
    recordType,
    outboundMessageName,
    workflowRuleName,
    triggerType,
    connection,
    description,
    version,
    fields,
  },
) => {
  const endpoint = context.webhookUrls[context.flow.name];
  const client = await createSalesforceClient(connection, version);

  const [{ username }, workflowOutboundMessages] = await Promise.all([
    client.identity(),
    listWorkflowOutboundMessagesFunction(client),
  ]);

  const outboundMessageFullName = toFullNameIdentifier(recordType, outboundMessageName);

  const existingWorkflowOutboundMessage = findWorkflowOutboundMessage(
    workflowOutboundMessages,
    outboundMessageFullName,
  );

  const outboundResult =
    existingWorkflowOutboundMessage ||
    (await createWorkflowOutboundMessageFunction(client, {
      apiVersion: util.types.toNumber(version) || util.types.toNumber(client.version),
      fullName: outboundMessageFullName,
      name: outboundMessageName,
      description: description,
      endpointUrl: endpoint,
      integrationUser: username,
      fields: processOutboundMessageFields(fields, []),
    }));

  const workflowRules = await listWorkflowRulesFunction(client);

  const workflowRuleFullName = toFullNameIdentifier(recordType, workflowRuleName);

  const existingWorkflowRule = findWorkflowRule(workflowRules, workflowRuleFullName);

  const ruleResult =
    existingWorkflowRule ||
    (await createWorkflowRuleFunction(client, {
      fullName: workflowRuleFullName,
      active: true,
      description,
      triggerType,
      criteriaItems: processFilterCriteria(
        JSON.stringify([
          {
            field: `${recordType}.CreatedDate`,
            operation: "notEqual",
            value: "",
          },
        ]),
      ),
      actions: processOutboundMessageActions([outboundMessageFullName]),
    }));

  context.logger.info("ruleResult", ruleResult);
  context.logger.info("outboundResult", outboundResult);
};

export const onInstanceDeleteFunction = async (
  _context,
  { recordType, outboundMessageName, workflowRuleName, connection, version },
) => {
  const client = await createSalesforceClient(connection, version);
  const [worflowOutboundMessages, workflowRules] = await Promise.all([
    listWorkflowOutboundMessagesFunction(client),
    listWorkflowRulesFunction(client),
  ]);

  const outboundMessageFullName = toFullNameIdentifier(recordType, outboundMessageName);

  const workflowRuleFullName = toFullNameIdentifier(recordType, workflowRuleName);

  const existingWorkflowOutboundMessage = findWorkflowOutboundMessage(
    worflowOutboundMessages,
    outboundMessageFullName,
  );

  if (existingWorkflowOutboundMessage) {
    const namespacePrefix = existingWorkflowOutboundMessage.namespacePrefix || "";
    const toDeleteOutboundMessageFullName = toFullNameIdentifier(
      recordType,
      namespacePrefix ? `${namespacePrefix}__${outboundMessageName}` : outboundMessageName,
    );
    await deleteWorkflowOutboundMessageFunction(client, toDeleteOutboundMessageFullName);
  }

  const existingWorkflowRule = findWorkflowRule(workflowRules, workflowRuleFullName);

  if (existingWorkflowRule) {
    const namespacePrefix = existingWorkflowRule.namespacePrefix || "";
    const toDeleteWorkflowRuleFullName = toFullNameIdentifier(
      recordType,
      namespacePrefix ? `${namespacePrefix}__${workflowRuleName}` : workflowRuleName,
    );
    await deleteWorkflowRuleFunction(client, toDeleteWorkflowRuleFullName);
  }
};
