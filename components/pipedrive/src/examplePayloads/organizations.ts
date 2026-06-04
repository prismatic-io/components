











export const getOrganizationExamplePayload = {
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
};
