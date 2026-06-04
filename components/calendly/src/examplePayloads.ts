









export const listEventInviteesExamplePayload = {
  data: [
    {
      cancel_url: "https://calendly.com/cancellations/AAAAAAAAAAAAAAAA",
      created_at: "2020-11-23T17:51:18.327602Z",
      email: "test@example.com",
      event: "https://api.calendly.com/scheduled_events/AAAAAAAAAAAAAAAA",
      name: "John Doe",
      first_name: "John",
      last_name: "Doe",
      new_invitee: null,
      old_invitee: null,
      questions_and_answers: [
        {
          answer: "radio button answer",
          position: 0,
          question: "Question with Radio Buttons answer type",
        },
        {
          answer: "Multiple line\nAnswer",
          position: 1,
          question: "Question with Multiple Lines answer type",
        },
        {
          answer: "Answer 1\nAnswer 2\nAnswer 3",
          position: 2,
          question: "Question with Checkboxes answer type",
        },
      ],
      reschedule_url: "https://calendly.com/reschedulings/AAAAAAAAAAAAAAAA",
      rescheduled: false,
      status: "active",
      text_reminder_number: null,
      timezone: "America/New_York",
      tracking: {
        utm_campaign: null,
        utm_source: null,
        utm_medium: null,
        utm_content: null,
        utm_term: null,
        salesforce_uuid: null,
      },
      updated_at: "2020-11-23T17:51:18.341657Z",
      uri: "https://api.calendly.com/scheduled_events/AAAAAAAAAAAAAAAA/invitees/AAAAAAAAAAAAAAAA",
      routing_form_submission:
        "https://api.calendly.com/routing_form_submissions/AAAAAAAAAAAAAAAA",
      payment: {
        external_id: "ch_AAAAAAAAAAAAAAAAAAAAAAAA",
        provider: "stripe",
        amount: 1234.56,
        currency: "USD",
        terms: "sample terms of payment (up to 1,024 characters)",
        successful: true,
      },
      no_show: null,
      reconfirmation: {
        created_at: "2020-11-23T17:51:18.341657Z",
        confirmed_at: "2020-11-23T20:01:18.341657Z",
      },
      scheduling_method: null,
      invitee_scheduled_by: null,
    },
  ],
};

export const listEventsExamplePayload = {
  data: [
    {
      uri: "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2",
      name: "15 Minute Meeting",
      status: "active",
      start_time: "2019-08-24T14:15:22.123456Z",
      end_time: "2019-08-24T14:15:22.123456Z",
      event_type: "https://api.calendly.com/event_types/GBGBDCAADAEDCRZ2",
      location: {
        type: "physical",
        location: "Calendly Office",
      },
      invitees_counter: {
        total: 0,
        active: 0,
        limit: 0,
      },
      created_at: "2019-01-02T03:04:05.092125Z",
      updated_at: "2019-01-02T03:04:05.092125Z",
      event_memberships: [
        {
          user: "https://api.calendly.com/users/GBGBDCAADAEDCRZ2",
          user_email: "user@example.com",
        },
      ],
      event_guests: [
        {
          email: "user@example.com",
          created_at: "2022-04-21T17:10:48.484945Z",
          updated_at: "2022-04-21T17:11:01.758636Z",
        },
      ],
      calendar_event: {
        kind: "google",
        external_id: "8suu9k3hj00mni03ss12ba0ce0",
      },
    },
  ],
};

