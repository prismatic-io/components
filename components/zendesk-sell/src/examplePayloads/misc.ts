











export const listAccountDetailsExamplePayload = {
  data: {
    data: {
      id: 1482750,
      name: "Acme Corp Sales",
      currency: "USD",
      time_format: "12H",
      timezone: "UTC-06:00",
      phone: "+1-312-555-0100",
      subdomain: "acme-sales",
      created_at: "2023-01-10T08:00:00Z",
      updated_at: "2025-01-05T12:30:00Z",
    },
    meta: {
      type: "account",
    },
  },
};






export const listCustomFieldsExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 8471520,
          name: "Referred By",
          type: "string",
          choices: null,
          for_company: true,
          for_contact: true,
          created_at: "2024-03-15T09:00:00Z",
          updated_at: "2024-03-15T09:00:00Z",
        },
        meta: {
          type: "custom_field",
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {
        self: "https://api.getbase.com/v2/contact/custom_fields?page=1&per_page=25",
        first_page:
          "https://api.getbase.com/v2/contact/custom_fields?page=1&per_page=25",
        next_page: null,
      },
    },
  },
};




export const rawRequestExamplePayload = {
  data: {
    data: {},
    meta: {
      type: "unknown",
    },
  },
};







export const getStreamExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 12345678,
        },
        meta: {
          type: "resource",
          sync: {
            event_type: "updated",
            ack_key: "Resource-12345678-1",
            revision: 1,
          },
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {},
    },
  },
};







export const getCustomFieldsStreamExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 8471520,
        },
        meta: {
          type: "custom_field",
          sync: {
            event_type: "updated",
            ack_key: "CustomField-8471520-1",
            revision: 1,
          },
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {},
    },
  },
};







export const getProductsStreamExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 7391024,
        },
        meta: {
          type: "product",
          sync: {
            event_type: "created",
            ack_key: "Product-7391024-1",
            revision: 1,
          },
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {},
    },
  },
};
