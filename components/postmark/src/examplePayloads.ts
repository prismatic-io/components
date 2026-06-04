









export const sendSingleEmailExamplePayload = {
  data: {
    ErrorCode: 0,
    Message: "OK",
    MessageID: "b7bc2f4a-e38e-4336-af7d-e6c392c2f817",
    SubmittedAt: "2024-01-15T12:01:05.1794748-05:00",
    To: "john.doe@example.com",
  },
};



export const sendEmailWithTemplateExamplePayload = {
  data: {
    ErrorCode: 0,
    Message: "OK",
    MessageID: "c8cd3g5b-f49f-574e-bg8e-af7d392c3g28",
    SubmittedAt: "2024-01-15T12:05:22.3847291-05:00",
    To: "jane.smith@example.com",
  },
};



export const sendBatchEmailExamplePayload = {
  data: [
    {
      ErrorCode: 0,
      Message: "OK",
      MessageID: "b7bc2f4a-e38e-4336-af7d-e6c392c2f817",
      SubmittedAt: "2024-01-15T12:01:05.1794748-05:00",
      To: "receiver1@example.com",
    },
    {
      ErrorCode: 0,
      Message: "OK",
      MessageID: "e2ecbbfc-fe12-463d-b933-9fe22915106d",
      SubmittedAt: "2024-01-15T12:01:05.1794748-05:00",
      To: "receiver2@example.com",
    },
  ],
};



export const sendBatchEmailWithTemplateExamplePayload = {
  data: [
    {
      ErrorCode: 0,
      Message: "OK",
      MessageID: "d4fe6h8j-k71m-685n-ch9p-bg8e492d4h39",
      SubmittedAt: "2024-01-15T12:10:33.5912384-05:00",
      To: "subscriber1@example.com",
    },
    {
      ErrorCode: 0,
      Message: "OK",
      MessageID: "a2bd5g7i-j60l-574m-bg8n-af7d381c3g27",
      SubmittedAt: "2024-01-15T12:10:33.5912384-05:00",
      To: "subscriber2@example.com",
    },
  ],
};







export const getServerExamplePayload = {
  data: {
    ID: 1234567,
    Name: "Production Mail Server",
    ApiTokens: ["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"],
    Color: "blue",
    SmtpApiActivated: true,
    RawEmailEnabled: false,
    DeliveryType: "Live",
    ServerLink: "https://postmarkapp.com/servers/1234567/streams",
    InboundAddress: "a1b2c3d4e5f6@inbound.postmarkapp.com",
    InboundHookUrl: "https://example.com/webhooks/inbound",
    BounceHookUrl: "https://example.com/webhooks/bounce",
    OpenHookUrl: "https://example.com/webhooks/open",
    DeliveryHookUrl: "https://example.com/webhooks/delivery",
    PostFirstOpenOnly: false,
    InboundDomain: "",
    InboundHash: "a1b2c3d4e5f6",
    InboundSpamThreshold: 5,
    TrackOpens: true,
    TrackLinks: "HtmlAndText",
    IncludeBounceContentInHook: true,
    ClickHookUrl: "https://example.com/webhooks/click",
    EnableSmtpApiErrorHooks: false,
  },
};



export const createServerExamplePayload = {
  data: {
    ID: 1234568,
    Name: "New Staging Server",
    ApiTokens: ["yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"],
    Color: "green",
    SmtpApiActivated: true,
    RawEmailEnabled: false,
    DeliveryType: "Live",
    ServerLink: "https://postmarkapp.com/servers/1234568/streams",
    InboundAddress: "b2c3d4e5f6g7@inbound.postmarkapp.com",
    InboundHookUrl: null,
    BounceHookUrl: null,
    OpenHookUrl: null,
    DeliveryHookUrl: null,
    PostFirstOpenOnly: false,
    InboundDomain: "",
    InboundHash: "b2c3d4e5f6g7",
    InboundSpamThreshold: 0,
    TrackOpens: false,
    TrackLinks: "None",
    IncludeBounceContentInHook: false,
    ClickHookUrl: null,
    EnableSmtpApiErrorHooks: false,
  },
};


export const editServerExamplePayload = {
  data: {
    ...getServerExamplePayload.data,
    Name: "Production Mail Server - Updated",
    Color: "purple",
  },
};



export const deleteServerExamplePayload = {
  data: {
    ErrorCode: 0,
    Message: "Server Production Mail Server removed.",
  },
};



