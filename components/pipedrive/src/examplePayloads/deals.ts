export const getDealsExamplePayload = {
  data: {
    data: [
      {
        id: 1,
        creator_user_id: {
          id: 18487521,
          name: "Developer",
          email: "dummy@test.dev",
          has_pic: 0,
          pic_hash: null,
          active_flag: true,
          value: 18487521,
        },
        user_id: {
          id: 18487521,
          name: "Developer",
          email: "dummy@test.dev",
          has_pic: 0,
          pic_hash: null,
          active_flag: true,
          value: 18487521,
        },
        person_id: {
          active_flag: true,
          name: "test person",
          email: [
            {
              value: "",
              primary: true,
            },
          ],
          phone: [
            {
              value: "",
              primary: true,
            },
          ],
          owner_id: 18487521,
          value: 3,
        },
        org_id: {
          name: "test",
          people_count: 2,
          owner_id: 18487521,
          address: null,
          active_flag: true,
          cc_email: "test-sandbox@pipedrivemail.com",
          label_ids: [],
          owner_name: "Developer",
          value: 2,
        },
        stage_id: 1,
        title: "test deal",
        value: 2,
        currency: "USD",
        add_time: "2024-09-27 14:25:27",
        update_time: "2024-09-27 14:25:28",
        stage_change_time: null,
        active: true,
        deleted: false,
        status: "open",
        probability: null,
        next_activity_date: null,
        next_activity_time: null,
        next_activity_id: null,
        last_activity_id: null,
        last_activity_date: null,
        lost_reason: null,
        visible_to: "3",
        close_time: null,
        pipeline_id: 1,
        won_time: null,
        first_won_time: null,
        lost_time: null,
        products_count: 0,
        files_count: 0,
        notes_count: 0,
        followers_count: 1,
        email_messages_count: 0,
        activities_count: 0,
        done_activities_count: 0,
        undone_activities_count: 0,
        participants_count: 1,
        expected_close_date: null,
        last_incoming_mail_time: null,
        last_outgoing_mail_time: null,
        label: null,
        local_won_date: null,
        local_lost_date: null,
        local_close_date: null,
        origin: "ManuallyCreated",
        origin_id: null,
        channel: null,
        channel_id: null,
        stage_order_nr: 0,
        person_name: "test person",
        org_name: "test",
        next_activity_subject: null,
        next_activity_type: null,
        next_activity_duration: null,
        next_activity_note: null,
        formatted_value: "$2",
        weighted_value: 2,
        formatted_weighted_value: "$2",
        weighted_value_currency: "USD",
        rotten_time: null,
        owner_name: "Developer",
        cc_email: "test-sandbox+deal1@pipedrivemail.com",
        org_hidden: false,
        person_hidden: false,
      },
      {
        id: 2,
        creator_user_id: {
          id: 18487521,
          name: "Developer",
          email: "dummy@test.dev",
          has_pic: 0,
          pic_hash: null,
          active_flag: true,
          value: 18487521,
        },
        user_id: {
          id: 18487521,
          name: "Developer",
          email: "dummy@test.dev",
          has_pic: 0,
          pic_hash: null,
          active_flag: true,
          value: 18487521,
        },
        person_id: {
          active_flag: true,
          name: "awesome person",
          email: [
            {
              value: "",
              primary: true,
            },
          ],
          phone: [
            {
              value: "",
              primary: true,
            },
          ],
          owner_id: 18487521,
          value: 4,
        },
        org_id: {
          name: "test",
          people_count: 2,
          owner_id: 18487521,
          address: null,
          active_flag: true,
          cc_email: "test-sandbox@pipedrivemail.com",
          label_ids: [],
          owner_name: "Developer",
          value: 2,
        },
        stage_id: 4,
        title: "test deal 2",
        value: 3,
        currency: "USD",
        add_time: "2024-09-27 14:25:53",
        update_time: "2024-09-27 14:31:57",
        stage_change_time: "2024-09-27 14:31:45",
        active: false,
        deleted: false,
        status: "won",
        probability: null,
        next_activity_date: null,
        next_activity_time: null,
        next_activity_id: null,
        last_activity_id: null,
        last_activity_date: null,
        lost_reason: null,
        visible_to: "3",
        close_time: "2024-09-27 14:31:57",
        pipeline_id: 1,
        won_time: "2024-09-27 14:31:57",
        first_won_time: "2024-09-27 14:31:57",
        lost_time: null,
        products_count: 0,
        files_count: 0,
        notes_count: 0,
        followers_count: 1,
        email_messages_count: 0,
        activities_count: 0,
        done_activities_count: 0,
        undone_activities_count: 0,
        participants_count: 1,
        expected_close_date: null,
        last_incoming_mail_time: null,
        last_outgoing_mail_time: null,
        label: null,
        local_won_date: "2024-09-27",
        local_lost_date: null,
        local_close_date: "2024-09-27",
        origin: "ManuallyCreated",
        origin_id: null,
        channel: null,
        channel_id: null,
        stage_order_nr: 3,
        person_name: "awesome person",
        org_name: "test",
        next_activity_subject: null,
        next_activity_type: null,
        next_activity_duration: null,
        next_activity_note: null,
        formatted_value: "$3",
        weighted_value: 3,
        formatted_weighted_value: "$3",
        weighted_value_currency: "USD",
        rotten_time: null,
        owner_name: "Developer",
        cc_email: "test-sandbox+deal2@pipedrivemail.com",
        org_hidden: false,
        person_hidden: false,
      },
    ],
    additional_data: {
      next_cursor: "1234567890",
    },
  },
};

