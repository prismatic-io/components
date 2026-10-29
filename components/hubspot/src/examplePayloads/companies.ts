import { BASE_URL } from "../constants";

export const listCompaniesExamplePayload = {
  data: {
    results: [
      {
        id: "98765432101",
        properties: {
          createdate: "2024-01-10T10:36:45.123Z",
          domain: "acmecorp.com",
          hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
          hs_object_id: "98765432101",
          name: "Acme Corporation",
          industry: "Technology",
          city: "San Francisco",
          state: "California",
          country: "United States",
        },
        createdAt: "2024-01-10T10:36:45.123Z",
        updatedAt: "2024-01-15T14:22:10.456Z",
        archived: false,
      },
    ],
    paging: {
      next: {
        after: "98765432102",
        link: `${BASE_URL}/crm/objects/2026-09/companies?limit=10&after=98765432102`,
      },
    },
  },
};

export const getCompanyExamplePayload = {
  data: {
    id: "98765432101",
    properties: {
      createdate: "2024-01-10T10:36:45.123Z",
      domain: "acmecorp.com",
      hs_lastmodifieddate: "2024-01-15T14:22:10.456Z",
      hs_object_id: "98765432101",
      name: "Acme Corporation",
      industry: "Technology",
      city: "San Francisco",
      state: "California",
      country: "United States",
    },
    createdAt: "2024-01-10T10:36:45.123Z",
    updatedAt: "2024-01-15T14:22:10.456Z",
    archived: false,
  },
};

export const deleteCompanyExamplePayload = { data: "" };

export const createCompanyExamplePayload = {
  data: {
    createdAt: "2024-01-15T00:06:42.321Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      name: [
        {
          sourceId: "CRM_UI",
          sourceType: "CRM_UI",
          sourceLabel: "CRM UI",
          updatedByUserId: 45678,
          value: "TechStart Industries",
          timestamp: "2024-01-15T00:06:42.321Z",
        },
      ],
      domain: [
        {
          sourceId: "CRM_UI",
          sourceType: "CRM_UI",
          sourceLabel: "CRM UI",
          updatedByUserId: 45678,
          value: "techstart.com",
          timestamp: "2024-01-15T00:06:42.321Z",
        },
      ],
    },
    id: "98765432103",
    properties: {
      name: "TechStart Industries",
      domain: "techstart.com",
      industry: "Software Development",
      city: "Austin",
      state: "Texas",
      country: "United States",
      phone: "5125551234",
      numberofemployees: "50",
      annualrevenue: "5000000",
    },
    updatedAt: "2024-01-15T00:06:42.321Z",
  },
};

export const updateCompanyExamplePayload = {
  data: {
    createdAt: "2024-01-15T00:06:42.336Z",
    archived: false,
    archivedAt: null,
    propertiesWithHistory: {
      name: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "TechStart Industries Inc.",
          timestamp: "2024-01-16T10:15:30.120Z",
        },
      ],
      numberofemployees: [
        {
          sourceId: "API",
          sourceType: "API",
          sourceLabel: "API",
          updatedByUserId: 0,
          value: "75",
          timestamp: "2024-01-16T10:15:30.120Z",
        },
      ],
    },
    id: "98765432103",
    properties: {
      name: "TechStart Industries Inc.",
      domain: "techstart.com",
      industry: "Software Development",
      city: "Austin",
      state: "Texas",
      country: "United States",
      phone: "5125551234",
      numberofemployees: "75",
      annualrevenue: "5000000",
    },
    updatedAt: "2024-01-16T10:15:30.120Z",
  },
};
