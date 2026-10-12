const permissionSetRecord = {
  id: "1",
  name: "Admin",
  app: "sales",
  type: "admin",
  assignment_count: 2,
};
export const getPermissionSetsExamplePayload = {
  data: {
    success: true,
    data: [
      permissionSetRecord,
      {
        id: "2",
        name: "Regular User",
        app: "sales",
        type: "regular",
        assignment_count: 5,
      },
      {
        id: "3",
        name: "Manager",
        app: "sales",
        type: "manager",
        assignment_count: 1,
      },
    ],
  },
};
export const getPermissionSetExamplePayload = {
  data: {
    success: true,
    data: {
      id: "1",
      name: "Admin",
      app: "sales",
      type: "admin",
      contents: {
        can_add_deals: true,
        can_add_products: true,
        can_add_prospects: true,
        can_bulk_edit_items: true,
        can_change_visibility_of_items: true,
        can_convert_deals_to_leads: true,
        can_create_own_workflow: true,
        can_delete_activities: true,
        can_delete_deals: true,
        can_delete_own_activities: true,
        can_edit_deals_closed_date: true,
        can_edit_products: true,
        can_edit_shared_filters: true,
        can_export_data_from_lists: true,
        can_follow_other_users: true,
        can_merge_deals: true,
        can_merge_organizations: true,
        can_merge_people: true,
        can_see_company_wide_statistics: true,
        can_see_deals_list_summary: true,
        can_see_other_users: true,
        can_see_other_users_statistics: true,
        can_see_security_dashboard: true,
        can_use_api: true,
        can_use_email_tracking: true,
      },
    },
  },
};
export const getPermissionSetAssignmentsExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 18487521,
        name: "Developer",
        email: "dev@test.dev",
        active_flag: true,
      },
      {
        id: 18487522,
        name: "Sales Rep",
        email: "sales@test.dev",
        active_flag: true,
      },
    ],
    additional_data: {
      pagination: {
        start: 0,
        limit: 100,
        more_items_in_collection: false,
      },
    },
  },
};