const singleDeal = {
  id: 1,
  creator_user_id: {
    id: 18487521,
    name: "Developer",
    email: "dummy@test.dev",
    has_pic: 0,
    pic_hash: null,
    active_flag: true,
    value: 18487521,
  },
  user_id: {
    id: 18487521,
    name: "Developer",
    email: "dummy@test.dev",
    has_pic: 0,
    pic_hash: null,
    active_flag: true,
    value: 18487521,
  },
  person_id: {
    active_flag: true,
    name: "Jane Smith",
    email: [
      {
        value: "jane.smith@example.com",
        primary: true,
      },
    ],
    phone: [
      {
        value: "+1-555-0123",
        primary: true,
      },
    ],
    owner_id: 18487521,
    value: 3,
  },
  org_id: {
    name: "Acme Corp",
    people_count: 5,
    owner_id: 18487521,
    address: "123 Main St, Springfield, IL 62701",
    active_flag: true,
    cc_email: "test-sandbox@pipedrivemail.com",
    label_ids: [],
    owner_name: "Developer",
    value: 2,
  },
  stage_id: 2,
  title: "Acme Corp Deal",
  value: 15000,
  currency: "USD",
  add_time: "2024-06-15 09:30:00",
  update_time: "2024-07-20 14:45:12",
  stage_change_time: "2024-07-10 11:20:00",
  active: true,
  deleted: false,
  status: "open",
  probability: 75,
  next_activity_date: "2024-08-01",
  next_activity_time: "10:00:00",
  next_activity_id: 42,
  last_activity_id: 38,
  last_activity_date: "2024-07-18",
  lost_reason: null,
  visible_to: "3",
  close_time: null,
  pipeline_id: 1,
  won_time: null,
  first_won_time: null,
  lost_time: null,
  products_count: 2,
  files_count: 3,
  notes_count: 5,
  followers_count: 2,
  email_messages_count: 8,
  activities_count: 12,
  done_activities_count: 10,
  undone_activities_count: 2,
  participants_count: 3,
  expected_close_date: "2024-09-30",
  last_incoming_mail_time: "2024-07-18 16:30:00",
  last_outgoing_mail_time: "2024-07-19 09:15:00",
  label: null,
  local_won_date: null,
  local_lost_date: null,
  local_close_date: null,
  origin: "ManuallyCreated",
  origin_id: null,
  channel: null,
  channel_id: null,
  stage_order_nr: 1,
  person_name: "Jane Smith",
  org_name: "Acme Corp",
  next_activity_subject: "Follow-up call",
  next_activity_type: "call",
  next_activity_duration: "00:30:00",
  next_activity_note: "Discuss pricing options",
  formatted_value: "$15,000",
  weighted_value: 11250,
  formatted_weighted_value: "$11,250",
  weighted_value_currency: "USD",
  rotten_time: null,
  owner_name: "Developer",
  cc_email: "test-sandbox+deal1@pipedrivemail.com",
  org_hidden: false,
  person_hidden: false,
};

export const addDealExamplePayload = {
  data: {
    success: true,
    data: singleDeal,
  },
};

export const getDealExamplePayload = {
  data: {
    success: true,
    data: singleDeal,
  },
};