export const getEventInviteeExamplePayload = {
  data: {
    resource: {
      cancel_url: "https://calendly.com/cancellations/AAAAAAAAAAAAAAAA",
      created_at: "2022-04-21T17:11:43.092010Z",
      email: "email@example.com",
      rescheduled: false,
      reschedule_url: "https://calendly.com/reschedulings/AAAAAAAAAAAAAAAA",
      event: "https://api.calendly.com/scheduled_events/ABCDABCDABCDABCD",
      name: "John Doe",
      first_name: null,
      last_name: null,
      new_invitee: null,
      old_invitee: null,
      status: "active",
      text_reminder_number: null,
      timezone: "America/New_York",
      tracking: {
        utm_campaign: null,
        utm_source: null,
        utm_medium: null,
        utm_content: null,
        utm_term: null,
        salesforce_uuid: null,
      },
      updated_at: "2020-01-01T20:30:00.000000Z",
      uri: "https://api.calendly.com/api/v2/scheduled_events/ABCDABCDABCDABCD/invitees/ABCDABCDABCDABCD",
      questions_and_answers: [
        {
          answer: "radio button answer",
          position: 0,
          question: "Question with Radio Buttons answer type",
        },
        {
          answer: "Multiple line\nAnswer",
          position: 1,
          question: "Question with Multiple Lines answer type",
        },
        {
          answer: "Answer 1\nAnswer 2\nAnswer 3",
          position: 2,
          question: "Question with Checkboxes answer type",
        },
      ],
      routing_form_submission:
        "https://api.calendly.com/routing_form_submissions/AAAAAAAAAAAAAAAA",
      payment: {
        external_id: "ch_AAAAAAAAAAAAAAAAAAAAAAAA",
        provider: "stripe",
        amount: 1234.56,
        currency: "USD",
        terms: "sample terms of payment (up to 1,024 characters)",
        successful: true,
      },
      no_show: null,
      reconfirmation: {
        created_at: "2020-11-23T17:51:18.341657Z",
        confirmed_at: "2020-11-23T20:01:18.341657Z",
      },
      scheduling_method: null,
      invitee_scheduled_by: null,
    },
  },
};

export const getEventExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2",
      name: "15 Minute Meeting",
      status: "active",
      booking_method: "instant",
      start_time: "2019-08-24T14:15:22.000000Z",
      end_time: "2019-08-24T14:15:22.000000Z",
      event_type: "https://api.calendly.com/event_types/GBGBDCAADAEDCRZ2",
      location: {
        type: "physical",
        location: "Calendly Office",
      },
      invitees_counter: {
        total: 0,
        active: 0,
        limit: 0,
      },
      created_at: "2019-01-02T03:04:05.678123Z",
      updated_at: "2019-01-02T03:04:05.678123Z",
      event_memberships: [
        {
          user: "https://api.calendly.com/users/GBGBDCAADAEDCRZ2",
          user_email: "user@example.com",
        },
      ],
      event_guests: [
        {
          email: "user@example.com",
          created_at: "2019-08-24T14:15:22.123456Z",
          updated_at: "2019-08-24T14:15:22.123456Z",
        },
      ],
      calendar_event: {
        kind: "google",
        external_id: "8suu9k3hj00mni03ss12ba0ce0",
      },
    },
  },
};

export const cancelEventExamplePayload = {
  data: {
    resource: {
      canceled_by: "string",
      reason: "string",
      canceler_type: "host",
      created_at: "2019-01-02T03:04:05.678123Z",
    },
  },
};

export const createSingleUseSchedulingLinkExamplePayload = {
  data: {
    resource: {
      booking_url: "https://calendly.com/d/abcd-brv8/15-minute-meeting",
      owner: "https://api.calendly.com/event_types/GBGBDCAADAEDCRZ2",
      owner_type: "EventType",
    },
  },
};

export const deleteInviteeDataExamplePayload = {
  data: {},
};

export const listUserEventTypesExamplePayload = {
  data: [
    {
      uri: "https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA",
      name: "15 Minute Meeting",
      active: true,
      booking_method: "instant",
      slug: "acmesales",
      scheduling_url: "https://calendly.com/acmesales",
      duration: 30,
      kind: "solo",
      pooling_type: "round_robin",
      type: "StandardEventType",
      color: "#fff200",
      created_at: "2019-01-02T03:04:05.678123Z",
      updated_at: "2019-08-07T06:05:04.321123Z",
      internal_note: "Internal note",
      description_plain: "15 Minute Meeting",
      description_html: "<p>15 Minute Meeting</p>",
      profile: {
        type: "User",
        name: "Tamara Jones",
        owner: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
      },
      secret: true,
      deleted_at: null,
      admin_managed: false,
      custom_questions: [
        {
          name: "Company Name",
          type: "string",
          position: 0,
          enabled: true,
          required: true,
          answer_choices: [],
          include_other: false,
        },
        {
          name: "What would you like to discuss?",
          type: "text",
          position: 0,
          enabled: true,
          required: true,
          answer_choices: [],
          include_other: false,
        },
        {
          name: "Number of employees",
          answer_choices: ["1", "2-10", "11-20", "20+"],
          enabled: true,
          include_other: true,
          position: 2,
          required: false,
          type: "single_select",
        },
        {
          name: "Multi-Select Question",
          answer_choices: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          enabled: true,
          include_other: true,
          position: 2,
          required: false,
          type: "multi_select",
        },
        {
          name: "Phone Number",
          type: "phone_number",
          position: 0,
          enabled: true,
          required: true,
          answer_choices: [],
          include_other: false,
        },
      ],
    },
  ],
};

