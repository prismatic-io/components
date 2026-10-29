const callLogRecordSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    has_recording: { type: "boolean" },
    company_id: { type: "integer" },
    user_id: { type: "integer" },
    activity_id: { type: "integer" },
    subject: { type: "string" },
    duration: { type: "string" },
    outcome: { type: "string" },
    from_phone_number: { type: "string" },
    to_phone_number: { type: "string" },
    start_time: { type: "string" },
    end_time: { type: "string" },
    person_id: { type: "integer" },
    org_id: { type: "integer" },
    deal_id: { type: "integer" },
    note: { type: "string" },
  },
};

export const addCallLogOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: callLogRecordSchema,
      },
    },
  },
};

export const getUserCallLogsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: callLogRecordSchema },
        additional_data: {
          type: "object",
          properties: {
            pagination: {
              type: "object",
              properties: {
                start: { type: "integer" },
                limit: { type: "integer" },
                more_items_in_collection: { type: "boolean" },
              },
            },
          },
        },
      },
    },
  },
};

export const deleteCallLogOutputSchema = {
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

export const getCallLogOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: callLogRecordSchema,
      },
    },
  },
};