export const listServersExamplePayload = {
  data: [
    {
      ID: 1234567,
      Name: "Production Mail Server",
      ApiTokens: ["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"],
      Color: "blue",
      SmtpApiActivated: true,
      RawEmailEnabled: false,
      DeliveryType: "Live",
      ServerLink: "https://postmarkapp.com/servers/1234567/streams",
      InboundAddress: "a1b2c3d4e5f6@inbound.postmarkapp.com",
      InboundHookUrl: "https://example.com/webhooks/inbound",
      BounceHookUrl: "https://example.com/webhooks/bounce",
      OpenHookUrl: "https://example.com/webhooks/open",
      DeliveryHookUrl: "https://example.com/webhooks/delivery",
      PostFirstOpenOnly: false,
      InboundDomain: "",
      InboundHash: "a1b2c3d4e5f6",
      InboundSpamThreshold: 5,
      TrackOpens: true,
      TrackLinks: "HtmlAndText",
      IncludeBounceContentInHook: true,
      ClickHookUrl: "https://example.com/webhooks/click",
      EnableSmtpApiErrorHooks: false,
    },
    {
      ID: 1234568,
      Name: "Staging Test Server",
      ApiTokens: ["yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"],
      Color: "green",
      SmtpApiActivated: true,
      RawEmailEnabled: false,
      DeliveryType: "Live",
      ServerLink: "https://postmarkapp.com/servers/1234568/streams",
      InboundAddress: "b2c3d4e5f6g7@inbound.postmarkapp.com",
      InboundHookUrl: null,
      BounceHookUrl: null,
      OpenHookUrl: null,
      DeliveryHookUrl: null,
      PostFirstOpenOnly: false,
      InboundDomain: "",
      InboundHash: "b2c3d4e5f6g7",
      InboundSpamThreshold: 0,
      TrackOpens: false,
      TrackLinks: "None",
      IncludeBounceContentInHook: false,
      ClickHookUrl: null,
      EnableSmtpApiErrorHooks: false,
    },
  ],
};


export const getServersExamplePayload = getServerExamplePayload;


export const editServersExamplePayload = editServerExamplePayload;







export const getWebhookExamplePayload = {
  data: {
    ID: 9876543,
    Url: "https://example.com/webhooks/postmark",
    MessageStream: "outbound",
    HttpAuth: {
      Username: "webhook_user",
      Password: "webhook_password",
    },
    HttpHeaders: [
      {
        Name: "X-Custom-Header",
        Value: "custom-value",
      },
    ],
    Triggers: {
      Open: {
        Enabled: true,
        PostFirstOpenOnly: false,
      },
      Click: {
        Enabled: true,
      },
      Delivery: {
        Enabled: true,
      },
      Bounce: {
        Enabled: true,
        IncludeContent: true,
      },
      SpamComplaint: {
        Enabled: true,
        IncludeContent: false,
      },
      SubscriptionChange: {
        Enabled: false,
      },
    },
  },
};



export const createWebhookExamplePayload = {
  data: {
    ID: 9876544,
    Url: "https://example.com/webhooks/postmark-new",
    MessageStream: "outbound",
    HttpAuth: {
      Username: null,
      Password: null,
    },
    HttpHeaders: [],
    Triggers: {
      Open: {
        Enabled: true,
        PostFirstOpenOnly: false,
      },
      Click: {
        Enabled: false,
      },
      Delivery: {
        Enabled: true,
      },
      Bounce: {
        Enabled: true,
        IncludeContent: false,
      },
      SpamComplaint: {
        Enabled: false,
        IncludeContent: false,
      },
      SubscriptionChange: {
        Enabled: false,
      },
    },
  },
};



export const editWebhookExamplePayload = {
  data: {
    ...getWebhookExamplePayload.data,
    Url: "https://example.com/webhooks/postmark-updated",
    Triggers: {
      ...getWebhookExamplePayload.data.Triggers,
      Click: {
        Enabled: true,
      },
    },
  },
};



export const deleteWebhookExamplePayload = {
  data: {
    ErrorCode: 0,
    Message: "Webhook 9876543 removed",
  },
};



export const listWebhooksExamplePayload = {
  data: {
    Webhooks: [
      {
        ID: 9876543,
        Url: "https://example.com/webhooks/postmark",
        MessageStream: "outbound",
        HttpAuth: {
          Username: "webhook_user",
          Password: "webhook_password",
        },
        HttpHeaders: [
          {
            Name: "X-Custom-Header",
            Value: "custom-value",
          },
        ],
        Triggers: {
          Open: {
            Enabled: true,
            PostFirstOpenOnly: false,
          },
          Click: {
            Enabled: true,
          },
          Delivery: {
            Enabled: true,
          },
          Bounce: {
            Enabled: true,
            IncludeContent: true,
          },
          SpamComplaint: {
            Enabled: true,
            IncludeContent: false,
          },
          SubscriptionChange: {
            Enabled: false,
          },
        },
      },
      {
        ID: 9876544,
        Url: "https://example.com/webhooks/postmark-backup",
        MessageStream: "outbound",
        HttpAuth: {
          Username: null,
          Password: null,
        },
        HttpHeaders: [],
        Triggers: {
          Open: {
            Enabled: false,
            PostFirstOpenOnly: false,
          },
          Click: {
            Enabled: false,
          },
          Delivery: {
            Enabled: true,
          },
          Bounce: {
            Enabled: true,
            IncludeContent: false,
          },
          SpamComplaint: {
            Enabled: false,
            IncludeContent: false,
          },
          SubscriptionChange: {
            Enabled: false,
          },
        },
      },
    ],
  },
};


export const deleteInstancedWebhooksExamplePayload = {
  data: {
    message: "All listed webhooks deleted successfully.",
  },
};
