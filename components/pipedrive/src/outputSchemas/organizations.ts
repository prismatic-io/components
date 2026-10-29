export const getOrganizationsOutputSchema = {
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

export const singleOrganizationV2OutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
        owner_id: { type: "integer" },
        add_time: { type: "string" },
        update_time: { type: "string" },
        visible_to: { type: "integer" },
        label_ids: { type: "array", items: { type: "integer" } },
        address: {
          type: ["object", "null"],
          properties: {
            value: { type: "string" },
            country: { type: "string" },
            admin_area_level_1: { type: "string" },
            locality: { type: "string" },
            route: { type: "string" },
            street_number: { type: "string" },
            postal_code: { type: "string" },
          },
        },
        open_deals_count: { type: "integer" },
        closed_deals_count: { type: "integer" },
        won_deals_count: { type: "integer" },
        lost_deals_count: { type: "integer" },
        activities_count: { type: "integer" },
        people_count: { type: "integer" },
        files_count: { type: "integer" },
        notes_count: { type: "integer" },
        followers_count: { type: "integer" },
        cc_email: { type: "string" },
        active_flag: { type: "boolean" },
      },
    },
  },
};

export const deleteOrganizationOutputSchema = {
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

export const searchOrganizationOutputSchema = {
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
                  address: { type: ["string", "null"] },
                  visible_to: { type: "integer" },
                  owner: {
                    type: "object",
                    properties: { id: { type: "integer" } },
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

export const mergeOrganizationsOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
        company_id: { type: "integer" },
        owner_id: { type: "object" },
        name: { type: "string" },
        open_deals_count: { type: "integer" },
        closed_deals_count: { type: "integer" },
        people_count: { type: "integer" },
        activities_count: { type: "integer" },
        active_flag: { type: "boolean" },
        address: { type: ["string", "null"] },
        update_time: { type: "string" },
        add_time: { type: "string" },
        visible_to: { type: "string" },
        cc_email: { type: "string" },
      },
    },
  },
};

export const getOrganizationActivitiesOutputSchema = {
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

export const getOrganizationDealsOutputSchema = {
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

export const getOrganizationFilesOutputSchema = {
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

export const getOrganizationFollowersOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          user_id: { type: "integer" },
          id: { type: "integer" },
          org_id: { type: "integer" },
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

export const addOrganizationFollowerOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        user_id: { type: "integer" },
        id: { type: "integer" },
        org_id: { type: "integer" },
        add_time: { type: "string" },
      },
    },
  },
};

export const deleteOrganizationFollowerOutputSchema = {
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

export const getOrganizationMailMessagesOutputSchema = {
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

export const getOrganizationUpdatesOutputSchema = {
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

export const getOrganizationUsersOutputSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    data: {
      type: "array",
      items: { type: "integer" },
    },
  },
};

export const getOrganizationPersonsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "integer" },
          name: { type: "string" },
          first_name: { type: "string" },
          last_name: { type: ["string", "null"] },
          owner_id: { type: "integer" },
          org_id: { type: "integer" },
          active_flag: { type: "boolean" },
          add_time: { type: "string" },
          update_time: { type: "string" },
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
