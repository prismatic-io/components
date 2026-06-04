import type { TriggerPayload } from "@prismatic-io/spectral";






export const paginationAttributes = {
  meta: {
    has_more: true,
    after_cursor:
      "eyJvIjoibmljZV9pZCIsInYiOiJhUUFBQUFBQWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhIn0=",
    before_cursor:
      "eyJvIjoibmljZV9pZCIsInYiOiJiUUFBQUFBQWJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiIn0=",
  },
  links: {
    next: "https://example.zendesk.com/api/v2/tickets.json?page[size]=100&page[after]=eyJvIjoibmljZV9pZCIsInYiOiJhUUFBQUFBQWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhIn0=",
    prev: "https://example.zendesk.com/api/v2/tickets.json?page[size]=100&page[before]=eyJvIjoibmljZV9pZCIsInYiOiJiUUFBQUFBQWJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiIn0=",
  },
};










export const listUsersPayload = [
  {
    id: 223443,
    name: "Johnny Agent",
  },
  {
    id: 8678530,
    name: "James A. Rosen",
  },
];






export const searchUsersPayload = [
  {
    id: 35436,
    name: "Robert Jones",
    notes: "sigil issue",
  },
  {
    id: 9873843,
    name: "Terry Gilliam",
  },
];






export const createUserPayload = {
  user: {
    id: 35436,
    name: "Roger Wilco",
    email: "roger.wilco@example.com",
    role: "agent",
    active: true,
    verified: true,
    organization_id: 509974,
    phone: "+15555550123",
    alias: "Roger",
    created_at: "2024-04-17T17:18:10Z",
    updated_at: "2024-04-17T17:18:10Z",
    url: "https://company.zendesk.com/api/v2/users/35436.json",
  },
};






export const showUserPayload = createUserPayload;






export const updateUserPayload = createUserPayload;










export const listTicketsPayload = [
  {
    assignee_id: 235323,
    collaborator_ids: [35334, 234],
    created_at: "2009-07-20T22:55:29Z",
    custom_fields: [
      {
        id: 27642,
        value: "745",
      },
      {
        id: 27648,
        value: "yes",
      },
    ],
    custom_status_id: 123,
    description: "The fire is very colorful.",
    due_at: null,
    external_id: "ahg35h3jh",
    follower_ids: [35334, 234],
    from_messaging_channel: false,
    group_id: 98738,
    has_incidents: false,
    id: 35436,
    organization_id: 509974,
    priority: "high",
    problem_id: 9873764,
    raw_subject: "{{dc.printer_on_fire}}",
    recipient: "support@company.com",
    requester_id: 20978392,
    satisfaction_rating: {
      comment: "Great support!",
      id: 1234,
      score: "good",
    },
    sharing_agreement_ids: [84432],
    status: "open",
    subject: "Help, my printer is on fire!",
    submitter_id: 76872,
    tags: ["enterprise", "other_tag"],
    type: "incident",
    updated_at: "2011-05-05T10:38:52Z",
    url: "https://company.zendesk.com/api/v2/tickets/35436.json",
    via: {
      channel: "web",
    },
  },
];






export const createTicketPayload = {
  ticket: listTicketsPayload[0],
};






export const getByExternalIdPayload = {
  tickets: listTicketsPayload,
  count: 1,
};










export const listArticlesPayload = {
  ...paginationAttributes,
  articles: [
    {
      id: 28523513715859,
      url: "https://sampleSubdomain.zendesk.com/api/v2/help_center/en-us/articles/28523513715859.json",
      html_url:
        "https://sampleSubdomain.zendesk.com/hc/en-us/articles/28523513715859-Acme-Testing",
      author_id: 28226296456851,
      comments_disabled: false,
      draft: true,
      promoted: false,
      position: 0,
      vote_sum: 0,
      vote_count: 0,
      section_id: 28523491991699,
      created_at: "2024-04-17T17:18:10Z",
      updated_at: "2024-04-17T17:18:10Z",
      name: "Acme Testing",
      title: "Acme Testing",
      source_locale: "en-us",
      locale: "en-us",
      outdated: false,
      outdated_locales: [],
      edited_at: "2024-04-17T17:18:10Z",
      user_segment_id: 28523370353171,
      permission_group_id: 28523398501139,
      content_tag_ids: [],
      label_names: [],
      body: "<p>testing knowledge base</p>",
    },
  ],
};






export const getArticlePayload = { article: listArticlesPayload.articles[0] };






export const createArticlePayload = {
  article: {
    author_id: 3465,
    comments_disabled: true,
    content_tag_ids: ["01GT23D51Y", "01GT23FWWN"],
    id: 37486578,
    locale: "en_us",
    permission_group_id: 123,
    position: 42,
    promoted: false,
    title: "Article title",
    user_segment_id: 12,
  },
};






export const updateArticlePayload = {
  article: {
    author_id: 3465,
    comments_disabled: true,
    content_tag_ids: ["01GT23D51Y", "01GT23FWWN"],
    id: 37486578,
    locale: "en_us",
    permission_group_id: 123,
    position: 42,
    promoted: false,
    title: "Article title",
    user_segment_id: 12,
  },
};






