const leadRecord = {
  id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  title: "Enterprise software inquiry",
  owner_id: 18487521,
  creator_id: 18487521,
  label_ids: ["f08b42a0-4eb5-11ec-81d3-0242ac130003"],
  person_id: 3,
  organization_id: 2,
  source_name: "Manually created",
  origin: "ManuallyCreated",
  origin_id: null,
  channel: null,
  channel_id: null,
  is_archived: false,
  was_seen: true,
  value: {
    amount: 5000,
    currency: "USD",
  },
  expected_close_date: "2024-12-31",
  next_activity_id: null,
  add_time: "2024-09-27 14:30:00",
  update_time: "2024-09-27 14:30:00",
  visible_to: "3",
  cc_email: "test-sandbox+lead1@pipedrivemail.com",
};

export const getLeadsExamplePayload = {
  data: {
    success: true,
    data: [leadRecord],
    additional_data: {
      pagination: {
        start: 0,
        limit: 50,
        more_items_in_collection: false,
      },
    },
  },
};

export const addLeadExamplePayload = {
  data: {
    success: true,
    data: leadRecord,
  },
};

export const getLeadExamplePayload = {
  data: {
    success: true,
    data: leadRecord,
  },
};

export const updateLeadExamplePayload = {
  data: {
    success: true,
    data: leadRecord,
  },
};

export const deleteLeadExamplePayload = {
  data: {
    success: true,
    data: {
      id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    },
  },
};

export const searchLeadsExamplePayload = {
  data: {
    success: true,
    data: {
      items: [
        {
          result_score: 0.95,
          item: {
            id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
            type: "lead",
            title: "Enterprise software inquiry",
            owner: {
              id: 18487521,
            },
            person: {
              id: 3,
              name: "John Doe",
            },
            organization: {
              id: 2,
              name: "Acme Corp",
            },
            phones: [],
            emails: [],
            custom_fields: [],
            notes: [],
          },
        },
      ],
    },
    additional_data: {
      pagination: {
        start: 0,
        limit: 50,
        more_items_in_collection: false,
      },
    },
  },
};