export const getEventTypeExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA",
      name: "15 Minute Meeting",
      active: true,
      booking_method: "instant",
      slug: "acmesales",
      scheduling_url: "https://calendly.com/acmesales",
      duration: 30,
      kind: "solo",
      pooling_type: "round_robin",
      type: "StandardEventType",
      color: "#fff200",
      created_at: "2019-01-02T03:04:05.678123Z",
      updated_at: "2019-08-07T06:05:04.321123Z",
      internal_note: "Internal note",
      description_plain: "15 Minute Meeting",
      description_html: "<p>15 Minute Meeting</p>",
      profile: {
        type: "User",
        name: "Tamara Jones",
        owner: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
      },
      secret: true,
      deleted_at: null,
      admin_managed: false,
      custom_questions: [
        {
          name: "Company Name",
          type: "string",
          position: 0,
          enabled: true,
          required: true,
          answer_choices: [],
          include_other: false,
        },
        {
          name: "What would you like to discuss?",
          type: "text",
          position: 0,
          enabled: true,
          required: true,
          answer_choices: [],
          include_other: false,
        },
        {
          name: "Number of employees",
          answer_choices: ["1", "2-10", "11-20", "20+"],
          enabled: true,
          include_other: true,
          position: 2,
          required: false,
          type: "single_select",
        },
        {
          name: "Multi-Select Question",
          answer_choices: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
          enabled: true,
          include_other: true,
          position: 2,
          required: false,
          type: "multi_select",
        },
        {
          name: "Phone Number",
          type: "phone_number",
          position: 0,
          enabled: true,
          required: true,
          answer_choices: [],
          include_other: false,
        },
      ],
    },
  },
};

export const listEventTypeAvailableTimesExamplePayload = {
  data: {
    collection: [
      {
        status: "available",
        invitees_remaining: 2,
        start_time: "2020-01-02T20:00:00.000000Z",
        scheduling_url:
          "https://calendly.com/acmesales/discovery-call/2020-01-02T20:00:00Z?month=2020-01&date=2020-01-02",
      },
      {
        status: "available",
        invitees_remaining: 1,
        start_time: "2020-01-03T15:00:00.000000Z",
        scheduling_url:
          "https://calendly.com/acmesales/discovery-call/2020-01-03T15:00:00Z?month=2020-01&date=2020-01-03",
      },
      {
        status: "available",
        invitees_remaining: 3,
        start_time: "2020-01-07T23:00:00.000000Z",
        scheduling_url:
          "https://calendly.com/acmesales/discovery-call/2020-01-07T23:00:00Z?month=2020-01&date=2020-01-07",
      },
    ],
  },
};

export const getUserExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
      name: "John Doe",
      slug: "acmesales",
      email: "test@example.com",
      scheduling_url: "https://calendly.com/acmesales",
      timezone: "America/New York",
      avatar_url:
        "https://01234567890.cloudfront.net/uploads/user/avatar/0123456/a1b2c3d4.png",
      created_at: "2019-01-02T03:04:05.678123Z",
      updated_at: "2019-08-07T06:05:04.321123Z",
      current_organization:
        "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      resource_type: "User",
    },
  },
};

export const getCurrentUserExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
      name: "John Doe",
      slug: "acmesales",
      email: "user@example.com",
      scheduling_url: "https://calendly.com/acmesales",
      timezone: "America/New York",
      avatar_url:
        "https://01234567890.cloudfront.net/uploads/user/avatar/0123456/a1b2c3d4.png",
      created_at: "2019-01-02T03:04:05.678123Z",
      updated_at: "2019-08-07T06:05:04.321123Z",
      current_organization:
        "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      resource_type: "User",
    },
  },
};

