import type { TriggerBaseResult, TriggerPayload } from "@prismatic-io/spectral";

export const createCustomerExamplePayload = {
  data: {
    data: {
      recordType: "customer",
      id: "12345",
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/customer/12345",
    } as Record<string, string>,
  },
};

export const getCustomerExamplePayload = {
  data: {
    data: {
      id: "12345",
      entityid: "CUST-001",
      companyname: "Acme Corporation",
      subsidiary: { id: "1", refName: "Parent Company" },
      email: "contact@acmecorp.example.com",
      phone: "555-0123",
      isperson: false,
      salesRep: { id: "1047", refName: "John Sales" },
      terms: { id: "5", refName: "Net 30" },
      custentity_customer_type: { id: "3", refName: "Enterprise" },
      billaddress: {
        addr1: "123 Main Street",
        addr2: "Suite 400",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "US",
      },
      shipaddress: {
        addr1: "123 Main Street",
        addr2: "Suite 400",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "US",
      },
      datecreated: "2024-10-20T15:30:00Z",
      lastmodified: "2024-10-20T15:30:00Z",
      recordType: "customer",
      links: [
        {
          rel: "self",
          href: "/services/rest/record/v1/customer/12345",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};

export const updateCustomerExamplePayload = {
  data: {
    data: {
      recordType: "customer",
      id: "12345",
    },
    headers: {
      "content-type": "application/json",
      location: "/services/rest/record/v1/customer/12345",
    } as Record<string, string>,
  },
};

export const listCustomersExamplePayload = {
  data: {
    data: {
      count: 2,
      offset: 0,
      hasMore: true,
      totalResults: 4,
      items: [
        {
          id: "12345",
          entityid: "CUST-001",
          companyname: "Acme Corporation",
          email: "contact@acmecorp.example.com",
          subsidiary: { id: "1", refName: "Parent Company" },
          links: [
            {
              rel: "self",
              href: "/services/rest/record/v1/customer/12345",
            },
          ],
        },
        {
          id: "12346",
          entityid: "CUST-002",
          companyname: "Global Industries Ltd",
          email: "contact@globalindustries.example.com",
          subsidiary: { id: "1", refName: "Parent Company" },
          links: [
            {
              rel: "self",
              href: "/services/rest/record/v1/customer/12346",
            },
          ],
        },
      ],
      links: [
        {
          rel: "next",
          href: "/services/rest/record/v1/customer?limit=2&offset=2",
        },
      ],
    },
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};

export const deleteCustomerExamplePayload = {
  data: {
    data: "",
    headers: {
      "content-type": "application/json",
    } as Record<string, string>,
  },
};

const metadataCatalogItem = (name: string) => ({
  name,
  links: [
    {
      rel: "canonical",
      href: `https://1234567.suitetalk.api.netsuite.com/services/rest/record/v1/metadata-catalog/${name}`,
      mediaType: "application/json",
    },
  ],
});

export const metadataCatalogExamplePayload = {
  items: [
    metadataCatalogItem("salesOrder"),
    metadataCatalogItem("customer"),
    metadataCatalogItem("customrecord_milestone"),
    metadataCatalogItem("account"),
  ],
};

export const selectRecordTypeExamplePayload = {
  result: [
    { key: "account", label: "account" },
    { key: "customer", label: "customer" },
    { key: "customrecord_milestone", label: "customrecord_milestone" },
    { key: "salesOrder", label: "salesOrder" },
  ],
};

export const selectRecordExamplePayload = {
  result: [
    { key: "12345", label: "contact@acmecorp.example.com" },
    { key: "12346", label: "contact@globalindustries.example.com" },
  ],
};

export const pollRecordsExamplePayload: TriggerBaseResult<TriggerPayload> = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: "" },
    body: {
      data: {
        createdRecords: [
          {
            id: "12345",
            entityid: "CUST-001",
            companyname: "Acme Corporation",
            email: "contact@acmecorp.example.com",
            subsidiary: { id: "1", refName: "Parent Company" },
            datecreated: "2024-10-20T15:30:00Z",
            lastmodifieddate: "2024-10-20T15:30:00Z",
          },
        ],
        updatedRecords: [
          {
            id: "12346",
            entityid: "CUST-002",
            companyname: "Global Industries Ltd",
            email: "contact@globalindustries.example.com",
            subsidiary: { id: "1", refName: "Parent Company" },
            datecreated: "2024-10-15T09:00:00Z",
            lastmodifieddate: "2024-10-20T16:45:00Z",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "",
    customer: { id: "", externalId: "", name: "" },
    instance: { id: "", name: "" },
    user: { id: "", email: "", name: "", externalId: "" },
    integration: {
      id: "",
      name: "",
      versionSequenceId: "",
      externalVersion: "",
    },
    flow: { id: "", name: "", stableId: "" },
    startedAt: "",
    globalDebug: false,
  },
};
