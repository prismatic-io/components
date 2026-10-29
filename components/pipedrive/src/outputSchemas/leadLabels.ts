const leadLabelRecordSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    color: { type: "string" },
    add_time: { type: "string" },
    update_time: { type: "string" },
  },
};

export const getLeadLabelsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: leadLabelRecordSchema },
      },
    },
  },
};

export const addLeadLabelOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: leadLabelRecordSchema,
      },
    },
  },
};

export const updateLeadLabelOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: leadLabelRecordSchema,
      },
    },
  },
};

export const deleteLeadLabelOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
        },
      },
    },
  },
};