export const createShareExamplePayload = {
  data: {
    resource: {
      scheduling_links: [
        {
          booking_url: "https://calendly.com/d/abcd-brv8/15-minute-meeting",
          owner: "https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA",
          owner_type: "EventType",
        },
      ],
      share_override: {
        name: "15 Minute Meeting",
        duration: 60,
        period_type: "fixed",
        start_date: "2019-01-02",
        end_date: "2019-01-03",
        max_booking_time: 300,
        hide_location: true,
        location_configurations: [
          {
            location: "123 Abc St.",
            additional_info: "Example additional info",
            phone_number: "+1 888-888-8888",
            position: 0,
            kind: "physical",
          },
        ],
        availability_rule: {
          rules: [
            {
              type: "wday",
              wday: "friday",
              date: "2019-01-02",
              intervals: [
                {
                  from: "07:00",
                  to: "11:00",
                },
              ],
            },
          ],
          timezone: "America/New_York",
        },
      },
    },
  },
};

export const createWebhookSubscriptionExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/webhook_subscriptions/AAAAAAAAAAAAAAAA",
      callback_url: "https://blah.foo/bar",
      created_at: "2019-08-24T14:15:22.123456Z",
      updated_at: "2019-08-24T14:15:22.123456Z",
      retry_started_at: "2019-08-24T14:15:22.123456Z",
      state: "active",
      events: ["invitee.created"],
      scope: "user",
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      user: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
      creator: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
    },
  },
};

export const listWebhookSubscriptionExamplePayload = {
  data: [
    {
      uri: "https://api.calendly.com/webhook_subscriptions/AAAAAAAAAAAAAAAA",
      callback_url: "https://blah.foo/bar",
      created_at: "2019-08-24T14:15:22.123456Z",
      updated_at: "2019-08-24T14:15:22.123456Z",
      retry_started_at: "2019-08-24T14:15:22.123456Z",
      state: "active",
      events: ["invitee.created"],
      scope: "user",
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      user: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
      creator: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
    },
  ],
};

export const getWebhookSubscriptionExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/webhook_subscriptions/AAAAAAAAAAAAAAAA",
      callback_url: "https://blah.foo/bar",
      created_at: "2019-08-24T14:15:22.123456Z",
      updated_at: "2019-08-24T14:15:22.123456Z",
      retry_started_at: "2019-08-24T14:15:22.123456Z",
      state: "active",
      events: ["invitee.created"],
      scope: "user",
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      user: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
      creator: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
    },
  },
};

export const listOrganizationInvitationsExamplePayload = {
  data: [
    {
      uri: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA/invitations/BBBBBBBBBBBBBBBB",
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      email: "test@example.com",
      status: "accepted",
      created_at: "2019-08-07T06:05:04.321123Z",
      updated_at: "2019-01-02T03:04:05.678123Z",
      last_sent_at: "2019-01-02T03:04:05.678123Z",
      user: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
    },
  ],
};

export const inviteUserToOrganizationExamplePayload = {
  data: {
    resource: {
      created_at: "2020-01-01T20:30:00.000000Z",
      email: "email@example.com",
      last_sent_at: "2020-01-01T20:30:00.123456Z",
      organization: "https://api.calendly.com/organizations/ABCDABCDABCDABCD",
      status: "pending",
      updated_at: "2020-01-01T20:30:00.000000Z",
      uri: "https://api.calendly.com/organizations/ABCDABCDABCDABCD/invitations/DCBADCBADCBADCBA",
    },
  },
};

export const getOrganizationInvitationExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA/invitations/BBBBBBBBBBBBBBBB",
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      email: "test@example.com",
      status: "accepted",
      created_at: "2019-08-07T06:05:04.321123Z",
      updated_at: "2019-01-02T03:04:05.678123Z",
      last_sent_at: "2019-01-02T03:04:05.678123Z",
      user: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
    },
  },
};

export const getOrganizationMembershipExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/organization_memberships/AAAAAAAAAAAAAAAA",
      role: "admin",
      user: {
        uri: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
        name: "John Doe",
        slug: "acmesales",
        email: "test@example.com",
        scheduling_url: "https://calendly.com/acmesales",
        timezone: "America/New York",
        avatar_url:
          "https://01234567890.cloudfront.net/uploads/user/avatar/0123456/a1b2c3d4.png",
        created_at: "2019-01-02T03:04:05.678123Z",
        updated_at: "2019-08-07T06:05:04.321123Z",
      },
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      updated_at: "2019-08-07T06:05:04.321123Z",
      created_at: "2019-01-02T03:04:05.678123Z",
    },
  },
};

