import type { TriggerPayload } from "@prismatic-io/spectral";
import { getEnvelopeExamplePayload } from "./envelopes";

export const createWebhookExamplePayload = {
  data: {
    connectId: "c2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    configurationType: "custom",
    urlToPublishTo: "https://example.com/webhooks/docusign",
    name: "My Integration Webhook",
    allowEnvelopePublish: "true",
    enableLog: "true",
    requiresAcknowledgement: "true",
    signMessageWithX509Certificate: "false",
    useSoapInterface: "false",
    includeHMAC: "true",
    includeDocumentFields: "true",
    includeSenderAccountasCustomField: "true",
    includeTimeZoneInformation: "true",
    includeEnvelopeVoidReason: "true",
    includeDocuments: "false",
    allUsers: "true",
    events: [
      "envelope-sent",
      "envelope-delivered",
      "envelope-completed",
      "envelope-declined",
      "envelope-voided",
      "recipient-sent",
      "recipient-delivered",
      "recipient-completed",
      "recipient-declined",
    ],
    eventData: {
      version: "restv2.1",
      includeData: ["documents", "recipients", "custom_fields"],
      format: "json",
    },
    deliveryMode: "SIM",
    soapNamespace: "",
  },
};

export const getWebhookExamplePayload = {
  data: {
    configurations: [
      {
        connectId: "60051001",
        configurationType: "custom",
        urlToPublishTo: "https://hooks.example.com/docusign/envelope-events",
        name: "Envelope Status Webhook",
        allowEnvelopePublish: "true",
        deliveryMode: "sim",
        enableLog: "true",
        includeDocuments: "false",
        includeCertificateOfCompletion: "false",
        requiresAcknowledgement: "true",
        signMessageWithX509Certificate: "false",
        useSoapInterface: "false",
        includeTimeZoneInformation: "false",
        includeOAuth: "false",
        includeHMAC: "true",
        integratorManaged: "false",
        includeEnvelopeVoidReason: "false",
        includeSenderAccountasCustomField: "false",
        events: ["envelope-created", "envelope-discard"],
        soapNamespace: "",
        allUsers: "true",
        allUsersExcept: "false",
        includeCertSoapHeader: "false",
        requireMutualTls: "false",
        includeDocumentFields: "false",
        pausePublish: "false",
        eventData: {
          version: "restv2.1",
          includeData: [],
        },
        enableOAuthPerConfiguration: "false",
      },
    ],
    totalRecords: "1",
  },
};

export const listWebhooksExamplePayload = {
  data: {
    configurations: [
      {
        connectId: "60051001",
        configurationType: "custom",
        urlToPublishTo: "https://hooks.example.com/docusign/envelope-events",
        name: "Envelope Status Webhook",
        allowEnvelopePublish: "true",
        deliveryMode: "sim",
        enableLog: "true",
        includeDocuments: "false",
        includeCertificateOfCompletion: "false",
        requiresAcknowledgement: "true",
        signMessageWithX509Certificate: "false",
        useSoapInterface: "false",
        includeTimeZoneInformation: "false",
        includeOAuth: "false",
        includeHMAC: "true",
        integratorManaged: "false",
        includeEnvelopeVoidReason: "false",
        includeSenderAccountasCustomField: "false",
        events: ["envelope-created", "envelope-discard"],
        soapNamespace: "",
        allUsers: "true",
        allUsersExcept: "false",
        includeCertSoapHeader: "false",
        requireMutualTls: "false",
        includeDocumentFields: "false",
        pausePublish: "false",
        eventData: {
          version: "restv2.1",
          includeData: [],
        },
        enableOAuthPerConfiguration: "false",
      },
      {
        connectId: "60051002",
        configurationType: "custom",
        urlToPublishTo:
          "https://hooks.example.com/docusign/completed-agreements",
        name: "Completed Agreements Webhook",
        allowEnvelopePublish: "true",
        deliveryMode: "sim",
        enableLog: "true",
        includeDocuments: "false",
        includeCertificateOfCompletion: "false",
        requiresAcknowledgement: "true",
        signMessageWithX509Certificate: "false",
        useSoapInterface: "false",
        includeTimeZoneInformation: "false",
        includeOAuth: "false",
        includeHMAC: "false",
        integratorManaged: "false",
        includeEnvelopeVoidReason: "false",
        includeSenderAccountasCustomField: "false",
        events: [
          "envelope-completed",
          "envelope-declined",
          "recipient-completed",
          "recipient-declined",
        ],
        soapNamespace: "",
        allUsers: "true",
        allUsersExcept: "false",
        includeCertSoapHeader: "false",
        requireMutualTls: "false",
        includeDocumentFields: "false",
        pausePublish: "false",
        eventData: {
          version: "restv2.1",
          includeData: [],
        },
        enableOAuthPerConfiguration: "false",
      },
    ],
    totalRecords: "2",
  },
};

export const updateWebhookExamplePayload = {
  data: {
    connectId: "c2d3e4f5-6a7b-8c9d-0e1f-2a3b4c5d6e7f",
    configurationType: "custom",
    urlToPublishTo: "https://example.com/webhooks/docusign-updated",
    name: "Updated Integration Webhook",
    allowEnvelopePublish: "true",
    enableLog: "true",
    includeHMAC: "true",
  },
};

export const deleteWebhookExamplePayload = {
  data: "",
};

export const deleteAllInstancedWebhooksExamplePayload = {
  data: {
    deletedWebhooks: 1,
  },
};

export const accountTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {
      "content-type": "application/json",
      "x-docusign-signature-1": "Rp2mY0bL7vQ4nK8sT1wZ3xC6dF9hJ2kM5pR8tV0yB4E=",
    },
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        event: "envelope-sent",
        apiVersion: "v2.1",
        uri: "/restapi/v2.1/accounts/f1e2d3c4-b5a6-4978-8a9b-0c1d2e3f4a5b/envelopes/a3b2c1d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
        retryCount: 0,
        configurationId: 10418278,
        generatedDateTime: "2025-01-15T10:30:51.789Z",
        data: {
          accountId: "f1e2d3c4-b5a6-4978-8a9b-0c1d2e3f4a5b",
          userId: "9a8b7c6d-5e4f-4a3b-9c2d-1e0f9a8b7c6d",
          envelopeId: getEnvelopeExamplePayload.data.envelopeId,
          envelopeSummary: getEnvelopeExamplePayload.data,
        },
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
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
