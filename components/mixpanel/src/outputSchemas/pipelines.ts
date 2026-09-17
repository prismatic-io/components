export const createGCSPipelineOutputSchema = {
  type: "object" as const,
  properties: {
    pipeline_names: { type: "array", items: { type: "string" } },
    bigquery_dataset_name: { type: "string" },
  },
  required: ["pipeline_names"],
};
const pipelineJobSchema = {
  type: "object" as const,
  properties: {
    project_id: { type: "number" },
    name: { type: "string" },
    state: { type: "string" },
    last_finish: { type: "string" },
    run_at: { type: "string" },
    from_date: { type: "string" },
    to_date: { type: "string" },
  },
  required: [
    "project_id",
    "name",
    "state",
    "last_finish",
    "run_at",
    "from_date",
    "to_date",
  ],
};
export const getPipelineOutputSchema = {
  type: "object" as const,
  properties: {
    canceled: { type: "array", items: pipelineJobSchema },
    retried: { type: "array", items: pipelineJobSchema },
    succeeded: { type: "array", items: pipelineJobSchema },
  },
  required: ["canceled", "retried", "succeeded"],
};
export const listPipelinesOutputSchema = {
  type: "object" as const,
  additionalProperties: {
    type: "array",
    items: {
      type: "object" as const,
      properties: {
        name: { type: "string" },
        Dispatcher: { type: "string" },
        last_dispatched: { type: "string" },
        frequency: { type: "string" },
        sync_enabled: { type: "string" },
      },
      required: [
        "name",
        "Dispatcher",
        "last_dispatched",
        "frequency",
        "sync_enabled",
      ],
    },
  },
};
