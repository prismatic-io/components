import { metadataResultSchema } from "./metadataShared";
export const saveFlowOutputSchema = metadataResultSchema;
export const deleteMetadataComponentOutputSchema = metadataResultSchema;
export const subscribeToRecordChangesOutputSchema = {
  type: "object" as const,
  properties: {
    outboundMessageFullName: { type: "string" },
    flowFullName: { type: "string" },
  },
  required: ["outboundMessageFullName", "flowFullName"],
};
export const deleteInstancedFlowsAndOutboundMessagesOutputSchema = {
  type: "object" as const,
  properties: {
    deletedFlows: { type: "array", items: { type: "string" } },
    deletedOutboundMessages: { type: "array", items: { type: "string" } },
  },
  required: ["deletedFlows", "deletedOutboundMessages"],
};
