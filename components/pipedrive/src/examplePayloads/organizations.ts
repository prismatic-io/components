export const getOrganizationExamplePayload = {
  data: {
    data: [
      {
        id: 1,
        name: "Acme Corporation",
        owner_id: 18487521,
        add_time: "2023-04-06T02:51:24Z",
        update_time: "2023-08-14T22:49:23Z",
        visible_to: 3,
        label_ids: [],
        address: {
          value: "123 Main St, Springfield, IL 62701, USA",
          country: "USA",
          admin_area_level_1: "IL",
          admin_area_level_2: null,
          locality: "Springfield",
          sublocality: null,
          route: "Main St",
          street_number: "123",
          postal_code: "62701",
          subpremise: null,
        },
        next_activity_id: null,
        last_activity_id: null,
        open_deals_count: 2,
        related_open_deals_count: 0,
        closed_deals_count: 1,
        related_closed_deals_count: 0,
        won_deals_count: 1,
        related_won_deals_count: 0,
        lost_deals_count: 0,
        related_lost_deals_count: 0,
        activities_count: 5,
        done_activities_count: 3,
        undone_activities_count: 2,
        email_messages_count: 4,
        people_count: 12,
        files_count: 2,
        notes_count: 7,
        followers_count: 3,
        cc_email: "test-sandbox+org1@pipedrivemail.com",
        custom_fields: {},
      },
      {
        id: 2,
        name: "Globex Industries",
        owner_id: 18487521,
        add_time: "2024-09-27T14:25:27Z",
        update_time: "2024-09-27T14:25:28Z",
        visible_to: 3,
        label_ids: [12],
        address: null,
        next_activity_id: null,
        last_activity_id: null,
        open_deals_count: 0,
        related_open_deals_count: 0,
        closed_deals_count: 0,
        related_closed_deals_count: 0,
        won_deals_count: 0,
        related_won_deals_count: 0,
        lost_deals_count: 0,
        related_lost_deals_count: 0,
        activities_count: 0,
        done_activities_count: 0,
        undone_activities_count: 0,
        email_messages_count: 0,
        people_count: 2,
        files_count: 0,
        notes_count: 0,
        followers_count: 1,
        cc_email: "test-sandbox+org2@pipedrivemail.com",
        custom_fields: {},
      },
    ] as unknown as import("../types").Organization[],
    additional_data: {
      next_cursor: "eyJpZCI6Mn0",
    },
  },
};
const singleOrganizationV2 = {
  id: 3,
  name: "Acme Corporation",
  owner_id: 18487521,
  add_time: "2024-11-01T11:00:00Z",
  update_time: "2024-11-15T15:30:00Z",
  visible_to: 3,
  label_ids: [],
  address: {
    value: "456 Oak Avenue, Chicago, IL 60601, USA",
    country: "USA",
    admin_area_level_1: "IL",
    admin_area_level_2: null,
    locality: "Chicago",
    sublocality: null,
    route: "Oak Avenue",
    street_number: "456",
    postal_code: "60601",
    subpremise: null,
  },
  next_activity_id: null,
  last_activity_id: 12,
  open_deals_count: 3,
  related_open_deals_count: 0,
  closed_deals_count: 2,
  related_closed_deals_count: 0,
  won_deals_count: 2,
  related_won_deals_count: 0,
  lost_deals_count: 0,
  related_lost_deals_count: 0,
  activities_count: 8,
  done_activities_count: 5,
  undone_activities_count: 3,
  email_messages_count: 6,
  people_count: 5,
  files_count: 3,
  notes_count: 4,
  followers_count: 2,
  cc_email: "test-sandbox+org3@pipedrivemail.com",
  custom_fields: {},
};
export const addOrganizationExamplePayload = {
  data: {
    data: singleOrganizationV2,
  },
};
export const getOrganizationSingleExamplePayload = {
  data: {
    data: singleOrganizationV2,
  },
};
export const updateOrganizationExamplePayload = {
  data: {
    data: singleOrganizationV2,
  },
};
export const deleteOrganizationExamplePayload = {
  data: {
    data: {
      id: 3,
    },
  },
};
export const searchOrganizationExamplePayload = {
  data: {
    data: {
      items: [
        {
          result_score: 0.614,
          item: {
            id: 3,
            type: "organization",
            name: "Acme Corporation",
            address: "456 Oak Avenue, Chicago, IL 60601, USA",
            visible_to: 3,
            owner: {
              id: 18487521,
            },
            custom_fields: [],
            notes: [],
          },
        },
      ],
    },
    additional_data: {
      pagination: {
        start: 0,
        limit: 100,
        more_items_in_collection: false,
        next_start: null,
      },
    },
  },
};
export const mergeOrganizationsExamplePayload = {
  data: {
    success: true,
    data: {
      id: 3,
      company_id: 12882925,
      owner_id: {
        id: 18487521,
        name: "Test Developer",
        email: "dev@test.dev",
        has_pic: 0,
        pic_hash: null,
        active_flag: true,
        value: 18487521,
      },
      name: "Acme Corporation",
      open_deals_count: 5,
      related_open_deals_count: 0,
      closed_deals_count: 3,
      related_closed_deals_count: 0,
      won_deals_count: 3,
      related_won_deals_count: 0,
      lost_deals_count: 0,
      related_lost_deals_count: 0,
      email_messages_count: 10,
      people_count: 8,
      activities_count: 12,
      done_activities_count: 7,
      undone_activities_count: 5,
      files_count: 4,
      notes_count: 6,
      followers_count: 2,
      address: "456 Oak Avenue, Chicago, IL 60601, USA",
      address_subpremise: null,
      address_street_number: "456",
      address_route: "Oak Avenue",
      address_sublocality: null,
      address_locality: "Chicago",
      address_admin_area_level_1: "IL",
      address_admin_area_level_2: null,
      address_country: "USA",
      address_postal_code: "60601",
      address_formatted_address: "456 Oak Avenue, Chicago, IL 60601, USA",
      active_flag: true,
      first_char: "a",
      update_time: "2024-11-15 15:30:00",
      add_time: "2024-11-01 11:00:00",
      visible_to: "3",
      next_activity_date: null,
      next_activity_time: null,
      next_activity_id: null,
      last_activity_id: 12,
      last_activity_date: "2024-11-14",
      label: null,
      label_ids: [],
      cc_email: "test-sandbox+org3@pipedrivemail.com",
      owner_name: "Test Developer",
      org_name: "Acme Corporation",
    },
  },
};
export const getOrganizationActivitiesExamplePayload = {
  data: {
    data: [
      {
        id: 15,
        done: false,
        type: "meeting",
        duration: "01:00:00",
        subject: "Quarterly review with Acme Corporation",
        company_id: 12882925,
        user_id: 18487521,
        person_id: 5,
        org_id: 3,
        deal_id: 4,
        lead_id: null,
        project_id: null,
        active_flag: true,
        add_time: "2024-11-12T10:00:00Z",
        update_time: "2024-11-12T10:00:00Z",
        due_date: "2024-12-15",
        due_time: "14:00",
        busy_flag: true,
        note: "Review Q4 performance metrics",
        location: "Conference Room B",
        public_description: null,
        assigned_to_user_id: 18487521,
        created_by_user_id: 18487521,
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};
export const getOrganizationDealsExamplePayload = {
  data: {
    data: [
      {
        id: 4,
        creator_user_id: 18487521,
        user_id: 18487521,
        person_id: 5,
        org_id: 3,
        stage_id: 3,
        title: "Acme Corporation - Enterprise Plan",
        value: 25000,
        currency: "USD",
        add_time: "2024-10-15T09:00:00Z",
        update_time: "2024-11-15T12:00:00Z",
        status: "open",
        pipeline_id: 1,
        visible_to: 3,
        active_flag: true,
        deleted: false,
        expected_close_date: "2025-01-15",
        probability: 80,
        lost_reason: null,
        won_time: null,
        lost_time: null,
        close_time: null,
        label: null,
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};
export const getOrganizationFilesExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 55,
        user_id: 18487521,
        deal_id: null,
        person_id: null,
        org_id: 3,
        product_id: null,
        activity_id: null,
        lead_id: null,
        log_id: null,
        add_time: "2024-11-02 08:30:00",
        update_time: "2024-11-02 08:30:00",
        file_name: "acme_corp_nda.pdf",
        file_type: "pdf",
        file_size: 512000,
        active_flag: true,
        inline_flag: false,
        remote_location: "",
        remote_id: "",
        s3_bucket: null,
        name: "NDA Agreement",
        description: "Non-disclosure agreement with Acme Corporation",
        url: "https://app.pipedrive.com/api/v1/files/55/download",
        cid: null,
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
export const getOrganizationFollowersExamplePayload = {
  data: {
    data: [
      {
        user_id: 18487521,
        id: 3,
        org_id: 3,
        add_time: "2024-11-01T11:00:00Z",
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};
export const addOrganizationFollowerExamplePayload = {
  data: {
    data: {
      user_id: 18487521,
      id: 4,
      org_id: 3,
      add_time: "2024-11-16T09:00:00Z",
    },
  },
};
export const deleteOrganizationFollowerExamplePayload = {
  data: {
    data: {
      id: 4,
    },
  },
};
export const getOrganizationMailMessagesExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 120,
        from: [
          {
            id: 5,
            email_address: "jane.smith@example.com",
            name: "Jane Smith",
            linked_person_id: 5,
          },
        ],
        to: [
          {
            id: 18487521,
            email_address: "dev@test.dev",
            name: "Test Developer",
            linked_person_id: null,
          },
        ],
        cc: [],
        bcc: [],
        subject: "Acme Corporation - Partnership Proposal",
        snippet:
          "Please find attached our partnership proposal for the upcoming...",
        read_flag: 1,
        draft: "0",
        has_body_flag: 1,
        has_attachments_flag: 1,
        message_time: "2024-11-08 16:45:00",
        add_time: "2024-11-08 16:45:00",
        update_time: "2024-11-08 16:45:00",
        write_flag: false,
        sent_flag: 0,
        synced_flag: 1,
        external_deleted_flag: false,
        smart_bcc_flag: 0,
        mail_thread_id: 60,
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
export const getOrganizationUpdatesExamplePayload = {
  data: {
    success: true,
    data: [
      {
        object: "organization",
        timestamp: "2024-11-15 15:30:00",
        data: {
          id: 3,
          name: "Acme Corporation",
          owner_id: 18487521,
          add_time: "2024-11-01 11:00:00",
          update_time: "2024-11-15 15:30:00",
          active_flag: true,
          visible_to: "3",
          address: "456 Oak Avenue, Chicago, IL 60601, USA",
        },
        field_key: "address",
        old_value: "123 Main St, Springfield, IL 62701",
        new_value: "456 Oak Avenue, Chicago, IL 60601, USA",
        is_bulk_update_flag: null,
        log_id: 410,
        change_source: "app",
        change_source_user_agent: "Mozilla/5.0",
        additional_data: {},
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
export const getOrganizationUsersExamplePayload = {
  data: {
    success: true,
    data: [18487521],
  },
};
export const getOrganizationPersonsExamplePayload = {
  data: {
    data: [
      {
        id: 1,
        name: "Jane Smith",
        first_name: "Jane",
        last_name: "Smith",
        owner_id: 18487521,
        org_id: 1,
        active_flag: true,
        add_time: "2024-01-15T10:30:00Z",
        update_time: "2024-06-01T14:00:00Z",
      },
    ],
    additional_data: {
      next_cursor: "eyJpZCI6Mn0",
    },
  },
};
