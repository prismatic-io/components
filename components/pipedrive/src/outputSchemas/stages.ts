const stageRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    order_nr: { type: "integer" },
    name: { type: "string" },
    active_flag: { type: "boolean" },
    deal_probability: { type: "number" },
    pipeline_id: { type: "integer" },
    pipeline_name: { type: "string" },
    pipeline_deal_probability: { type: "boolean" },
    rotten_flag: { type: "boolean" },
    rotten_days: { type: "integer" },
    add_time: { type: "string" },
    update_time: { type: "string" },
  },
};

const stageDealRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    title: { type: "string" },
    value: { type: "number" },
    currency: { type: "string" },
    status: { type: "string" },
    stage_id: { type: "integer" },
    pipeline_id: { type: "integer" },
    add_time: { type: "string" },
    update_time: { type: "string" },
    person_id: { type: "integer" },
    org_id: { type: "integer" },
    user_id: { type: "integer" },
    owner_id: { type: "integer" },
    active: { type: "boolean" },
    deleted: { type: "boolean" },
    won_time: { type: "string" },
    lost_time: { type: "string" },
    close_time: { type: "string" },
    lost_reason: { type: "string" },
    visible_to: { type: "string" },
  },
};

export const getStagesOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: stageRecordSchema },
        additional_data: {
          type: "object",
          properties: {
            next_cursor: { type: "string" },
          },
        },
      },
    },
  },
};

export const addStageOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: stageRecordSchema,
      },
    },
  },
};

export const deleteStageOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            id: { type: "integer" },
          },
        },
      },
    },
  },
};

export const getStageOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: stageRecordSchema,
      },
    },
  },
};

export const updateStageOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: stageRecordSchema,
      },
    },
  },
};

export const getStageDealsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: stageDealRecordSchema },
        additional_data: {
          type: "object",
          properties: {
            next_cursor: { type: "string" },
          },
        },
      },
    },
  },
};
