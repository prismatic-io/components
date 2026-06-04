import type {
  Survey,
  SurveyDetails,
  Collector,
  CollectorStats,
  SurveyResponse,
  SurveyResponseDetails,
  Contact,
  ContactList,
  Webhook,
  User,
  PaginatedResponse,
} from "./types";
import type { Element, TriggerPayload } from "@prismatic-io/spectral";


export const listSurveysExamplePayload: { data: PaginatedResponse<Survey> } = {
  data: {
    data: [
      {
        id: "123456789",
        title: "Customer Satisfaction Survey",
        nickname: "Q1 CSAT",
        href: "https://api.surveymonkey.com/v3/surveys/123456789",
        date_created: "2026-01-15T10:30:00+00:00",
        date_modified: "2026-01-20T14:45:00+00:00",
      },
      {
        id: "987654321",
        title: "Employee Engagement Survey",
        href: "https://api.surveymonkey.com/v3/surveys/987654321",
        date_created: "2026-01-10T08:00:00+00:00",
        date_modified: "2026-01-18T16:30:00+00:00",
      },
    ],
    page: 1,
    per_page: 2,
    total: 2,
    links: {
      self: "https://api.surveymonkey.com/v3/surveys?page=1",
    },
  },
};

export const getSurveyExamplePayload: { data: Survey } = {
  data: {
    id: "123456789",
    title: "Customer Satisfaction Survey",
    nickname: "Q1 CSAT",
    language: "en",
    question_count: 10,
    page_count: 3,
    date_created: "2026-01-15T10:30:00+00:00",
    date_modified: "2026-01-20T14:45:00+00:00",
    href: "https://api.surveymonkey.com/v3/surveys/123456789",
  },
};

export const getSurveyDetailsExamplePayload: { data: SurveyDetails } = {
  data: {
    id: "123456789",
    title: "Customer Satisfaction Survey",
    nickname: "Q1 CSAT",
    language: "en",
    question_count: 2,
    page_count: 1,
    date_created: "2026-01-15T10:30:00+00:00",
    date_modified: "2026-01-20T14:45:00+00:00",
    preview: "https://www.surveymonkey.com/r/Preview/",
    href: "https://api.surveymonkey.com/v3/surveys/123456789",
    pages: [
      {
        id: "111111",
        title: "Page 1",
        description: "Welcome to our survey",
        position: 1,
        question_count: 2,
        href: "https://api.surveymonkey.com/v3/surveys/123456789/pages/111111",
        questions: [
          {
            id: "222222",
            heading: "How satisfied are you with our service?",
            position: 1,
            family: "single_choice",
            subtype: "vertical",
            href: "https://api.surveymonkey.com/v3/surveys/123456789/pages/111111/questions/222222",
            answers: {
              choices: [
                {
                  id: "333333",
                  position: 1,
                  text: "Very Satisfied",
                },
                {
                  id: "444444",
                  position: 2,
                  text: "Satisfied",
                },
                {
                  id: "555555",
                  position: 3,
                  text: "Neutral",
                },
                {
                  id: "666666",
                  position: 4,
                  text: "Dissatisfied",
                },
                {
                  id: "777777",
                  position: 5,
                  text: "Very Dissatisfied",
                },
              ],
            },
          },
          {
            id: "888888",
            heading: "Any additional comments?",
            position: 2,
            family: "open_ended",
            subtype: "essay",
            href: "https://api.surveymonkey.com/v3/surveys/123456789/pages/111111/questions/888888",
          },
        ],
      },
    ],
  },
};

export const createSurveyExamplePayload: { data: Survey } = {
  data: {
    id: "123456789",
    title: "Customer Satisfaction Survey",
    nickname: "Q1 CSAT",
    language: "en",
    question_count: 0,
    page_count: 1,
    date_created: "2026-01-21T10:30:00+00:00",
    date_modified: "2026-01-21T10:30:00+00:00",
    href: "https://api.surveymonkey.com/v3/surveys/123456789",
  },
};

export const deleteSurveyExamplePayload: { data: { success: boolean } } = {
  data: {
    success: true,
  },
};


