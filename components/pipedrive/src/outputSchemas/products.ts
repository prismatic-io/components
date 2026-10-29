const productRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    code: { type: "string" },
    unit: { type: "string" },
    tax: { type: "number" },
    active_flag: { type: "boolean" },
    selectable: { type: "boolean" },
    visible_to: { type: "string" },
    owner_id: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        email: { type: "string" },
        has_pic: { type: "integer" },
        pic_hash: { type: "string" },
        active_flag: { type: "boolean" },
        value: { type: "integer" },
      },
    },
    first_char: { type: "string" },
    prices: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          product_id: { type: "integer" },
          price: { type: "number" },
          currency: { type: "string" },
          cost: { type: "number" },
          overhead_cost: { type: "number" },
        },
      },
    },
    add_time: { type: "string" },
    update_time: { type: "string" },
    files_count: { type: "integer" },
    followers_count: { type: "integer" },
  },
};

const productDealRecordSchema = {
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
    active: { type: "boolean" },
    deleted: { type: "boolean" },
  },
};

const productFileRecordSchema = {
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
    s3_bucket: { type: "string" },
    description: { type: "string" },
    name: { type: "string" },
    url: { type: "string" },
  },
};

export const getProductsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: productRecordSchema },
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

export const addProductOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: productRecordSchema,
      },
    },
  },
};

export const deleteProductOutputSchema = {
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

export const getProductOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: productRecordSchema,
      },
    },
  },
};

export const updateProductOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: productRecordSchema,
      },
    },
  },
};

export const getProductDealsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: productDealRecordSchema },
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

export const getProductFilesOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: productFileRecordSchema },
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

export const getProductFollowersOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              user_id: { type: "integer" },
              id: { type: "integer" },
              person_id: { type: "integer" },
              add_time: { type: "string" },
            },
          },
        },
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

export const addProductFollowerOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            user_id: { type: "integer" },
            id: { type: "integer" },
            product_id: { type: "integer" },
            add_time: { type: "string" },
          },
        },
      },
    },
  },
};

export const deleteProductFollowerOutputSchema = {
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

export const getProductUsersOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              name: { type: "string" },
              email: { type: "string" },
              has_pic: { type: "integer" },
              pic_hash: { type: "string" },
              active_flag: { type: "boolean" },
            },
          },
        },
      },
    },
  },
};
