




import type {
  CreateTicketMessageResponse,
  GetTicketMessageResponse,
  ListMessagesResponse,
} from "../interfaces/ticketMessages";

export const createTicketMessageExamplePayload: {
  data: CreateTicketMessageResponse;
} = {
  data: {
    id: 3001,
    attachments: [
      {
        url: "https://www.example.com/attachments/document.pdf",
        name: "Document.pdf",
        size: 1200,
        content_type: "application/pdf",
        public: true,
        extra: "Confidential Document",
      },
      {
        url: "https://www.example.com/attachments/image.png",
        name: "Image.png",
        size: 800,
        content_type: "image/png",
        public: false,
        extra: "Screenshot",
      },
    ],
    body_html: "<p>Hello, please find the details attached.</p>",
    body_text: "Hello, please find the details attached.",
    channel: "Email",
    created_datetime: "2024-08-20T12:30:00Z",
    external_id: null,
    failed_datetime: null,
    from_agent: false,
    integration_id: 200,
    last_sending_error: null,
    message_id: "MSG123456789",
    receiver: {
      id: 5002,
      email: "receiver@example.com",
      name: "John Doe",
      firstname: "John",
      lastname: "Doe",
      meta: null,
    },
    rule_id: 101,
    sender: {
      id: 5001,
      email: "sender@example.com",
      name: "Jane Smith",
      firstname: "Jane",
      lastname: "Smith",
      meta: null,
    },
    sent_datetime: "2024-08-20T12:35:00Z",
    source: {
      type: "email",
      to: [{ name: "John Doe", address: "john.doe@example.com" }],
      cc: [{ name: "Sarah Connor", address: "sarah.connor@example.com" }],
      bcc: [],
      from: {
        name: "Jane Smith",
        address: "jane.smith@example.com",
      },
    },
    stripped_html: "<p>Hello, please find the details attached.</p>",
    stripped_text: "Hello, please find the details attached.",
    subject: "Details for Your Request",
    ticket_id: 4003,
    via: "support_portal",
    uri: "https://www.example.com/tickets/4003",
  },
};

export const getTicketMessageExamplePayload: {
  data: GetTicketMessageResponse;
} = {
  data: {
    id: 3005,
    attachments: [
      {
        url: "https://www.example.com/attachments/report.pdf",
        name: "AnnualReport.pdf",
        size: 2500,
        content_type: "application/pdf",
        public: true,
        extra: "Annual financial report",
      },
      {
        url: "https://www.example.com/attachments/photo.jpeg",
        name: "EventPhoto.jpeg",
        size: 1500,
        content_type: "image/jpeg",
        public: false,
        extra: "Photo from the company event",
      },
    ],
    body_html: "<p>Here is the information you requested.</p>",
    body_text: "Here is the information you requested.",
    channel: "Email",
    created_datetime: "2024-08-20T15:00:00Z",
    external_id: "EXT123456",
    failed_datetime: null,
    from_agent: true,
    integration_id: 123,
    last_sending_error: null,
    message_id: "MSG000456",
    receiver: {
      id: 2020,
      email: "customer@example.com",
      name: "Sam Doe",
      firstname: "Sam",
      lastname: "Doe",
      meta: null,
    },
    rule_id: 105,
    sender: {
      id: 1010,
      email: "support@company.com",
      name: "Support Team",
      firstname: "Support",
      lastname: "Team",
      meta: null,
    },
    sent_datetime: "2024-08-20T15:05:00Z",
    source: {
      type: "email",
      to: [{ name: "Sam Doe", address: "sam.doe@example.com" }],
      cc: [],
      bcc: [],
      from: {
        name: "Support Team",
        address: "support@company.com",
      },
    },
    stripped_html: "<p>Here is the information you requested.</p>",
    stripped_text: "Here is the information you requested.",
    subject: "Your Requested Information",
    ticket_id: 4005,
    via: "email",
    uri: "https://www.example.com/tickets/4005",
  },
};

export const listMessagesExamplePayload: { data: ListMessagesResponse } = {
  data: {
    data: [getTicketMessageExamplePayload.data],
    object: "list",
    uri: "/messages",
    meta: {
      prev_cursor: null,
      next_cursor: null,
    },
  },
};
