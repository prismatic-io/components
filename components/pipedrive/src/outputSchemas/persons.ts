export const getPersonsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: { type: "object" },
    },
    additional_data: {
      type: "object",
      properties: {
        next_cursor: { type: "string" },
      },
    },
  },
};
export const singlePersonV2OutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
        owner_id: { type: "integer" },
        org_id: { type: "integer" },
        name: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: ["string", "null"] },
        add_time: { type: "string" },
        update_time: { type: "string" },
        visible_to: { type: "integer" },
        picture_id: { type: ["integer", "null"] },
        label_ids: { type: "array", items: { type: "integer" } },
        phone: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: { type: "string" },
              primary: { type: "boolean" },
              label: { type: "string" },
            },
          },
        },
        email: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: { type: "string" },
              primary: { type: "boolean" },
              label: { type: "string" },
            },
          },
        },
        active_flag: { type: "boolean" },
        cc_email: { type: "string" },
      },
    },
  },
};
export const deletePersonOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};
export const searchPersonsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              result_score: { type: "number" },
              item: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  type: { type: "string" },
                  name: { type: "string" },
                  phones: { type: "array", items: { type: "string" } },
                  emails: { type: "array", items: { type: "string" } },
                  visible_to: { type: "integer" },
                  owner: {
                    type: "object",
                    properties: { id: { type: "integer" } },
                  },
                  organization: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      name: { type: "string" },
                    },
                  },
                  custom_fields: { type: "array" },
                  notes: { type: "array" },
                },
              },
            },
          },
        },
      },
    },
    additional_data: {
      type: "object",
      properties: {
        pagination: {
          type: "object",
          properties: {
            start: { type: "integer" },
            limit: { type: "integer" },
            more_items_in_collection: { type: "boolean" },
            next_start: { type: ["integer", "null"] },
          },
        },
      },
    },
  },
};
export const mergePersonsOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
        company_id: { type: "integer" },
        owner_id: { type: "object" },
        org_id: { type: "object" },
        name: { type: "string" },
        first_name: { type: "string" },
        last_name: { type: ["string", "null"] },
        open_deals_count: { type: "integer" },
        closed_deals_count: { type: "integer" },
        active_flag: { type: "boolean" },
        phone: { type: "array", items: { type: "object" } },
        email: { type: "array", items: { type: "object" } },
        update_time: { type: "string" },
        add_time: { type: "string" },
        visible_to: { type: "string" },
        cc_email: { type: "string" },
      },
    },
  },
};
export const getPersonActivitiesOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          done: { type: "boolean" },
          type: { type: "string" },
          duration: { type: "string" },
          subject: { type: "string" },
          company_id: { type: "integer" },
          user_id: { type: "integer" },
          person_id: { type: "integer" },
          org_id: { type: "integer" },
          deal_id: { type: ["integer", "null"] },
          active_flag: { type: "boolean" },
          add_time: { type: "string" },
          update_time: { type: "string" },
          due_date: { type: "string" },
          due_time: { type: "string" },
          busy_flag: { type: "boolean" },
          note: { type: ["string", "null"] },
        },
      },
    },
    additional_data: {
      type: "object",
      properties: {
        next_cursor: { type: ["string", "null"] },
      },
    },
  },
};
export const getPersonDealsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          creator_user_id: { type: "integer" },
          user_id: { type: "integer" },
          person_id: { type: "integer" },
          org_id: { type: "integer" },
          stage_id: { type: "integer" },
          title: { type: "string" },
          value: { type: "number" },
          currency: { type: "string" },
          status: { type: "string" },
          pipeline_id: { type: "integer" },
          visible_to: { type: "integer" },
          active_flag: { type: "boolean" },
        },
      },
    },
    additional_data: {
      type: "object",
      properties: {
        next_cursor: { type: ["string", "null"] },
      },
    },
  },
};
export const getPersonFilesOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          user_id: { type: "integer" },
          person_id: { type: "integer" },
          org_id: { type: "integer" },
          file_name: { type: "string" },
          file_type: { type: "string" },
          file_size: { type: "integer" },
          active_flag: { type: "boolean" },
          name: { type: "string" },
          description: { type: ["string", "null"] },
          url: { type: "string" },
        },
      },
    },
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
};
export const getPersonFollowersOutputSchema = {
  type: "object",
  properties: {
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
        next_cursor: { type: ["string", "null"] },
      },
    },
  },
};
export const addPersonFollowerOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        user_id: { type: "integer" },
        id: { type: "integer" },
        person_id: { type: "integer" },
        add_time: { type: "string" },
      },
    },
  },
};
export const deletePersonFollowerOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    },
  },
};
export const getPersonMailMessagesOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          from: { type: "array", items: { type: "object" } },
          to: { type: "array", items: { type: "object" } },
          cc: { type: "array" },
          bcc: { type: "array" },
          subject: { type: "string" },
          snippet: { type: "string" },
          read_flag: { type: "integer" },
          has_body_flag: { type: "integer" },
          has_attachments_flag: { type: "integer" },
          message_time: { type: "string" },
          add_time: { type: "string" },
          update_time: { type: "string" },
          mail_thread_id: { type: "integer" },
        },
      },
    },
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
};
export const getPersonProductsOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          deal_id: { type: "integer" },
          product_id: { type: "integer" },
          name: { type: "string" },
          item_price: { type: "number" },
          quantity: { type: "integer" },
          discount: { type: "number" },
          sum: { type: "number" },
          currency: { type: "string" },
          active_flag: { type: "boolean" },
          product: { type: "object" },
        },
      },
    },
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
};
export const getPersonUpdatesOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          object: { type: "string" },
          timestamp: { type: "string" },
          data: { type: "object" },
          field_key: { type: "string" },
          old_value: { type: ["string", "null"] },
          new_value: { type: ["string", "null"] },
          log_id: { type: "integer" },
          change_source: { type: "string" },
        },
      },
    },
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
};
export const getPersonUsersOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: { type: "integer" },
    },
  },
};
export const deletePersonPictureOutputSchema = {
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
};
