const permissionSetListSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    app: { type: "string" },
    type: { type: "string" },
    assignment_count: { type: "integer" },
  },
};

const permissionsContentsSchema = {
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

export const getPermissionSetsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: { type: "array", items: permissionSetListSchema },
      },
    },
  },
};

export const getPermissionSetOutputSchema = {
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
            name: { type: "string" },
            app: { type: "string" },
            type: { type: "string" },
            contents: permissionsContentsSchema,
          },
        },
      },
    },
  },
};

export const getPermissionSetAssignmentsOutputSchema = {
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
              active_flag: { type: "boolean" },
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
