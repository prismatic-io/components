import type { TriggerPayload } from "@prismatic-io/spectral";

export const webhookExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {
      Accept:
        "text/plain, application/xml, text/xml, application/json, application/cbor, application/*+xml, application/*+json, */*",
      "Content-Type": "application/json",
      Host: "hooks.example.com",
      "User-Agent": "Java/21.0.11",
      "X-Jamf-Signature": "123456",
    },
    queryParameters: {},
    rawBody: { data: "" },
    body: {
      data: {
        webhook: {
          id: 9,
          name: "Header Auth",
          webhookEvent: "ComputerAdded",
          eventTimestamp: 1780529995879,
        },
        event: {
          udid: "45436edf-864e-4364-982a-330b01d39e28",
          deviceName: "Boalime",
          model: "13-inch MacBook Pro (Mid 2012)",
          macAddress: "6A:2C:4B:B7:65:C8",
          alternateMacAddress: "82:45:58:44:dc:07",
          serialNumber: "C02ZC2QYLJHD",
          osVersion: "10.9.5",
          osBuild: "13A603",
          userDirectoryID: "-1",
          username: "Madison Anderson",
          realName: "13-inch MacBook",
          emailAddress: "email@com.pl",
          phone: "123-456-789",
          position: "IT Team Lead",
          department: "",
          building: "",
          room: "5",
          ipAddress: "247.185.82.186",
          reportedIpV4Address: "247.185.82.186",
          reportedIpV6Address: "",
          jssID: 6,
          managementId: "fd14f8f3-d5a4-4c44-ad7b-5f93d2ed15cb",
        },
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      Webhook: "https://hooks.example.com/trigger/abc123==",
    },
    webhookApiKeys: {
      Webhook: ["sample-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/abc123==",
    executionId: "exec_789456",
    customer: {
      id: "cust_12345",
      name: "Example Customer",
      externalId: "ext_cust_98765",
    },
    instance: {
      id: "inst_54321",
      name: "Jamf - Webhook Integration",
    },
    user: {
      id: "user_67890",
      email: "admin@example.com",
      name: "Admin User",
      externalId: "ext_user_12345",
    },
    integration: {
      id: "intg_98765",
      name: "Jamf - Webhook Integration",
      versionSequenceId: "v1.0.0",
      externalVersion: "1.0.0",
    },
    flow: {
      id: "flow_45678",
      name: "Computer Inventory Completed Webhook",
      stableId: "stable_flow_45678",
    },
    startedAt: "2026-04-15T10:23:00.000Z",
    globalDebug: false,
  },
};
