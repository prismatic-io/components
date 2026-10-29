import { input, util } from "@prismatic-io/spectral";

export const openaiConnectionInput = input({
  label: "OpenAI Connection",
  required: true,
  type: "connection",
  comments: "Connection to OpenAI API with your API key",
});

export const agentConfigInput = input({
  label: "Agent Configuration",
  type: "code",
  language: "json",
  required: true,
  comments: "Agent configuration object from Create Agent action",
  example: JSON.stringify(
    {
      agent: {
        name: "Assistant",
        instructions: "You are a helpful assistant",
        model: "gpt-4",
      },
    },
    null,
    2,
  ),
});

export const userInputInput = input({
  label: "User Input",
  type: "text",
  required: true,
  comments: "The message or question to send to the agent",
  example: "What is the weather like today?",
  placeholder: "Enter message or question",
});

export const fileIdsInput = input({
  label: "File IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "File IDs from previously uploaded files to OpenAI. Use the Upload File action to get these IDs.",
  example: "file-abc123",
});

export const handoffsInput = input({
  label: "Handoff Agents",
  type: "code",
  language: "json",
  collection: "valuelist",
  required: false,
  comments:
    "List of agent configurations that can be handed off to. Each should be the output from a Create Agent action.",
  example: JSON.stringify(
    [
      {
        agent: {
          name: "Technical Support",
          instructions: "Handle technical issues and troubleshooting",
          model: "gpt-4",
        },
      },
    ],
    null,
    2,
  ),
});

export const maxTurnsInput = input({
  label: "Max Turns",
  type: "string",
  required: false,
  default: "10",
  clean: util.types.toNumber,
  comments:
    "Maximum number of conversation turns the agent can take. Prevents infinite loops.",
  example: "20",
});

export const historyInput = input({
  label: "History",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Previous conversation history. Use this to continue a conversation from a previous run. Should be the history array from a previous agent run result.",
  example: JSON.stringify(
    [
      {
        role: "user",
        content: "Hello",
      },
      {
        role: "assistant",
        content: "Hi! How can I help you today?",
      },
    ],
    null,
    2,
  ),
});

export const previousResponseIdInput = input({
  label: "Previous Response ID",
  type: "text",
  required: false,
  comments:
    "ID of the previous response to continue the conversation. Alternative to passing full history array.",
  example: "resp_abc123",
});

export const agentNameInput = input({
  label: "Name",
  type: "text",
  required: true,
  comments: "The name of the agent",
  example: "Customer Support Agent",
  placeholder: "Enter agent name",
});

export const agentInstructionsInput = input({
  label: "Instructions",
  type: "text",
  required: true,
  comments:
    "System instructions that define the agent's behavior and capabilities",
  example:
    "You are a helpful customer support agent. Answer questions politely and accurately.",
  placeholder: "Enter system instructions for the agent",
});

export const agentHandoffDescriptionInput = input({
  label: "Handoff Description",
  type: "text",
  required: false,
  comments:
    "Description for handoff routing. Used by other agents to understand when to hand off to this agent.",
  example: "Handles technical support questions",
  placeholder: "Describe when to route to this agent",
});

export const agentToolsInput = input({
  label: "Tools",
  type: "code",
  language: "json",
  collection: "valuelist",
  required: false,
  comments:
    "List of tools available to the agent. Each tool should be the output from a Create Tool action.",
  example: JSON.stringify(
    [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Get current weather for a location",
          parameters: {
            type: "object",
            properties: {
              location: { type: "string" },
            },
          },
        },
      },
    ],
    null,
    2,
  ),
});

export const agentMcpServersInput = input({
  label: "MCP Servers",
  type: "code",
  language: "json",
  collection: "valuelist",
  required: false,
  comments:
    "List of MCP server configurations. Each should be the output from an Add MCP Server action.",
  example: JSON.stringify(
    [
      {
        serverLabel: "database-server",
        serverType: "local",
        command: "npx",
        args: ["@modelcontextprotocol/server-sqlite", "db.sqlite"],
      },
    ],
    null,
    2,
  ),
});

export const outputSchemaInput = input({
  label: "Output Schema",
  type: "code",
  language: "json",
  required: false,
  comments:
    "JSON Schema for structured output. Forces the agent to respond with data matching this schema.",
  example: JSON.stringify(
    {
      type: "object",
      properties: {
        answer: { type: "string" },
        confidence: { type: "number" },
      },
      required: ["answer"],
    },
    null,
    2,
  ),
});

