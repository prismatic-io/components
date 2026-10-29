const userRecord = {
  id: 18487521,
  name: "Developer",
  default_currency: "USD",
  locale: "en_US",
  lang: 1,
  email: "dev@test.dev",
  phone: "+15551234567",
  activated: true,
  last_login: "2024-09-27 14:00:00",
  created: "2024-01-01 00:00:00",
  modified: "2024-09-27 14:00:00",
  has_created_company: true,
  is_admin: 1,
  active_flag: true,
  timezone_name: "America/New_York",
  timezone_offset: "-05:00",
  role_id: 1,
  icon_url: null,
  is_you: true,
};

export const getUsersExamplePayload = {
  data: {
    success: true,
    data: [userRecord],
  },
};

export const findUsersByNameExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 18487521,
        name: "Developer",
        email: "dev@test.dev",
        default_currency: "USD",
      },
    ],
  },
};

export const getCurrentUserExamplePayload = {
  data: {
    success: true,
    data: {
      ...userRecord,
      company_id: 12882925,
      company_name: "Test Sandbox",
      company_domain: "test-sandbox",
      company_country: "US",
      language: {
        language_code: "en",
        country_code: "US",
      },
    },
  },
};

export const getUserExamplePayload = {
  data: {
    success: true,
    data: userRecord,
  },
};

export const getUserFollowersExamplePayload = {
  data: {
    success: true,
    data: [
      {
        user_id: 18487522,
        id: 1,
        add_time: "2024-09-27 14:00:00",
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};

export const getUserPermissionsExamplePayload = {
  data: {
    success: true,
    data: {
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
};

export const getUserRoleAssignmentsExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 1,
        user_id: 18487521,
        role_id: 1,
        is_primary: true,
        add_time: "2024-01-01 00:00:00",
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

export const getUserRoleSettingsExamplePayload = {
  data: {
    success: true,
    data: {
      deal_default_visibility: 3,
      lead_default_visibility: 3,
      org_default_visibility: 3,
      person_default_visibility: 3,
      product_default_visibility: 3,
      deal_access_level: "all",
      org_access_level: "all",
      person_access_level: "all",
    },
  },
};