export const listOrganizationMembershipsExamplePayload = {
  data: [
    {
      uri: "https://api.calendly.com/organization_memberships/AAAAAAAAAAAAAAAA",
      role: "admin",
      user: {
        uri: "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
        name: "John Doe",
        slug: "acmesales",
        email: "test@example.com",
        scheduling_url: "https://calendly.com/acmesales",
        timezone: "America/New York",
        avatar_url:
          "https://01234567890.cloudfront.net/uploads/user/avatar/0123456/a1b2c3d4.png",
        created_at: "2019-01-02T03:04:05.678123Z",
        updated_at: "2019-08-07T06:05:04.321123Z",
      },
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      updated_at: "2019-08-07T06:05:04.321123Z",
      created_at: "2019-01-02T03:04:05.678123Z",
    },
  ],
};

export const listUserBusyTimesExamplePayload = {
  data: {
    collection: [
      {
        type: "calendly",
        start_time: "2020-01-02T20:00:00.000000Z",
        end_time: "2020-01-02T20:30:00.000000Z",
        buffered_start_time: "2020-01-02T19:30:00.000000Z",
        buffered_end_time: "2020-01-02T21:00:00.000000Z",
        event: {
          uri: "https://api.calendly.com/scheduled_events/abc123",
        },
      },
      {
        type: "calendly",
        start_time: "2020-01-05T20:00:00.000000Z",
        end_time: "2020-01-05T20:30:00.000000Z",
        buffered_start_time: "2020-01-05T19:30:00.000000Z",
        buffered_end_time: "2020-01-05T21:00:00.000000Z",
        event: {
          uri: "https://api.calendly.com/scheduled_events/abc12345",
        },
      },
      {
        type: "external",
        start_time: "2020-01-07T20:00:00.000000Z",
        end_time: "2020-01-07T20:30:00.000000Z",
      },
    ],
  },
};

export const listUserAvailabilitySchedulesExamplePayload = {
  data: {
    collection: [
      {
        uri: "https://api.calendly.com/user_availability_schedule/abc123",
        default: true,
        name: "Working Hours",
        user: "https://api.calendly.com/users/abc123",
        timezone: "America/New_York",
        rules: [
          {
            type: "wday",
            intervals: [
              {
                from: "08:30",
                to: "09:30",
              },
            ],
            wday: "sunday",
            date: "2022-12-31",
          },
        ],
      },
      {
        uri: "https://api.calendly.com/user_availability_schedule/abc456",
        default: false,
        name: "Evening Hours",
        user: "https://api.calendly.com/users/abc123",
        timezone: "America/New_York",
        rules: [
          {
            type: "wday",
            intervals: [
              {
                from: "08:30",
                to: "17:00",
              },
            ],
            wday: "monday",
          },
          {
            type: "wday",
            intervals: [
              {
                from: "08:30",
                to: "17:00",
              },
            ],
            wday: "tuesday",
          },
          {
            type: "wday",
            intervals: [],
            wday: "wednesday",
          },
          {
            type: "wday",
            intervals: [
              {
                from: "08:30",
                to: "17:00",
              },
            ],
            wday: "thursday",
          },
          {
            type: "wday",
            intervals: [
              {
                from: "08:30",
                to: "17:00",
              },
            ],
            wday: "friday",
          },
          {
            type: "wday",
            intervals: [],
            wday: "saturday",
          },
          {
            type: "date",
            intervals: [
              {
                from: "08:30",
                to: "09:30",
              },
            ],
            date: "2028-12-31",
          },
        ],
      },
    ],
  },
};

export const getUserAvailabilityScheduleExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/user_availability_schedule/abc123",
      default: true,
      name: "Working Hours",
      user: "https://api.calendly.com/users/abc123",
      timezone: "America/New_York",
      rules: [
        {
          type: "wday",
          intervals: [
            {
              from: "08:30",
              to: "09:30",
            },
          ],
          wday: "sunday",
          date: "2022-12-31",
        },
      ],
    },
  },
};

