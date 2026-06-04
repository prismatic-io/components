import chatActions from "./chat";
import imageActions from "./images";
import modelActions from "./models";
import rawRequestAction from "./rawRequest";
import responseActions from "./response";
import fileActions from "./files";
import { createAgent, runAgent, resumeRun } from "./agents";
import { classifyAndBranch } from "./branching";
import {
  createFlowTool,
  createHumanApprovalTool,
  createWebSearchTool,
  createCodeInterpreterTool,
  createFileSearchTool,
  createImageGenerationTool,
} from "./tools";
import { addLocalMcpServer, addRemoteMcpServer } from "./mcp-servers";

export default {
  ...chatActions,
  ...imageActions,
  ...modelActions,
  ...rawRequestAction,
  ...responseActions,
  ...fileActions,
  createAgent,
  runAgent,
  resumeRun,
  classifyAndBranch,
  createFlowTool,
  createHumanApprovalTool,
  createWebSearchTool,
  createCodeInterpreterTool,
  createFileSearchTool,
  createImageGenerationTool,
  addLocalMcpServer,
  addRemoteMcpServer,
};
