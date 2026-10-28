import { BASE_URL } from "../constants";
export const listContactsExamplePayload = {
  data: {
    results: [
      {
        id: "65059681027",
        properties: {
          createdate: "2024-01-10T08:30:15.234Z",
          email: "john.doe@example.com",
          firstname: "John",
          hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
          lastname: "Doe",
          hs_object_id: "65059681027",
          phone: "5551234567",
          company: "Acme Corporation",
          jobtitle: "Sales Manager",
        },
        createdAt: "2024-01-10T08:30:15.234Z",
        updatedAt: "2024-01-15T14:22:10.456Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "65059681028",
        link: `${BASE_URL}/crm/objects/2026-09/contacts?limit=10&after=65059681028`,
      },
    },
  },
};
export const getContactExamplePayload = {
  data: {
    id: "65059681027",
    properties: {
      createdate: "2024-01-10T08:30:15.234Z",
      email: "john.doe@example.com",
      firstname: "John",
      lastname: "Doe",
      hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
      hs_object_id: "65059681027",
      phone: "5551234567",
      company: "Acme Corporation",
      jobtitle: "Sales Manager",
    },
    createdAt: "2024-01-10T08:30:15.234Z",
    updatedAt: "2024-01-15T14:22:10.456Z",
    archived: false,
  },
};
export const deleteContactExamplePayload = { data: "" };
export const createContactExamplePayload = {
  data: {
    createdAt: "2024-01-15T00:20:24.825Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      email: [
        {
          sourceId: "CRM_UI",
          sourceType: "CRM_UI",
          sourceLabel: "CRM UI",
          updatedByUserId: 45678,
          value: "jane.smith@example.com",
          timestamp: "2024-01-15T00:20:24.825Z",
        },
      ],
      firstname: [
        {
          sourceId: "CRM_UI",
          sourceType: "CRM_UI",
          sourceLabel: "CRM UI",
          updatedByUserId: 45678,
          value: "Jane",
          timestamp: "2024-01-15T00:20:24.825Z",
        },
      ],
      lastname: [
        {
          sourceId: "CRM_UI",
          sourceType: "CRM_UI",
          sourceLabel: "CRM UI",
          updatedByUserId: 45678,
          value: "Smith",
          timestamp: "2024-01-15T00:20:24.825Z",
        },
      ],
    },
    id: "65059681029",
    properties: {
      email: "jane.smith@example.com",
      firstname: "Jane",
      lastname: "Smith",
      phone: "5559876543",
      company: "TechStart Industries",
      jobtitle: "Marketing Director",
      lifecyclestage: "lead",
    },
    updatedAt: "2024-01-15T00:20:24.825Z",
  },
};
export const updateContactExamplePayload = {
  data: {
    createdAt: "2024-01-15T00:20:24.840Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      jobtitle: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "VP of Marketing",
          timestamp: "2024-01-16T09:30:15.234Z",
        },
      ],
      phone: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "5559876544",
          timestamp: "2024-01-16T09:30:15.234Z",
        },
      ],
    },
    id: "65059681029",
    properties: {
      email: "jane.smith@example.com",
      firstname: "Jane",
      lastname: "Smith",
      phone: "5559876544",
      company: "TechStart Industries",
      jobtitle: "VP of Marketing",
      lifecyclestage: "opportunity",
    },
    updatedAt: "2024-01-16T09:30:15.234Z",
  },
};
export const archiveBatchContactsExamplePayload = { data: "" };
export const createBatchContactsExamplePayload = {
  data: {
    completedAt: "2024-01-15T08:27:09.446Z",
    requestedAt: "2024-01-15T08:27:09.120Z",
    startedAt: "2024-01-15T08:27:09.150Z",
    links: {},
    results: [
      {
        createdAt: "2024-01-15T08:27:09.446Z",
        archived: false,
        archivedAt: null,
        propertiesWithHistory: {
          email: [
            {
              sourceId: "API",
              sourceType: "API",
              sourceLabel: "API",
              updatedByUserId: 0,
              value: "alice.johnson@example.com",
              timestamp: "2024-01-15T08:27:09.446Z",
            },
          ],
        },
        id: "65059681030",
        properties: {
          email: "alice.johnson@example.com",
          firstname: "Alice",
          lastname: "Johnson",
          company: "Innovation Labs",
          jobtitle: "Product Manager",
        },
        updatedAt: "2024-01-15T08:27:09.446Z",
      },
    ],
    status: "COMPLETE",
  },
};
export const getBatchContactsExamplePayload = {
  data: {
    completedAt: "2024-01-15T08:27:09.454Z",
    requestedAt: "2024-01-15T08:27:09.120Z",
    startedAt: "2024-01-15T08:27:09.150Z",
    links: {},
    results: [
      {
        createdAt: "2024-01-15T08:27:09.454Z",
        archived: false,
        archivedAt: null,
        propertiesWithHistory: {
          email: [
            {
              sourceId: "CRM_UI",
              sourceType: "CRM_UI",
              sourceLabel: "CRM UI",
              updatedByUserId: 45678,
              value: "bob.wilson@example.com",
              timestamp: "2024-01-15T08:27:09.454Z",
            },
          ],
        },
        id: "65059681031",
        properties: {
          email: "bob.wilson@example.com",
          firstname: "Bob",
          lastname: "Wilson",
          company: "Global Enterprises",
          jobtitle: "CTO",
        },
        updatedAt: "2024-01-15T08:27:09.454Z",
      },
    ],
    status: "COMPLETE",
  },
};
export const updateBatchContactsExamplePayload = {
  data: {
    completedAt: "2024-01-15T08:27:09.462Z",
    requestedAt: "2024-01-15T08:27:09.120Z",
    startedAt: "2024-01-15T08:27:09.150Z",
    links: {},
    results: [
      {
        createdAt: "2024-01-15T08:27:09.462Z",
        archived: false,
        archivedAt: null,
        propertiesWithHistory: {
          lifecyclestage: [
            {
              sourceId: "API",
              sourceType: "API",
              sourceLabel: "API",
              updatedByUserId: 0,
              value: "customer",
              timestamp: "2024-01-16T10:30:22.150Z",
            },
          ],
        },
        id: "65059681030",
        properties: {
          email: "alice.johnson@example.com",
          firstname: "Alice",
          lastname: "Johnson",
          company: "Innovation Labs",
          jobtitle: "Product Manager",
          lifecyclestage: "customer",
        },
        updatedAt: "2024-01-16T10:30:22.150Z",
      },
    ],
    status: "COMPLETE",
  },
};
