const pipelineRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    url_title: { type: "string" },
    order_nr: { type: "integer" },
    active: { type: "boolean" },
    deal_probability: { type: "boolean" },
    add_time: { type: "string" },
    update_time: { type: "string" },
    selected: { type: "boolean" },
  },
};

const pipelineDealRecordSchema = {
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
    expected_close_date: { type: "string" },
    probability: { type: "number" },
    active: { type: "boolean" },
    deleted: { type: "boolean" },
    won_time: { type: "string" },
    lost_time: { type: "string" },
    close_time: { type: "string" },
    lost_reason: { type: "string" },
    visible_to: { type: "string" },
  },
};

const dealMovementStatsSchema = {
  type: "object",
  properties: {
    count: { type: "integer" },
    deals_ids: { type: "array", items: { type: "integer" } },
    values: { type: "object" },
    formatted_values: { type: "object" },
  },
};

export const getPipelinesOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: pipelineRecordSchema },
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

export const addPipelineOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: pipelineRecordSchema,
      },
    },
  },
};

export const deletePipelineOutputSchema = {
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

export const getPipelineOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: pipelineRecordSchema,
      },
    },
  },
};

export const updatePipelineOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: pipelineRecordSchema,
      },
    },
  },
};

export const getPipelineConversionStatisticsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            stage_conversions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  from_stage_id: { type: "integer" },
                  to_stage_id: { type: "integer" },
                  conversion_rate: { type: "number" },
                },
              },
            },
            won_conversion: { type: "number" },
            lost_conversion: { type: "number" },
          },
        },
      },
    },
  },
};

export const getPipelineDealsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: pipelineDealRecordSchema },
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

export const getPipelineMovementStatisticsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            movements_between_stages: {
              type: "object",
              properties: {
                count: { type: "integer" },
              },
            },
            new_deals: dealMovementStatsSchema,
            deals_left_open: dealMovementStatsSchema,
            won_deals: dealMovementStatsSchema,
            lost_deals: dealMovementStatsSchema,
            average_age_in_days: {
              type: "object",
              properties: {
                across_all_stages: { type: "number" },
              },
            },
          },
        },
      },
    },
  },
};
