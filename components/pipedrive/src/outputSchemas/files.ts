const fileRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    user_id: { type: "integer" },
    deal_id: { type: "integer" },
    person_id: { type: "integer" },
    org_id: { type: "integer" },
    product_id: { type: "integer" },
    activity_id: { type: "integer" },
    lead_id: { type: "string" },
    log_id: { type: "integer" },
    add_time: { type: "string" },
    update_time: { type: "string" },
    file_name: { type: "string" },
    file_type: { type: "string" },
    file_size: { type: "integer" },
    active_flag: { type: "boolean" },
    inline_flag: { type: "boolean" },
    remote_location: { type: "string" },
    remote_id: { type: "string" },
    cid: { type: "string" },
    s3_bucket: { type: "string" },
    mail_message_id: { type: "string" },
    mail_template_id: { type: "string" },
    deal_name: { type: "string" },
    person_name: { type: "string" },
    org_name: { type: "string" },
    product_name: { type: "string" },
    lead_name: { type: "string" },
    url: { type: "string" },
    name: { type: "string" },
    description: { type: "string" },
  },
};

export const getFilesOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: fileRecordSchema },
        additional_data: {
          type: "object",
          properties: {
            pagination: {
              type: "object",
              properties: {
                start: { type: "integer" },
                limit: { type: "integer" },
                more_items_in_collection: { type: "boolean" },
                next_start: { type: "integer" },
              },
            },
          },
        },
      },
    },
  },
};

export const addFileOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: fileRecordSchema,
      },
    },
  },
};

export const getFileOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: fileRecordSchema,
      },
    },
  },
};

export const updateFileOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: fileRecordSchema,
      },
    },
  },
};

export const deleteFileOutputSchema = {
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

export const downloadFileOutputSchema = {
  type: "object",
  properties: {
    data: {},
    contentType: { type: "string" },
  },
};
