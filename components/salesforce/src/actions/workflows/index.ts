import { listWorkflowRules } from "./listWorkflowRules";
import { createWorkflowRule } from "./createWorkflowRule";
import { deleteWorkflowRule } from "./deleteWorkflowRule";
import { listWorkflowOutboundMessages } from "./listWorkflowOutboundMessages";
import { createWorkflowOutboundMessage } from "./createWorkflowOutboundMessage";
import { deleteWorkflowOutboundMessage } from "./deleteWorkflowOutboundMessage";
import { subscribeToRecordChange } from "./subscribeToRecordChange";

export default {
  listWorkflowRules,
  createWorkflowRule,
  deleteWorkflowRule,
  listWorkflowOutboundMessages,
  createWorkflowOutboundMessage,
  deleteWorkflowOutboundMessage,
  subscribeToRecordChange,
};
