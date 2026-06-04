


import type { TriggerPayload } from "@prismatic-io/spectral";









export const pipedriveTriggerExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Pipedrive-Webhook",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        meta: {
          action: "change",
          entity: "deal",
          version: "2.0",
          company_id: 12882925,
          user_id: 18487521,
          id: 1,
          entity_id: 1,
          webhook_id: 99,
          webhook_owner_id: 18487521,
          permitted_user_ids: [18487521],
          attempt: 1,
          host: "company.pipedrive.com",
          timestamp: 1727447128,
          change_source: "app",
        },
        data: {
          id: 1,
          title: "test deal",
          value: 2,
          currency: "USD",
          status: "open",
          stage_id: 1,
          pipeline_id: 1,
          owner_id: 18487521,
          person_id: 3,
          org_id: 2,
          add_time: "2024-09-27T14:25:27Z",
          update_time: "2024-09-27T14:25:28Z",
        },
        previous: null,
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
            item: "person",
            id: 5,
            data: {
              id: 5,
              name: "Jane Smith",
              first_name: "Jane",
              last_name: "Smith",
              owner_id: {
                id: 18487521,
                name: "Test Developer",
                email: "dev@test.dev",
                has_pic: 0,
                pic_hash: null,
                active_flag: true,
                value: 18487521,
              },
              org_id: {
                name: "Acme",
                people_count: 13,
                owner_id: 18487521,
                address: null,
                active_flag: true,
                cc_email: "test-sandbox@pipedrivemail.com",
                label_ids: [],
                owner_name: "Test Developer",
                value: 1,
              },
              email: [
                {
                  label: "work",
                  value: "jane.smith@example.com",
                  primary: true,
                },
              ],
              phone: [
                {
                  value: "+15555550123",
                  primary: true,
                },
              ],
              add_time: "2026-05-20 14:00:00",
              update_time: "2026-05-20 14:00:00",
              active_flag: true,
              visible_to: "3",
            },
          },
        ],
        updated: [
          {
            item: "organization",
            id: 1,
            data: {
              id: 1,
              name: "Acme Corporation",
              owner_id: 18487521,
              add_time: "2023-04-06 02:51:24",
              update_time: "2026-05-20 15:00:00",
              visible_to: "3",
              label_ids: [],
              address: "123 Main St, Springfield, IL 62701, USA",
              people_count: 13,
              open_deals_count: 2,
              closed_deals_count: 1,
              won_deals_count: 1,
              lost_deals_count: 0,
              activities_count: 5,
              cc_email: "test-sandbox+org1@pipedrivemail.com",
            },
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
