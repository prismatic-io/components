import { listFlows } from "./listFlows";
import { getFlow } from "./getFlow";
import { createFlow } from "./createFlow";
import { updateFlow } from "./updateFlow";
import { deleteFlow } from "./deleteFlow";
import { activateFlow } from "./activateFlow";
import { deactivateFlow } from "./deactivateFlow";
import { subscribeToRecordChanges } from "./subscribeToRecordChanges";
import { deleteInstancedFlowsAndOutboundMessages } from "./deleteInstancedFlowsAndOutboundMessages";

export default {
  listFlows,
  getFlow,
  createFlow,
  updateFlow,
  deleteFlow,
  activateFlow,
  deactivateFlow,
  subscribeToRecordChanges,
  deleteInstancedFlowsAndOutboundMessages,
};