export const listCollectorsExamplePayload: {
  data: PaginatedResponse<Collector>;
} = {
  data: {
    data: [
      {
        id: "111111111",
        name: "Web Link",
        type: "weblink",
        status: "open",
        date_created: "2026-01-15T10:30:00+00:00",
        date_modified: "2026-01-20T14:45:00+00:00",
        href: "https://api.surveymonkey.com/v3/surveys/123456789/collectors/111111111",
      },
      {
        id: "222222222",
        name: "Email Invitation",
        type: "email",
        status: "open",
        date_created: "2026-01-16T09:00:00+00:00",
        date_modified: "2026-01-18T11:30:00+00:00",
        href: "https://api.surveymonkey.com/v3/surveys/123456789/collectors/222222222",
      },
    ],
    page: 1,
    per_page: 2,
    total: 2,
    links: {
      self: "https://api.surveymonkey.com/v3/surveys/123456789/collectors?page=1",
    },
  },
};

export const getCollectorExamplePayload: { data: Collector } = {
  data: {
    id: "111111111",
    name: "Web Link",
    type: "weblink",
    status: "open",
    date_created: "2026-01-15T10:30:00+00:00",
    date_modified: "2026-01-20T14:45:00+00:00",
    href: "https://api.surveymonkey.com/v3/surveys/123456789/collectors/111111111",
    url: "https://www.surveymonkey.com/r/EXAMPLE",
  },
};

export const getCollectorStatsExamplePayload: { data: CollectorStats } = {
  data: {
    id: "111111111",
    total: 150,
    started: 200,
    completed: 120,
    partial: 20,
    disqualified: 0,
    unique_clicks: 250,
  },
};

export const createCollectorExamplePayload: { data: Collector } = {
  data: {
    id: "333333333",
    name: "New Web Link",
    type: "weblink",
    status: "open",
    date_created: "2026-01-21T10:30:00+00:00",
    date_modified: "2026-01-21T10:30:00+00:00",
    href: "https://api.surveymonkey.com/v3/surveys/123456789/collectors/333333333",
    url: "https://www.surveymonkey.com/r/NEWLINK",
  },
};

export const updateCollectorExamplePayload: { data: Collector } = {
  data: {
    id: "111111111",
    name: "Updated Web Link",
    type: "weblink",
    status: "closed",
    date_created: "2026-01-15T10:30:00+00:00",
    date_modified: "2026-01-21T15:00:00+00:00",
    href: "https://api.surveymonkey.com/v3/surveys/123456789/collectors/111111111",
  },
};

export const deleteCollectorExamplePayload: { data: { success: boolean } } = {
  data: {
    success: true,
  },
};


export const listResponsesExamplePayload: {
  data: PaginatedResponse<SurveyResponse>;
} = {
  data: {
    data: [
      {
        id: "5555555555",
        survey_id: "123456789",
        collector_id: "111111111",
        response_status: "completed",
        date_created: "2026-01-20T10:15:00+00:00",
        date_modified: "2026-01-20T10:30:00+00:00",
        href: "https://api.surveymonkey.com/v3/surveys/123456789/responses/5555555555",
        analyze_url: "https://www.surveymonkey.com/analyze/response",
        ip_address: "192.168.1.1",
        recipient_id: "",
        total_time: 300,
      },
      {
        id: "6666666666",
        survey_id: "123456789",
        collector_id: "111111111",
        response_status: "partial",
        date_created: "2026-01-20T11:00:00+00:00",
        date_modified: "2026-01-20T11:05:00+00:00",
        href: "https://api.surveymonkey.com/v3/surveys/123456789/responses/6666666666",
        total_time: 150,
      },
    ],
    page: 1,
    per_page: 2,
    total: 2,
    links: {
      self: "https://api.surveymonkey.com/v3/surveys/123456789/responses?page=1",
    },
  },
};

export const getResponseExamplePayload: { data: SurveyResponse } = {
  data: {
    id: "5555555555",
    survey_id: "123456789",
    collector_id: "111111111",
    response_status: "completed",
    date_created: "2026-01-20T10:15:00+00:00",
    date_modified: "2026-01-20T10:30:00+00:00",
    href: "https://api.surveymonkey.com/v3/surveys/123456789/responses/5555555555",
    analyze_url: "https://www.surveymonkey.com/analyze/response",
    ip_address: "192.168.1.1",
    recipient_id: "",
    total_time: 300,
  },
};

