import { action } from "@prismatic-io/spectral";
import { createDataBricksClient } from "../client";
import {
  createExecutionContextExamplePayload,
  getCommandStatusExamplePayload,
  runCommandExamplePayload,
} from "../examplePayloads";
import {
  clusterIdInput,
  commandIdInput,
  commandInput,
  connectionInput,
  contextIdInput,
  languageIdInput,
} from "../inputs";

const createExecutionContext = action({
  display: {
    label: "Create Execution Context",
    description: "Create a Databricks execution context",
  },
  inputs: {
    connection: connectionInput,
    clusterId: clusterIdInput,
    language: languageIdInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "1.2",
      context.debug.enabled,
    );
    const response = await client.post("contexts/create", {
      clusterId: params.clusterId,
      language: params.language,
    });
    return { data: response.data };
  },
  examplePayload: createExecutionContextExamplePayload,
});

const getCommandStatus = action({
  display: {
    label: "Get Command Status",
    description:
      "Gets the status of and, if available, the results from a currently executing command.",
  },
  inputs: {
    connection: connectionInput,
    clusterId: clusterIdInput,
    contextId: contextIdInput,
    commandId: commandIdInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "1.2",
      context.debug.enabled,
    );
    const response = await client.get("commands/status", {
      params: {
        clusterId: params.clusterId,
        contextId: params.contextId,
        commandId: params.commandId,
      },
    });
    return { data: response.data };
  },
  examplePayload: getCommandStatusExamplePayload,
});

const runCommand = action({
  display: {
    label: "Run Command",
    description: "Run a command in a Databricks execution context",
  },
  inputs: {
    connection: connectionInput,
    clusterId: clusterIdInput,
    contextId: contextIdInput,
    language: languageIdInput,
    command: commandInput,
  },
  perform: async (context, params) => {
    const client = createDataBricksClient(
      params.connection,
      "1.2",
      context.debug.enabled,
    );
    const response = await client.post("commands/execute", {
      clusterId: params.clusterId,
      contextId: params.contextId,
      language: params.language,
      command: params.command,
    });
    return { data: response.data };
  },
  examplePayload: runCommandExamplePayload,
});

export default { createExecutionContext, getCommandStatus, runCommand };
