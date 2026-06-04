






import type { TriggerPayload } from "@prismatic-io/spectral";







export const createProductExamplePayload = {
  data: {
    createStandardProduct: {
      id: "03440122-ea39-499b-83aa-f08b2614daf3",
      ref: "TESTPRD3",
    },
  },
};







export const createCustomerExamplePayload = {
  data: {
    createCustomer: {
      id: "744793",
      username: "jdoe@email.com",
      primaryEmail: "jdoe@email.com",
      primaryPhone: "+123456789",
      firstName: "John",
      lastName: "Doe",
      timezone: "Australia/Sydney",
      country: "Australia",
      promotionOptIn: true,
      retailer: {
        id: "34",
      },
      attributes: [
        {
          name: "loyaltyTier",
          type: "STRING",
          value: "Gold",
        },
      ],
    },
  },
};







export const getCustomerByEmailAddressExamplePayload = {
  data: {
    customers: {
      edges: [
        {
          node: {
            id: "744793",
            ref: "CUST-744793",
            firstName: "John",
            lastName: "Doe",
            username: "jdoe@email.com",
            primaryEmail: "jdoe@email.com",
            primaryPhone: "+123456789",
            timezone: "Australia/Sydney",
            attributes: [
              {
                name: "loyaltyTier",
                type: "STRING",
              },
            ],
          },
        },
      ],
    },
  },
};








export const getCurrentUserExamplePayload = {
  data: {
    me: {
      id: "744793",
      username: "admin@fluentretail.com",
      title: "Administrator",
      firstName: "Admin",
      lastName: "User",
      primaryEmail: "admin@fluentretail.com",
      primaryPhone: "+61400000000",
      type: "DEFAULT",
      status: "ACTIVE",
      attributes: [
        {
          name: "defaultLanguage",
          type: "STRING",
          value: "en",
        },
      ],
      department: "IT",
      country: "Australia",
      timezone: "Australia/Sydney",
      language: {
        value: "en",
        label: "English",
      },
      promotionOptIn: false,
      primaryRetailer: {
        id: "34",
        tradingName: "Fluent Retail",
      },
      primaryLocation: {
        id: "1001",
        type: "STORE",
        status: "ACTIVE",
        name: "Sydney CBD",
      },
      roles: [
        {
          role: {
            id: "1",
            name: "ADMIN",
            permissions: [
              {
                name: "MANAGE_USERS",
              },
            ],
          },
        },
      ],
      apps: [
        {
          id: "101",
          name: "Fluent OMS",
          version: {
            major: 4,
            minor: 2,
            patch: 1,
          },
        },
      ],
    },
  },
};








export const genericRequestExamplePayload = {
  data: {
    me: {
      id: "744793",
      username: "admin@fluentretail.com",
      primaryEmail: "admin@fluentretail.com",
    },
  },
};















export const pollChangesExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [
          {
            id: "ORD-1042",
            ref: "WEB-000142",
            type: "STANDARD",
            status: "CREATED",
            createdOn: "2026-05-26T14:30:00.000Z",
            updatedOn: "2026-05-26T14:30:00.000Z",
          },
        ],
        updated: [
          {
            id: "ORD-980",
            ref: "WEB-000087",
            type: "STANDARD",
            status: "FULFILLED",
            createdOn: "2026-04-12T09:00:00.000Z",
            updatedOn: "2026-05-26T15:45:00.000Z",
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