export const associateAttachmentsInBulkToArticlePayload = null;










export const getArticleAttachmentPayload = {
  article_attachment: {
    article_id: 23,
    content_type: "application/jpeg",
    content_url:
      "https://company.zendesk.com/hc/article_attachments/200109629/logo.jpg",
    file_name: "logo.jpg",
    id: 1428,
    inline: true,
    size: 1428,
  },
};






export const listArticleAttachmentsExamplePayload = {
  ...paginationAttributes,
  article_attachments: [
    {
      article_id: 23,
      content_type: "application/jpeg",
      content_url:
        "https://company.zendesk.com/hc/article_attachments/200109629/logo.jpg",
      file_name: "logo.jpg",
      id: 1428,
      inline: true,
      size: 1428,
    },
  ],
};






export const createArticleAttachmentPayload = {
  article_attachment:
    listArticleAttachmentsExamplePayload.article_attachments[0],
};






export const deleteArticleAttachmentPayload = null;










export const createSectionPayload = {
  section: {
    description: "This section contains articles on flight instruments",
    id: 3457836,
    locale: "en-us",
    name: "Avionics",
    position: 2,
  },
};






export const getSectionPayload = createSectionPayload;






export const updateSectionPayload = {
  section: {
    description: "This section contains articles on flight instruments",
    id: 3457836,
    locale: "en-us",
    name: "Avionics",
    position: 2,
  },
};






export const listSectionsExamplePayload = {
  ...paginationAttributes,
  sections: [
    {
      category_id: 888887,
      description: "This section contains articles on flight instruments",
      id: 35467,
      locale: "en-us",
      name: "Avionics",
    },
    {
      category_id: 887285,
      description: "This section contains weather resources for pilots",
      id: 36169,
      locale: "en-us",
      name: "Weather",
    },
  ],
};










export const unifiedSearchPayload = {
  links: {
    first: "https://example.zendesk.com/api/v2/guide/search?page[size]=100",
    last: "https://example.zendesk.com/api/v2/guide/search?page[size]=100&page[after]=lastPageCursorExample",
    prev: "https://example.zendesk.com/api/v2/guide/search?page[size]=100&page[before]=prevPageCursorExample",
    next: "https://example.zendesk.com/api/v2/guide/search?page[size]=100&page[after]=nextPageCursorExample",
  },
  meta: {
    after_cursor: "WzEuMCwxNjld",
    before_cursor: "WzEuMCwxNjhd",
    has_more: true,
  },
  results: [
    {
      title: "How to make fish stew",
      type: "ARTICLE",
      updated_at: "2021-10-11T15:02:22Z",
      url: "http://example.zendesk.com/hc/en-us/articles/38393937-How-to-make-fish-stew",
    },
    {
      title: "Latest updates on fish stew",
      type: "EXTERNAL_RECORD",
      updated_at: "2021-11-12T15:02:22Z",
      url: "http://example.com/blog/fish-stew-latest",
    },
  ],
};






export const searchArticlesPayload = {
  ...paginationAttributes,
  results: [listArticlesPayload.articles[0]],
  count: 1,
  page: 1,
  page_count: 1,
  per_page: 25,
};






export const searchPostsPayload = {
  ...paginationAttributes,
  results: [
    {
      id: 35467,
      title: "How do I open the safe",
      details: "I need to access the safe in the lobby.",
      author_id: 888887,
      topic_id: 10,
      pinned: false,
      featured: false,
      closed: false,
      status: "none",
      created_at: "2024-04-17T17:18:10Z",
      updated_at: "2024-04-17T17:18:10Z",
      url: "https://example.zendesk.com/api/v2/community/posts/35467.json",
      html_url: "https://example.zendesk.com/hc/en-us/community/posts/35467",
      vote_sum: 4,
      vote_count: 5,
      comment_count: 2,
      follower_count: 3,
    },
  ],
  count: 1,
};










export const createCategoryPayload = {
  category: {
    description: "This category contains a collection of Super Hero tricks",
    id: 37486578,
    locale: "en-us",
    name: "Super Hero Tricks",
  },
};






export const getCategoryPayload = createCategoryPayload;






export const updateCategoryPayload = createCategoryPayload;






export const listCategoriesPayload = {
  ...paginationAttributes,
  categories: [
    {
      description: "This category contains a collection of Super Hero tricks",
      id: 37486578,
      locale: "en-us",
      name: "Super Hero Tricks",
    },
    {
      description: "All the cool tricks!",
      id: 354675463,
      locale: "en-us",
      name: "Tips & Tricks",
    },
  ],
};










export const createTopicPayload = {
  topic: {
    name: "How to make fish stew",
    id: 37486578,
    description: "A guide to making the perfect fish stew",
  },
};






export const getTopicPayload = createTopicPayload;






