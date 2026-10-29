const userRecordSchema = {
  type: "object",
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    default_currency: { type: "string" },
    locale: { type: "string" },
    lang: { type: "integer" },
    email: { type: "string" },
    phone: { type: "string" },
    activated: { type: "boolean" },
    last_login: { type: "string" },
    created: { type: "string" },
    modified: { type: "string" },
    has_created_company: { type: "boolean" },
    is_admin: { type: "integer" },
    active_flag: { type: "boolean" },
    timezone_name: { type: "string" },
    timezone_offset: { type: "string" },
    role_id: { type: "integer" },
    icon_url: { type: "string" },
    is_you: { type: "boolean" },
  },
};

const permissionsSchema = {
  type: "object",
  properties: {
    can_add_deals: { type: "boolean" },
    can_add_products: { type: "boolean" },
    can_add_prospects: { type: "boolean" },
    can_bulk_edit_items: { type: "boolean" },
    can_change_visibility_of_items: { type: "boolean" },
    can_convert_deals_to_leads: { type: "boolean" },
    can_create_own_workflow: { type: "boolean" },
    can_delete_activities: { type: "boolean" },
    can_delete_deals: { type: "boolean" },
    can_delete_own_activities: { type: "boolean" },
    can_edit_deals_closed_date: { type: "boolean" },
    can_edit_products: { type: "boolean" },
    can_edit_shared_filters: { type: "boolean" },
    can_export_data_from_lists: { type: "boolean" },
    can_follow_other_users: { type: "boolean" },
    can_merge_deals: { type: "boolean" },
    can_merge_organizations: { type: "boolean" },
    can_merge_people: { type: "boolean" },
    can_see_company_wide_statistics: { type: "boolean" },
    can_see_deals_list_summary: { type: "boolean" },
    can_see_other_users: { type: "boolean" },
    can_see_other_users_statistics: { type: "boolean" },
    can_see_security_dashboard: { type: "boolean" },
    can_use_api: { type: "boolean" },
    can_use_email_tracking: { type: "boolean" },
  },
};

export const getUsersOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: userRecordSchema },
      },
    },
  },
};

export const findUsersByNameOutputSchema = {
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
              default_currency: { type: "string" },
            },
          },
        },
      },
    },
  },
};

export const getCurrentUserOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            ...userRecordSchema.properties,
            company_id: { type: "integer" },
            company_name: { type: "string" },
            company_domain: { type: "string" },
            company_country: { type: "string" },
            language: {
              type: "object",
              properties: {
                language_code: { type: "string" },
                country_code: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};

export const getUserOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: userRecordSchema,
      },
    },
  },
};

export const getUserFollowersOutputSchema = {
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

export const getUserPermissionsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: permissionsSchema,
      },
    },
  },
};

export const getUserRoleAssignmentsOutputSchema = {
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
              user_id: { type: "integer" },
              role_id: { type: "integer" },
              is_primary: { type: "boolean" },
              add_time: { type: "string" },
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
    },
  },
};

export const getUserRoleSettingsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            deal_default_visibility: { type: "integer" },
            lead_default_visibility: { type: "integer" },
            org_default_visibility: { type: "integer" },
            person_default_visibility: { type: "integer" },
            product_default_visibility: { type: "integer" },
            deal_access_level: { type: "string" },
            org_access_level: { type: "string" },
            person_access_level: { type: "string" },
          },
        },
      },
    },
  },
};
