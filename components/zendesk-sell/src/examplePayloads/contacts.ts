






const contactData = {
  id: 47912050,
  creator_id: 1290481,
  owner_id: 1290481,
  is_organization: false,
  contact_id: 47912048,
  parent_organization_id: null,
  name: "Mark Johnson",
  first_name: "Mark",
  last_name: "Johnson",
  customer_status: "current",
  prospect_status: "none",
  title: "VP of Sales",
  description: "Key decision maker for Q4 renewals",
  industry: "Technology",
  website: "https://www.acmecorp.io",
  email: "mark.johnson@acmecorp.io",
  phone: "+1-415-555-0198",
  mobile: "+1-415-555-0199",
  fax: "+1-415-555-0200",
  twitter: "markjohnson",
  facebook: "mark.johnson.sales",
  linkedin: "markjohnson-vpsales",
  skype: "mark.johnson.acme",
  address: {
    line1: "2726 Smith St",
    city: "Hainesville",
    postal_code: "60030",
    state: "IL",
    country: "US",
  },
  billing_address: {
    line1: "2726 Smith St",
    city: "Hainesville",
    postal_code: "60030",
    state: "IL",
    country: "US",
  },
  shipping_address: {
    line1: "2726 Smith St",
    city: "Hainesville",
    postal_code: "60030",
    state: "IL",
    country: "US",
  },
  tags: ["enterprise", "priority"],
  custom_fields: {
    referred_by: "Partner Channel",
  },
  created_at: "2024-08-15T09:32:17Z",
  updated_at: "2025-01-10T14:05:42Z",
};


export const createContactExamplePayload = {
  data: {
    data: contactData,
    meta: {
      type: "contact",
    },
  },
};


export const getContactExamplePayload = {
  data: {
    data: contactData,
    meta: {
      type: "contact",
    },
  },
};


export const updateContactExamplePayload = {
  data: {
    data: contactData,
    meta: {
      type: "contact",
    },
  },
};


export const upsertContactExamplePayload = {
  data: {
    data: contactData,
    meta: {
      type: "contact",
    },
  },
};


export const listContactsExamplePayload = {
  data: {
    items: [
      {
        data: contactData,
        meta: {
          type: "contact",
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {
        self: "https://api.getbase.com/v2/contacts?page=1&per_page=25",
        first_page: "https://api.getbase.com/v2/contacts?page=1&per_page=25",
        next_page: null,
      },
    },
  },
};


export const deleteContactExamplePayload = {
  data: null,
};










export const getContactsStreamExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 47912050,
        },
        meta: {
          type: "contact",
          sync: {
            event_type: "updated",
            ack_key: "Contact-47912050-1",
            revision: 3,
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
