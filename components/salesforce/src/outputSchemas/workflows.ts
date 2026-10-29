import { metadataResultSchema } from "./metadataShared";

export const createWorkflowComponentOutputSchema = metadataResultSchema;

export const subscribeToRecordChangeOutputSchema = {
  type: "object" as const,
  properties: {
    WorkflowRule: metadataResultSchema,
    WorkflowOutboundMessage: metadataResultSchema,
  },
  required: ["WorkflowRule", "WorkflowOutboundMessage"],
};
