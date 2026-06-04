import type { Flow, FileProperties } from "jsforce/lib/api/metadata";
import type { WorkflowOutboundMessage } from "../../types";

export function findFlowsUsingOutboundMessages(
  flows: Partial<FileProperties> & Partial<Flow>[],
  outboundMessages: WorkflowOutboundMessage[],
) {
  if (!flows?.length || !outboundMessages?.length) return [];

  const outboundNames = new Set(outboundMessages.map((om) => om.FullName));

  return flows.filter((flow) =>
    flow.actionCalls?.some(
      (call) =>
        call.actionType?.toLowerCase() === "outboundmessage" &&
        call.actionName &&
        outboundNames.has(call.actionName),
    ),
  );
}