export const outputSchemaNameInput = input({
  label: "Output Schema Name",
  type: "text",
  required: false,
  default: "output",
  comments: "Name for the output schema",
  example: "response",
  placeholder: "Enter schema name",
});

export const outputSchemaStrictInput = input({
  label: "Output Schema Strict",
  type: "boolean",
  required: false,
  default: "false",
  comments: "If true, enforces strict schema validation",
  example: "true",
});

export const stateInput = input({
  label: "Run State",
  type: "code",
  language: "json",
  required: true,
  comments:
    "State from the interrupted run, containing the execution context and interruptions.",
  example: '{"agentId":"agent-123","messages":[...],"interruptions":[...]}',
});

export const approvalResponsesInput = input({
  label: "Approval Responses",
  type: "code",
  language: "json",
  required: true,
  comments:
    "Array of approval responses with updated approvalRequest objects containing functionId and approved status.",
  example: JSON.stringify(
    [
      {
        functionId: "fc_12345",
        approved: true,
        feedback: null,
      },
    ],
    null,
    2,
  ),
});

export const toolNameInput = (defaultName: string) =>
  input({
    label: "Tool Name",
    type: "text",
    required: false,
    default: defaultName,
    comments: `Custom name for the ${defaultName.toLowerCase()} tool`,
    example: "SearchDatabase",
    placeholder: "Enter custom tool name",
  });

export const toolDescriptionInput = (defaultDescription: string) =>
  input({
    label: "Tool Description",
    type: "text",
    required: false,
    default: defaultDescription,
    comments:
      "Description that helps the agent understand when to use this tool",
    example: "Search the customer database for user information by email or ID",
    placeholder: "Describe what this tool does and when to use it",
  });

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  example: "OpenAI Connection",
});

export const modelInput = input({
  label: "Model",
  type: "string",
  required: true,
  example: "gpt-5-mini-2025-08-07",
  model: [
    {
      value: "gpt-5-2025-08-07",
      label: "GPT-5 (Latest reasoning, highest capability)",
    },
    {
      value: "gpt-5-mini-2025-08-07",
      label: "GPT-5 Mini (Reasoning, balanced cost/performance)",
    },
    {
      value: "gpt-5-nano-2025-08-07",
      label: "GPT-5 Nano (Reasoning, cost-optimized)",
    },
    {
      value: "gpt-4.1-2025-04-14",
      label: "GPT-4.1 (Smartest non-reasoning)",
    },
  ],
  clean: util.types.toString,
  dataSource: "listModels",
  comments:
    "Select an OpenAI model to use for the request. The list of available models will be fetched from your OpenAI account.",
});

export const timeout = input({
  label: "Timeout (ms)",
  type: "string",
  required: false,
  comments: "The maximum amount of time (in MS) to wait for a response.",
  example: "10000",
  default: "10000",
  clean: (value: unknown) => util.types.toInt(value, 10000),
});

export const messagesInput = input({
  label: "Messages",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Who won the world series in 2020?" },
      {
        role: "assistant",
        content: "The Los Angeles Dodgers won the World Series in 2020.",
      },
      { role: "user", content: "Where was it played?" },
    ],
    null,
    2,
  ),
  clean: util.types.toObject,
});

export const temperatureInput = input({
  label: "Temperature",
  type: "string",
  comments:
    "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.",
  required: false,
  default: "1",
  example: "0.7",
  clean: util.types.toNumber,
});

export const topPInput = input({
  label: "top_p",
  type: "string",
  comments:
    "An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered.",
  required: false,
  default: "1",
  example: "0.9",
  clean: util.types.toNumber,
});

export const promptInput = input({
  label: "Prompt",
  type: "string",
  comments:
    "A text description of the desired image(s). The maximum length is 1000 characters.",
  required: true,
  clean: util.types.toString,
  example: "A cute baby sea otter",
  placeholder: "Describe the image you want to generate",
});

export const imageSizeInput = input({
  label: "Image Size",
  type: "string",
  comments:
    "The size of the generated images. Must be one of 256x256, 512x512, or 1024x1024.",
  default: "1024x1024",
  model: [
    { label: "256x256", value: "256x256" },
    { label: "512x512", value: "512x512" },
    { label: "1024x1024", value: "1024x1024" },
  ],
  clean: util.types.toString,
});