export const listTopicsPayload = {
  ...paginationAttributes,
  topics: [
    {
      html_url:
        "https://example.zendesk.com/hc/en-us/community/topics/10-Using-Help-Center-Tips-Tricks",
      id: 10,
      name: "Using Help Center - Tips & Tricks",
      url: "https://example.zendesk.com/api/v2/community/topics/10.json",
    },
    {
      html_url:
        "https://example.zendesk.com/hc/en-us/community/topics/11-Using-Help-Center-Getting-Started-Guide",
      id: 11,
      name: "Using Help Center - Getting Started Guide",
      url: "https://example.zendesk.com/api/v2/community/topics/11.json",
    },
  ],
};






export const updateTopicPayload = createTopicPayload;










export const createPostPayload = {
  post: {
    author_id: 888887,
    content_tag_ids: [6776, 4545],
    featured: true,
    id: 35467,
    title: "Post title",
  },
};






export const listPostsPayload = {
  ...paginationAttributes,
  posts: [
    {
      id: 35467,
      title: "How do I open the safe",
    },
  ],
};











export const subscriptionPayload = {
  subscription: {
    content_id: 8748733,
    id: 35467,
    locale: "en",
    user_id: 888887,
  },
};







export const paginatedSubscriptionPayload = {
  ...paginationAttributes,
  subscriptions: [subscriptionPayload.subscription],
};










export const createWebhookPayload = {
  webhook: {
    id: "01GK8E6BKWMJZD2T8Y5AXJQMG5",
    name: "Test from Acme",
    status: "active",
    subscriptions: ["conditional_ticket_events"],
    created_at: "2022-12-02T03:31:00Z",
    created_by: "7272236579355",
    endpoint: "https://hooks.example.com/trigger/EXAMPLE",
    http_method: "POST",
    request_format: "json",
  },
};






export const listWebhooksPayload = [createWebhookPayload.webhook];






export const deleteWebhookPayload = null;










export const createWebhookTriggerPayload = {
  trigger: {
    url: "https://example.zendesk.com/api/v2/triggers/10849292971419.json",
    id: 10849292971419,
    title: "Trigger for 01GK8E6BKWMJZD2TEXAMPLE",
    active: true,
    updated_at: "2022-12-02T03:36:44Z",
    created_at: "2022-12-02T03:36:44Z",
    default: false,
    actions: [
      {
        field: "notification_webhook",
        value: [
          "01GK8E6BKWMJZD2TEXAMPLE",
          '{"current_user": "{{current_user.details}}"}',
        ],
      },
    ],
    conditions: {
      all: [],
      any: [
        { field: "status", operator: "changed", value: null },
        { field: "status", operator: "not_changed", value: null },
      ],
    },
    description: null,
    position: 10,
    raw_title: "01GK8E6BKWMJZD2TEXAMPLE",
    category_id: "4558610559259",
  },
};






export const listTriggersPayload = [createWebhookTriggerPayload.trigger];










export const successMessagePayload = "Success executing action";








export const rawRequestPayload = {
  data: {
    users: listUsersPayload,
    next_page: null,
    previous_page: null,
    count: listUsersPayload.length,
  },
  status: 200,
  statusText: "OK",
  headers: {
    "content-type": "application/json",
  },
};













export const webhookExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Zendesk Webhook",
      "X-Zendesk-Webhook-Id": "01GK8E6BKWMJZD2T8Y5AXJQMG5",
      "X-Zendesk-Webhook-Signature":
        "wxL5Lkx5pktp+TKZyXluPgN3pSKWX2eaP1zhMfh+J6c=",
      "X-Zendesk-Webhook-Signature-Timestamp": "2024-04-17T17:18:10Z",
    },
    queryParameters: {},
    rawBody: {
      data: JSON.stringify({
        type: "zen:event-type:ticket.created",
        account_id: 88888888,
        id: "01HNXXXX-CTEXAMPLE",
        time: "2024-04-17T17:18:10Z",
        zendesk_event_version: "2022-11-06",
        subject: "zen:ticket:35436",
        detail: {
          id: "35436",
          status: "Open",
          via: { channel: "web" },
          created_at: "2024-04-17T17:18:10Z",
          updated_at: "2024-04-17T17:18:10Z",
        },
        event: {
          current: { status: "Open" },
        },
      }),
      contentType: "application/json",
    },
    body: {
      data: {
        type: "zen:event-type:ticket.created",
        account_id: 88888888,
        id: "01HNXXXX-CTEXAMPLE",
        time: "2024-04-17T17:18:10Z",
        zendesk_event_version: "2022-11-06",
        subject: "zen:ticket:35436",
        detail: {
          id: "35436",
          status: "Open",
          via: { channel: "web" },
          created_at: "2024-04-17T17:18:10Z",
          updated_at: "2024-04-17T17:18:10Z",
        },
        event: {
          current: { status: "Open" },
        },
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Webhook Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
};










export const pollChangesTriggerExamplePayload = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        created: [
          {
            ...listTicketsPayload[0],
            id: 35437,
            subject: "New ticket received",
            status: "new",
            created_at: "2026-05-20T14:00:00Z",
            updated_at: "2026-05-20T14:00:00Z",
          },
        ],
        updated: [
          {
            ...listTicketsPayload[0],
            id: 35436,
            status: "open",
            created_at: "2009-07-20T22:55:29Z",
            updated_at: "2026-05-20T15:00:00Z",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Polling Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Polling Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  polledNoChanges: false,
};
