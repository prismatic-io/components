export interface JSONSchema {
  type: string;
  title?: string;
  description?: string;
  required?: string[];
  properties?: Record<string, JSONSchemaProperty>;
  additionalProperties?: boolean;
  enum?: string[];
}

export interface JSONSchemaProperty {
  type: string;
  description?: string;
  enum?: string[];
  items?: JSONSchemaProperty;
  properties?: Record<string, JSONSchemaProperty>;
  required?: string[];
}

export interface PrismaticFlowMetadata {
  flowName: string;
  instanceId: string;
}

export interface CustomToolFunction {
  name: string;
  description: string;
  strict: boolean;
  parameters: JSONSchema;
  needsApproval?: boolean;
  __prismaticFlow?: PrismaticFlowMetadata;
}

export interface CustomToolConfig {
  type: "function";
  function: CustomToolFunction;
}

export interface FlowToolOutput {
  type: "flow";
  tool: CustomToolConfig;
  toolName: string;
  flowName: string;
}

export interface ApprovalToolOutput {
  type: "approval";
  tool: CustomToolConfig;
  toolName: string;
}

export interface HostedToolConfig {
  type: "hosted";
  name: "webSearch" | "codeInterpreter" | "fileSearch" | "imageGeneration";
  description?: string;
  configuration?: Record<string, unknown>;
}

export interface HostedToolOutput {
  tool: HostedToolConfig;
  toolName: string;
  toolType: "webSearch" | "codeInterpreter" | "fileSearch" | "imageGeneration";
}

export type ToolOutput = FlowToolOutput | ApprovalToolOutput | HostedToolOutput;