export const updateDealExamplePayload = {
  data: {
    success: true,
    data: {
      ...singleDeal,
      title: "Acme Corp Deal - Updated",
      value: 20000,
      formatted_value: "$20,000",
      weighted_value: 15000,
      formatted_weighted_value: "$15,000",
      update_time: "2024-08-01 10:00:00",
    },
  },
};

export const deleteDealExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
    },
  },
};

export const searchDealsExamplePayload = {
  data: {
    success: true,
    data: {
      items: [
        {
          result_score: 0.316,
          item: {
            id: 1,
            type: "deal",
            title: "Acme Corp Deal",
            value: 15000,
            currency: "USD",
            status: "open",
            visible_to: 3,
            owner: {
              id: 18487521,
            },
            stage: {
              id: 2,
              name: "Proposal Made",
            },
            person: {
              id: 3,
              name: "Jane Smith",
            },
            organization: {
              id: 2,
              name: "Acme Corp",
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
      },
    },
  },
};

export const getDealsSummaryExamplePayload = {
  data: {
    success: true,
    data: {
      values_total: {
        USD: {
          value: 75000,
          count: 5,
          value_converted: 75000,
          value_formatted: "$75,000",
          value_converted_formatted: "$75,000",
        },
      },
      weighted_values_total: {
        USD: {
          value: 52500,
          count: 5,
          value_formatted: "$52,500",
        },
      },
      total_count: 5,
      total_currency_converted_value: 75000,
      total_currency_converted_value_formatted: "$75,000",
      total_weighted_currency_converted_value: 52500,
      total_weighted_currency_converted_value_formatted: "$52,500",
    },
  },
};

export const getDealsTimelineExamplePayload = {
  data: {
    success: true,
    data: {
      totals: {
        count: 3,
        values: {
          USD: {
            value: 45000,
            value_formatted: "$45,000",
          },
        },
        weighted_values: {
          USD: {
            value: 33750,
            value_formatted: "$33,750",
          },
        },
        open_count: 2,
        won_count: 1,
        lost_count: 0,
      },
      periods: [
        {
          period_start: "2024-01-01",
          period_end: "2024-01-31",
          deals: [
            {
              id: 1,
              creator_user_id: 18487521,
              user_id: 18487521,
              person_id: 3,
              org_id: 2,
              stage_id: 2,
              title: "Acme Corp Deal",
              value: 15000,
              currency: "USD",
              add_time: "2024-01-10 09:30:00",
              status: "open",
              pipeline_id: 1,
            },
          ],
        },
      ],
    },
  },
};

export const mergeDealsExamplePayload = {
  data: {
    success: true,
    data: {
      id: 1,
      creator_user_id: 18487521,
      user_id: 18487521,
      person_id: 3,
      org_id: 2,
      stage_id: 2,
      title: "Acme Corp Deal",
      value: 30000,
      currency: "USD",
      add_time: "2024-06-15 09:30:00",
      update_time: "2024-08-05 12:00:00",
      stage_change_time: "2024-07-10 11:20:00",
      active: true,
      deleted: false,
      status: "open",
      probability: 80,
      next_activity_date: "2024-08-10",
      next_activity_time: "14:00:00",
      next_activity_id: 55,
      last_activity_id: 50,
      last_activity_date: "2024-08-04",
      lost_reason: null,
      visible_to: "3",
      close_time: null,
      pipeline_id: 1,
      won_time: null,
      first_won_time: null,
      lost_time: null,
      products_count: 3,
      files_count: 5,
      notes_count: 8,
      followers_count: 3,
      email_messages_count: 12,
      activities_count: 18,
      done_activities_count: 15,
      undone_activities_count: 3,
      participants_count: 4,
      expected_close_date: "2024-10-15",
      last_incoming_mail_time: "2024-08-04 10:00:00",
      last_outgoing_mail_time: "2024-08-04 15:00:00",
      label: null,
      stage_order_nr: 1,
      person_name: "Jane Smith",
      org_name: "Acme Corp",
      next_activity_subject: "Contract review",
      next_activity_type: "meeting",
      next_activity_duration: "01:00:00",
      next_activity_note: "Review merged deal terms",
      formatted_value: "$30,000",
      weighted_value: 24000,
      formatted_weighted_value: "$24,000",
      weighted_value_currency: "USD",
      rotten_time: null,
      owner_name: "Developer",
      cc_email: "test-sandbox+deal1@pipedrivemail.com",
      merge_what_id: 2,
    },
  },
};

export const getDealActivitiesExamplePayload = {
  data: {
    data: [
      {
        id: 38,
        company_id: 12882925,
        user_id: 18487521,
        done: true,
        type: "call",
        reference_type: null,
        reference_id: null,
        conference_meeting_client: null,
        conference_meeting_url: null,
        conference_meeting_id: null,
        due_date: "2024-07-18",
        due_time: "14:00:00",
        duration: "00:15:00",
        busy_flag: true,
        add_time: "2024-07-15 09:00:00",
        marked_as_done_time: "2024-07-18 14:20:00",
        last_notification_time: null,
        last_notification_user_id: null,
        notification_language_id: null,
        subject: "Discovery call with Acme Corp",
        public_description: "Initial call to discuss requirements",
        org_id: 2,
        person_id: 3,
        deal_id: 1,
        lead_id: null,
        project_id: null,
        active_flag: true,
        update_time: "2024-07-18 14:20:00",
        update_user_id: 18487521,
        source_timezone: null,
        rec_rule: null,
        rec_rule_extension: null,
        rec_master_activity_id: null,
        note: "Discussed project scope and timeline",
        created_by_user_id: 18487521,
        location: null,
        participants: [{ person_id: 3, primary_flag: true }],
        org_name: "Acme Corp",
        person_name: "Jane Smith",
        deal_title: "Acme Corp Deal",
        owner_name: "Developer",
        person_dropbox_bcc: null,
        deal_dropbox_bcc: null,
        assigned_to_user_id: 18487521,
        file: null,
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};

export const getDealFilesExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 101,
        user_id: 18487521,
        deal_id: 1,
        person_id: 3,
        org_id: 2,
        product_id: null,
        activity_id: null,
        lead_id: null,
        log_id: null,
        add_time: "2024-07-01 10:00:00",
        update_time: "2024-07-01 10:00:00",
        file_name: "proposal_acme_corp.pdf",
        file_type: "pdf",
        file_size: 245760,
        active_flag: true,
        inline_flag: false,
        remote_location: "",
        remote_id: "",
        cid: null,
        s3_bucket: null,
        mail_message_id: null,
        mail_template_id: null,
        deal_name: "Acme Corp Deal",
        person_name: "Jane Smith",
        org_name: "Acme Corp",
        product_name: null,
        lead_name: null,
        url: "https://app.pipedrive.com/v1/files/101/download",
        name: "Proposal - Acme Corp",
        description: "Sales proposal for Q3 engagement",
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

export const getDealFollowersExamplePayload = {
  data: {
    data: [
      {
        user_id: 18487521,
        id: 501,
        person_id: null,
        deal_id: 1,
        add_time: "2024-06-15 09:30:00",
      },
      {
        user_id: 18487522,
        id: 502,
        person_id: null,
        deal_id: 1,
        add_time: "2024-06-16 11:00:00",
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};

export const addDealFollowerExamplePayload = {
  data: {
    success: true,
    data: {
      user_id: 18487522,
      id: 503,
      deal_id: 1,
      add_time: "2024-08-01 10:00:00",
    },
  },
};

export const deleteDealFollowerExamplePayload = {
  data: {
    success: true,
    data: {
      id: 503,
    },
  },
};

export const getDealMailMessagesExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 201,
        from: [
          {
            id: 18487521,
            name: "Developer",
            email_address: "dev@test.dev",
            linked_person_id: null,
            linked_person_name: null,
            mail_message_party_id: 1001,
          },
        ],
        to: [
          {
            id: 3,
            name: "Jane Smith",
            email_address: "jane.smith@example.com",
            linked_person_id: 3,
            linked_person_name: "Jane Smith",
            mail_message_party_id: 1002,
          },
        ],
        cc: [],
        bcc: [],
        body_url: "https://app.pipedrive.com/v1/mailbox/mailMessages/201/body",
        account_id: "acct-12345",
        user_id: 18487521,
        mail_thread_id: 301,
        subject: "Re: Acme Corp Deal - Proposal",
        snippet: "Hi Jane, please find the updated proposal attached...",
        read_flag: 1,
        draft: null,
        has_body_flag: 1,
        sent_flag: 1,
        sent_from_pipedrive_flag: 0,
        message_time: "2024-07-19 09:15:00",
        add_time: "2024-07-19 09:16:00",
        update_time: "2024-07-19 09:16:00",
        has_attachments_flag: 1,
        has_inline_attachments_flag: 0,
        has_real_attachments_flag: 1,
        write_flag: true,
        deal_id: 1,
        deal_name: "Acme Corp Deal",
        item_type: "deal",
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

export const getDealParticipantsExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 601,
        related_item_id: 1,
        related_item_type: "deal",
        person: {
          id: 3,
          company_id: 12882925,
          active_flag: true,
          phone: [
            {
              value: "+1-555-0123",
              primary: true,
            },
          ],
          email: [
            {
              value: "jane.smith@example.com",
              primary: true,
            },
          ],
          first_char: "j",
          add_time: "2024-01-10 08:00:00",
          update_time: "2024-07-15 12:00:00",
          visible_to: "3",
          name: "Jane Smith",
          owner_id: 18487521,
        },
        added_time: "2024-06-15 09:30:00",
        related_item_data: {
          id: 1,
          title: "Acme Corp Deal",
          status: "open",
          value: 15000,
          currency: "USD",
        },
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

export const addDealParticipantExamplePayload = {
  data: {
    success: true,
    data: {
      id: 602,
      related_item_id: 1,
      related_item_type: "deal",
      person: {
        id: 4,
        company_id: 12882925,
        active_flag: true,
        phone: [
          {
            value: "+1-555-0456",
            primary: true,
          },
        ],
        email: [
          {
            value: "bob.jones@example.com",
            primary: true,
          },
        ],
        first_char: "b",
        add_time: "2024-02-20 10:00:00",
        update_time: "2024-07-20 14:00:00",
        visible_to: "3",
        name: "Bob Jones",
        owner_id: 18487521,
      },
      added_time: "2024-08-01 10:00:00",
    },
  },
};

export const deleteDealParticipantExamplePayload = {
  data: {
    success: true,
    data: {
      id: 602,
    },
  },
};

export const getDealUsersExamplePayload = {
  data: {
    success: true,
    data: [18487521, 18487522],
  },
};

export const getDealProductsExamplePayload = {
  data: {
    data: [
      {
        id: 701,
        deal_id: 1,
        product_id: 10,
        product_variation_id: null,
        order_nr: 1,
        name: "Enterprise License",
        item_price: 5000,
        quantity: 2,
        discount: 0,
        discount_type: "percentage",
        sum: 10000,
        currency: "USD",
        is_enabled: true,
        add_time: "2024-06-20 09:00:00",
        last_edit: "2024-07-15 10:30:00",
        comments: "Annual enterprise license",
        active_flag: true,
        tax: 0,
        tax_method: "none",
        product: {
          id: 10,
          name: "Enterprise License",
          code: "ENT-001",
          unit: "license",
          active_flag: true,
          selectable: true,
          visible_to: "3",
          owner_id: 18487521,
        },
      },
    ],
    additional_data: {
      next_cursor: null,
    },
  },
};

export const addDealProductExamplePayload = {
  data: {
    success: true,
    data: {
      id: 702,
      deal_id: 1,
      product_id: 11,
      product_variation_id: null,
      order_nr: 2,
      name: "Premium Support Package",
      item_price: 2500,
      quantity: 1,
      discount: 10,
      discount_type: "percentage",
      sum: 2250,
      currency: "USD",
      is_enabled: true,
      add_time: "2024-08-01 10:00:00",
      last_edit: "2024-08-01 10:00:00",
      comments: "1-year premium support",
      active_flag: true,
      tax: 0,
      tax_method: "none",
    },
  },
};

export const updateDealProductExamplePayload = {
  data: {
    success: true,
    data: {
      id: 702,
      deal_id: 1,
      product_id: 11,
      product_variation_id: null,
      order_nr: 2,
      name: "Premium Support Package",
      item_price: 3000,
      quantity: 2,
      discount: 5,
      discount_type: "percentage",
      sum: 5700,
      currency: "USD",
      is_enabled: true,
      add_time: "2024-08-01 10:00:00",
      last_edit: "2024-08-05 14:30:00",
      comments: "Updated to 2-year premium support",
      active_flag: true,
      tax: 0,
      tax_method: "none",
    },
  },
};

export const deleteDealProductExamplePayload = {
  data: {
    success: true,
    data: {
      id: 702,
    },
  },
};
