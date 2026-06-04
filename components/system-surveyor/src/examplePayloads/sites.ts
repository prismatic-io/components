



export const listSitesExamplePayload = {
  data: [
    {
      id: "2735eae1-910f-4438-b984-87b7e85f1f1e",
      name: "Frankfurt Airport",
      team: {
        id: 13775,
        name: "John's Team",
      },
      version: 1755150152,
      creator: {
        user_id: 23123,
        first_name: "John",
        last_name: "Doe",
      },
      modifier: null,
      created_at: 1755150152,
      modified_at: 1755182104,
      survey_count: 1,
      favorited_ts: null,
      reference_id: "frankfurt-airport",
      address: "Frankfurt, Germany",
      customer_external_id: "CUST-00123",
    },
  ],
};

export const getSitesAndFoldersExamplePayload = {
  data: {
    sites: [
      {
        id: "7923d9a5-7b45-49d5-ad1a-c8280999f280",
        name: "Chicago Office",
        survey_count: 1,
        site_count: null,
        type: "site",
        version: 1752892675,
        favorite_timestamp: null,
        has_favorite_sites: null,
        custom_site_id: "",
        customer_external_id: null,
        permissions: {
          is_site_guest: false,
          user_can_edit_site: true,
          user_can_change_site_access: true,
          user_can_invite_guests: true,
          user_can_delete_surveys: true,
          user_can_create_surveys: true,
          user_can_modify_surveys: true,
          user_can_revoke_survey_edit: true,
          user_can_edit_contacts: true,
          user_can_view_site_access: true,
        },
        owner: {
          user_id: 20332,
          first_name: "Zach",
          last_name: "Walders",
        },
        modified_at: 1752892675,
        modifier: null,
        team: {
          team_id: 13775,
          name: "Arjun's Team",
        },
      },
    ],
  },
};

export const getSiteInfoExamplePayload = {
  data: {
    id: "6ac251fc-5763-4e21-aa82-0a9efac256e5",
    name: "Los Angeles Data Center",
    team: {
      id: 13775,
      name: "John's Team",
    },
    creator: {
      user_id: 23123,
      first_name: "John",
      last_name: "Doe",
    },
    created_at: 1714764800,
    modified_at: 1714851200,
    survey_count: 3,
    address: "Los Angeles, CA",
  },
};

export const getSiteContactsExamplePayload = {
  data: [
    {
      id: 4501,
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      phone: "+1-555-0123",
      role: "Site Manager",
    },
  ],
};

export const getBillOfMaterialsDataExamplePayload = {
  data: [
    { component_model: "RTX-4590", quantity: 10 },
    { component_model: "ACP-1234", quantity: 5 },
    { component_model: "SW-5678", quantity: 15 },
  ],
};

export const listSiteSurveysExamplePayload = {
  data: {
    surveys: [
      {
        id: "12345678-1234-1234-1234-123456789012",
        name: "Building A - Floor 1",
        type: "survey",
        created_at: 1714764800,
        modified_at: 1714851200,
        element_count: 24,
      },
    ],
  },
};

export const listDeletedSitesExamplePayload = {
  data: [
    {
      id: "a1b2c3d4-5e6f-7a8b-9c0d-e1f2a3b4c5d6",
      name: "Decommissioned Warehouse",
      deleted_at: 1714851200,
      team: {
        id: 13775,
        name: "John's Team",
      },
    },
  ],
};