export const listActivityLogEntriesExamplePayload = {
  data: [
    {
      occurred_at: "2020-01-02T03:04:05.678Z",
      uri: "https://api.calendly.com/activity_log_entries/ALFKJELNCLKSJDLKFJGELKJ",
      namespace: "User",
      action: "Add",
      actor: {
        uri: "https://api.calendly.com/users/SDLKJENFJKD123",
        type: "User",
        organization: {
          uri: "https://api.calendly.com/organizations/LKJENFLKE293847",
          role: "Owner",
        },
        group: {
          uri: "https://api.calendly.com/groups/123987DJLKJEF",
          name: "Development",
          role: "Admin",
        },
        display_name: "Test User",
        alternative_identifier: "testuser@example.com",
      },
      fully_qualified_name: "User.Add",
      details: {},
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAA",
    },
  ],
};

export const listRoutingFormsExamplePayload = {
  data: [
    {
      uri: "https://api.calendly.com/routing_forms/AAAAAAAAAAAAAAAA",
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      name: "ACME Demo",
      status: "published",
      questions: [
        {
          uuid: "123e4567-e89b-12d3-a456-426614174000",
          name: "What is your industry?",
          type: "select",
          required: true,
          answer_choices: [
            "IT & Software",
            "Financial Services",
            "Entertainment",
          ],
        },
        {
          uuid: "1213f8f1-57fd-45ee-88e9-1978d35b5cad",
          name: "Email",
          type: "email",
          required: true,
          answer_choices: null,
        },
      ],
      created_at: "2022-05-15T03:04:05.678Z",
      updated_at: "2022-05-15T06:05:04.321Z",
    },
  ],
};

export const getRoutingFormExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/routing_forms/AAAAAAAAAAAAAAAA",
      organization: "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
      name: "ACME Demo",
      status: "published",
      questions: [
        {
          uuid: "123e4567-e89b-12d3-a456-426614174000",
          name: "What is your industry?",
          type: "select",
          required: true,
          answer_choices: [
            "IT & Software",
            "Financial Services",
            "Entertainment",
          ],
        },
        {
          uuid: "1213f8f1-57fd-45ee-88e9-1978d35b5cad",
          name: "Email",
          type: "email",
          required: true,
          answer_choices: null,
        },
      ],
      created_at: "2022-05-15T03:04:05.678Z",
      updated_at: "2022-05-15T06:05:04.321Z",
    },
  },
};

export const listRoutingFormSubmissionsExamplePayload = {
  data: [
    {
      uri: "https://api.calendly.com/routing_form_submissions/AAAAAAAAAAAAAAAA",
      routing_form: "https://api.calendly.com/routing_forms/AAAAAAAAAAAAAAAA",
      questions_and_answers: [
        {
          question_uuid: "123e4567-e89b-12d3-a456-426614174000",
          question: "What is your industry?",
          answer: "IT & Software",
        },
      ],
      tracking: {
        utm_campaign: null,
        utm_source: null,
        utm_medium: null,
        utm_content: null,
        utm_term: null,
        salesforce_uuid: null,
      },
      result: {
        type: "event_type",
        value: "https://api.calendly.com/event_types/GBGBDCAADAEDCRZ2",
      },
      submitter:
        "https://calendly.com/scheduled_events/AAAAAAAAAAAAAAAA/invitees/AAAAAAAAAAAAAAAA",
      submitter_type: "Invitee",
      created_at: "2022-05-15T03:04:05.678Z",
      updated_at: "2022-05-15T06:05:04.321Z",
    },
  ],
};

export const getRoutingFormSubmissionExamplePayload = {
  data: {
    resource: {
      uri: "https://api.calendly.com/routing_form_submissions/AAAAAAAAAAAAAAAA",
      routing_form: "https://api.calendly.com/routing_forms/AAAAAAAAAAAAAAAA",
      questions_and_answers: [
        {
          question_uuid: "123e4567-e89b-12d3-a456-426614174000",
          question: "What is your industry?",
          answer: "IT & Software",
        },
      ],
      tracking: {
        utm_campaign: null,
        utm_source: null,
        utm_medium: null,
        utm_content: null,
        utm_term: null,
        salesforce_uuid: null,
      },
      result: {
        type: "event_type",
        value: "https://api.calendly.com/event_types/GBGBDCAADAEDCRZ2",
      },
      submitter:
        "https://calendly.com/scheduled_events/AAAAAAAAAAAAAAAA/invitees/AAAAAAAAAAAAAAAA",
      submitter_type: "Invitee",
      created_at: "2022-05-15T03:04:05.678Z",
      updated_at: "2022-05-15T06:05:04.321Z",
    },
  },
};