export const getResponseDetailsExamplePayload: { data: SurveyResponseDetails } =
  {
    data: {
      id: "5555555555",
      survey_id: "123456789",
      collector_id: "111111111",
      response_status: "completed",
      date_created: "2026-01-20T10:15:00+00:00",
      date_modified: "2026-01-20T10:30:00+00:00",
      href: "https://api.surveymonkey.com/v3/surveys/123456789/responses/5555555555",
      analyze_url: "https://www.surveymonkey.com/analyze/response",
      ip_address: "192.168.1.1",
      recipient_id: "",
      total_time: 300,
      pages: [
        {
          id: "111111",
          questions: [
            {
              id: "222222",
              answers: [
                {
                  choice_id: "333333",
                  text: "Very Satisfied",
                },
              ],
            },
            {
              id: "888888",
              answers: [
                {
                  text: "Great service! Very happy with the experience.",
                },
              ],
            },
          ],
        },
      ],
    },
  };

export const listResponsesBulkExamplePayload: {
  data: PaginatedResponse<SurveyResponseDetails>;
} = {
  data: {
    data: [
      {
        id: "5555555555",
        survey_id: "123456789",
        collector_id: "111111111",
        response_status: "completed",
        date_created: "2026-01-20T10:15:00+00:00",
        date_modified: "2026-01-20T10:30:00+00:00",
        href: "https://api.surveymonkey.com/v3/surveys/123456789/responses/5555555555",
        pages: [
          {
            id: "111111",
            questions: [
              {
                id: "222222",
                answers: [
                  {
                    choice_id: "333333",
                    text: "Very Satisfied",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    page: 1,
    per_page: 1,
    total: 1,
    links: {
      self: "https://api.surveymonkey.com/v3/surveys/123456789/responses/bulk?page=1",
    },
  },
};

export const updateResponseExamplePayload: { data: SurveyResponse } = {
  data: {
    id: "5555555555",
    survey_id: "123456789",
    collector_id: "111111111",
    response_status: "completed",
    date_created: "2026-01-20T10:15:00+00:00",
    date_modified: "2026-01-21T16:00:00+00:00",
    href: "https://api.surveymonkey.com/v3/surveys/123456789/responses/5555555555",
  },
};

export const deleteResponseExamplePayload: { data: { success: boolean } } = {
  data: {
    success: true,
  },
};


export const listContactsExamplePayload: { data: PaginatedResponse<Contact> } =
  {
    data: {
      data: [
        {
          id: "1111111111",
          email: "john.doe@example.com",
          first_name: "John",
          last_name: "Doe",
          href: "https://api.surveymonkey.com/v3/contacts/1111111111",
        },
        {
          id: "2222222222",
          email: "jane.smith@example.com",
          first_name: "Jane",
          last_name: "Smith",
          href: "https://api.surveymonkey.com/v3/contacts/2222222222",
        },
      ],
      page: 1,
      per_page: 2,
      total: 2,
      links: {
        self: "https://api.surveymonkey.com/v3/contacts?page=1",
      },
    },
  };

export const getContactExamplePayload: { data: Contact } = {
  data: {
    id: "1111111111",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
    custom_fields: {
      1: "Customer",
      2: "Premium",
    },
    href: "https://api.surveymonkey.com/v3/contacts/1111111111",
  },
};

export const createContactExamplePayload: { data: Contact } = {
  data: {
    id: "3333333333",
    email: "new.contact@example.com",
    first_name: "New",
    last_name: "Contact",
    href: "https://api.surveymonkey.com/v3/contacts/3333333333",
  },
};

export const createBulkContactsExamplePayload: {
  data: { succeeded: Contact[]; failed: any[]; invalids: any[] };
} = {
  data: {
    succeeded: [
      {
        id: "4444444444",
        email: "bulk1@example.com",
        first_name: "Bulk",
        last_name: "User1",
        href: "https://api.surveymonkey.com/v3/contacts/4444444444",
      },
      {
        id: "5555555555",
        email: "bulk2@example.com",
        first_name: "Bulk",
        last_name: "User2",
        href: "https://api.surveymonkey.com/v3/contacts/5555555555",
      },
    ],
    failed: [],
    invalids: [],
  },
};

export const updateContactExamplePayload: { data: Contact } = {
  data: {
    id: "1111111111",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Updated",
    href: "https://api.surveymonkey.com/v3/contacts/1111111111",
  },
};

export const deleteContactExamplePayload: { data: { success: boolean } } = {
  data: {
    success: true,
  },
};


export const listContactListsExamplePayload: {
  data: PaginatedResponse<ContactList>;
} = {
  data: {
    data: [
      {
        id: "111111",
        name: "Customer List",
        href: "https://api.surveymonkey.com/v3/contact_lists/111111",
      },
      {
        id: "222222",
        name: "Employee List",
        href: "https://api.surveymonkey.com/v3/contact_lists/222222",
      },
    ],
    page: 1,
    per_page: 2,
    total: 2,
    links: {
      self: "https://api.surveymonkey.com/v3/contact_lists?page=1",
    },
  },
};

export const getContactListExamplePayload: { data: ContactList } = {
  data: {
    id: "111111",
    name: "Customer List",
    href: "https://api.surveymonkey.com/v3/contact_lists/111111",
  },
};

export const createContactListExamplePayload: { data: ContactList } = {
  data: {
    id: "333333",
    name: "New Contact List",
    href: "https://api.surveymonkey.com/v3/contact_lists/333333",
  },
};

export const updateContactListExamplePayload: { data: ContactList } = {
  data: {
    id: "111111",
    name: "Updated Customer List",
    href: "https://api.surveymonkey.com/v3/contact_lists/111111",
  },
};

export const deleteContactListExamplePayload: { data: { success: boolean } } = {
  data: {
    success: true,
  },
};


export const listWebhooksExamplePayload: { data: PaginatedResponse<Webhook> } =
  {
    data: {
      data: [
        {
          id: "111111",
          name: "Response Webhook",
          href: "https://api.surveymonkey.com/v3/webhooks/111111",
          event_type: "response_completed",
          object_type: "survey",
          object_ids: ["123456789"],
          subscription_url: "https://example.com/webhook",
        },
        {
          id: "222222",
          name: "Collector Webhook",
          href: "https://api.surveymonkey.com/v3/webhooks/222222",
          event_type: "collector_created",
          object_type: "survey",
          object_ids: ["987654321"],
          subscription_url: "https://example.com/webhook",
        },
      ],
      page: 1,
      per_page: 2,
      total: 2,
      links: {
        self: "https://api.surveymonkey.com/v3/webhooks?page=1",
      },
    },
  };

export const getWebhookExamplePayload: { data: Webhook } = {
  data: {
    id: "111111",
    name: "Response Webhook",
    href: "https://api.surveymonkey.com/v3/webhooks/111111",
    event_type: "response_completed",
    object_type: "survey",
    object_ids: ["123456789"],
    subscription_url: "https://example.com/webhook",
  },
};

export const createWebhookExamplePayload: { data: Webhook } = {
  data: {
    id: "333333",
    name: "New Webhook",
    href: "https://api.surveymonkey.com/v3/webhooks/333333",
    event_type: "response_completed",
    object_type: "survey",
    object_ids: ["123456789"],
    subscription_url: "https://example.com/new-webhook",
  },
};

export const updateWebhookExamplePayload: { data: Webhook } = {
  data: {
    id: "111111",
    name: "Updated Response Webhook",
    href: "https://api.surveymonkey.com/v3/webhooks/111111",
    event_type: "response_completed",
    object_type: "survey",
    object_ids: ["123456789", "987654321"],
    subscription_url: "https://example.com/updated-webhook",
  },
};

export const deleteWebhookExamplePayload: { data: { success: boolean } } = {
  data: {
    success: true,
  },
};


export const getMeExamplePayload: { data: User } = {
  data: {
    id: "12345678",
    username: "SurveyUser123",
    email: "user@example.com",
    account_type: "premier",
    language: "en",
    date_created: "2020-01-15T08:00:00+00:00",
    date_last_login: "2026-01-21T09:30:00+00:00",
    href: "https://api.surveymonkey.com/v3/users/12345678",
  },
};


export const rawRequestExamplePayload: { data: { message: string } } = {
  data: {
    message: "Raw request executed successfully",
  },
};


export const selectSurveyExamplePayload: { result: Element[] } = {
  result: [
    { label: "Customer Satisfaction Survey", key: "123456789" },
    { label: "Employee Feedback Q1 2026", key: "987654321" },
    { label: "Product Research Survey", key: "456789123" },
  ],
};

export const selectCollectorExamplePayload: { result: Element[] } = {
  result: [
    { label: "Web Link - January (weblink)", key: "111111111" },
    { label: "Email Campaign (email)", key: "222222222" },
    { label: "Social Media (social)", key: "333333333" },
  ],
};

export const selectContactListExamplePayload: { result: Element[] } = {
  result: [
    { label: "Customer List", key: "111111" },
    { label: "Employee List", key: "222222" },
    { label: "VIP Customers", key: "333333" },
  ],
};

export const selectWebhookEventTypeExamplePayload: { result: Element[] } = {
  result: [
    { label: "Response Completed", key: "response_completed" },
    { label: "Response Created", key: "response_created" },
    { label: "Response Updated", key: "response_updated" },
    { label: "Response Deleted", key: "response_deleted" },
    { label: "Response Disqualified", key: "response_disqualified" },
    { label: "Response Over Quota", key: "response_overquota" },
    { label: "Survey Created", key: "survey_created" },
    { label: "Survey Updated", key: "survey_updated" },
    { label: "Survey Deleted", key: "survey_deleted" },
    { label: "Collector Created", key: "collector_created" },
    { label: "Collector Updated", key: "collector_updated" },
    { label: "Collector Deleted", key: "collector_deleted" },
  ],
};


export const eventsWebhookExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "Sm-Apikey": "your-api-key",
      "Sm-Signature": "base64-encoded-hmac-signature",
    },
    body: {
      data: {
        name: "My Survey Webhook",
        filter_type: "survey",
        filter_id: "123456789",
        event_type: "response_completed",
        event_id: "unique-event-id-12345",
        object_type: "response",
        object_id: "987654321",
        event_datetime: "2026-01-21T10:30:00.000000+00:00",
        resources: {
          survey_id: "123456789",
          collector_id: "111222333",
          respondent_id: "444555666",
          recipient_id: "777888999",
        },
      },
    },
    rawBody: {
      data: Buffer.from(
        JSON.stringify({
          name: "My Survey Webhook",
          filter_type: "survey",
          filter_id: "123456789",
          event_type: "response_completed",
          event_id: "unique-event-id-12345",
          object_type: "response",
          object_id: "987654321",
          event_datetime: "2026-01-21T10:30:00.000000+00:00",
          resources: {
            survey_id: "123456789",
            collector_id: "111222333",
            respondent_id: "444555666",
            recipient_id: "777888999",
          },
        }),
      ),
    },
    queryParameters: {},
    webhookUrls: {
      Flow: "https://hooks.example.io/trigger/abc123",
    },
    webhookApiKeys: {
      Flow: ["api-key-1"],
    },
    customer: {
      id: "customer-123",
      externalId: "ext-customer-123",
      name: "Example Customer",
    },
    instance: {
      id: "instance-456",
      name: "SurveyMonkey Integration",
    },
    integration: {
      id: "integration-789",
      name: "SurveyMonkey",
      versionSequenceId: "1",
      externalVersion: "1.0.0",
    },
    flow: {
      id: "flow-abc",
      name: "Survey Events Flow",
    },
    user: {
      id: "user-xyz",
      name: "John Doe",
      email: "john.doe@example.com",
      externalId: "ext-user-xyz",
    },
    executionId: "execution-12345",
    startedAt: "2026-01-21T10:30:00.000Z",
    invokeUrl: "https://hooks.example.io/trigger/abc123",
    pathFragment: "",
    globalDebug: false,
  },
};















export const pollChangesTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [
          {
            id: "5007154401",
            survey_id: "1234567890",
            collector_id: "987654321",
            response_status: "completed",
            date_created: "2026-05-26T14:30:00+00:00",
            date_modified: "2026-05-26T14:30:00+00:00",
            href: "https://api.surveymonkey.com/v3/surveys/1234567890/responses/5007154401",
            pages: [],
          },
        ],
        updated: [
          {
            id: "5007150099",
            survey_id: "1234567890",
            collector_id: "987654321",
            response_status: "completed",
            date_created: "2026-04-12T09:00:00+00:00",
            date_modified: "2026-05-26T15:45:00+00:00",
            href: "https://api.surveymonkey.com/v3/surveys/1234567890/responses/5007150099",
            pages: [],
          },
        ],
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
