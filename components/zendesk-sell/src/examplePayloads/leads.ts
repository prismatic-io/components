






const leadData = {
  id: 3194720,
  creator_id: 1290481,
  owner_id: 1290481,
  first_name: "Sarah",
  last_name: "Williams",
  organization_name: "TechStart Solutions",
  status: "New",
  source_id: 2940175,
  unqualified_reason_id: null,
  title: "Director of Operations",
  description: "Inbound lead from webinar signup",
  industry: "Software",
  website: "https://www.techstartsolutions.com",
  email: "sarah.williams@techstartsolutions.com",
  phone: "+1-650-555-0142",
  mobile: "+1-650-555-0143",
  fax: null,
  twitter: "sarahwilliams_ops",
  facebook: null,
  linkedin: "sarahwilliams-ops",
  skype: null,
  address: {
    line1: "480 Mission St",
    city: "San Francisco",
    postal_code: "94105",
    state: "CA",
    country: "US",
  },
  tags: ["webinar", "inbound"],
  custom_fields: {
    lead_score: "85",
  },
  created_at: "2025-01-05T13:22:10Z",
  updated_at: "2025-01-09T09:45:33Z",
};


export const createLeadExamplePayload = {
  data: {
    data: leadData,
    meta: {
      type: "lead",
    },
  },
};


export const getLeadExamplePayload = {
  data: {
    data: leadData,
    meta: {
      type: "lead",
    },
  },
};


export const updateLeadExamplePayload = {
  data: {
    data: leadData,
    meta: {
      type: "lead",
    },
  },
};


export const upsertLeadExamplePayload = {
  data: {
    data: leadData,
    meta: {
      type: "lead",
    },
  },
};


export const listLeadsExamplePayload = {
  data: {
    items: [
      {
        data: leadData,
        meta: {
          type: "lead",
        },
      },
    ],
    meta: {
      type: "collection",
      count: 1,
      links: {
        self: "https://api.getbase.com/v2/leads?page=1&per_page=25",
        first_page: "https://api.getbase.com/v2/leads?page=1&per_page=25",
        next_page: null,
      },
    },
  },
};


export const deleteLeadExamplePayload = {
  data: null,
};







export const getLeadsStreamExamplePayload = {
  data: {
    items: [
      {
        data: {
          id: 3194720,
        },
        meta: {
          type: "lead",
          sync: {
            event_type: "updated",
            ack_key: "Lead-3194720-1",
            revision: 2,
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
