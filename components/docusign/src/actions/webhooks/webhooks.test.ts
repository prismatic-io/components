import { invoke } from "@prismatic-io/spectral/testing";
import {
  createWebhookExamplePayload,
  deleteAllInstancedWebhooksExamplePayload,
  deleteWebhookExamplePayload,
  getWebhookExamplePayload,
  listWebhooksExamplePayload,
  updateWebhookExamplePayload,
} from "../../examplePayloads";
import { ACCOUNT_PATH, connection, mockApi, useNock } from "../../testHelpers";
import { createWebhook } from "./createWebhook";
import { deleteAllInstancedWebhooks } from "./deleteAllInstancedWebhooks";
import { deleteWebhook } from "./deleteWebhook";
import { getWebhook } from "./getWebhook";
import { listWebhooks } from "./listWebhooks";
import { updateWebhook } from "./updateWebhook";

const CONNECT_ID = "60051001";
const FLOW_URL = "https://hooks.example.com/docusign/envelope-events";
const webhookBody = { connectId: CONNECT_ID, name: "Envelope Status Webhook" };

describe("webhooks actions", () => {
  useNock();

  describe("createWebhook", () => {
    const params = {
      connection,
      urlToPublishTo: FLOW_URL,
      webhookName: "Envelope Status Webhook",
      webhookEvents: ["envelope-sent", "envelope-completed"],
      includeHMAC: true,
    };

    it("posts a custom Connect configuration with the selected events", async () => {
      const scope = mockApi()
        .post(`${ACCOUNT_PATH}/connect`, {
          configurationType: "custom",
          urlToPublishTo: FLOW_URL,
          name: "Envelope Status Webhook",
          allowEnvelopePublish: "true",
          enableLog: "true",
          requiresAcknowledgement: "true",
          signMessageWithX509Certificate: "false",
          deliveryMode: "SIM",
          events: ["envelope-sent", "envelope-completed"],
          eventData: { version: "restv2.1", includeData: [""] },
          allUsers: "true",
          includeHMAC: "true",
        })
        .reply(201, createWebhookExamplePayload.data);

      const { result } = await invoke(createWebhook, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(createWebhookExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .post(`${ACCOUNT_PATH}/connect`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(createWebhook, params)).rejects.toThrow();
    });
  });

  describe("deleteAllInstancedWebhooks", () => {
    const params = { connection };
    const context = { webhookUrls: { "Flow 1": FLOW_URL } };

    it("deletes only the Connect configurations that point at this flow", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/connect`)
        .reply(200, listWebhooksExamplePayload.data)
        .delete(`${ACCOUNT_PATH}/connect/${CONNECT_ID}`)
        .reply(200, "");

      const { result } = await invoke(
        deleteAllInstancedWebhooks,
        params,
        context,
      );

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(deleteAllInstancedWebhooksExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/connect`)
        .reply(500, { errorCode: "UNSPECIFIED_ERROR" });

      await expect(
        invoke(deleteAllInstancedWebhooks, params, context),
      ).rejects.toThrow();
    });
  });

  describe("deleteWebhook", () => {
    const params = { connection, connectId: CONNECT_ID };

    it("deletes the Connect configuration by id", async () => {
      const scope = mockApi()
        .delete(`${ACCOUNT_PATH}/connect/${CONNECT_ID}`)
        .reply(200, deleteWebhookExamplePayload.data);

      const { result } = await invoke(deleteWebhook, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(deleteWebhookExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .delete(`${ACCOUNT_PATH}/connect/${CONNECT_ID}`)
        .reply(404, { errorCode: "CONNECT_CONFIGURATION_NOT_FOUND" });

      await expect(invoke(deleteWebhook, params)).rejects.toThrow();
    });
  });

  describe("getWebhook", () => {
    const params = { connection, connectId: CONNECT_ID };

    it("reads the Connect configuration by id", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/connect/${CONNECT_ID}`)
        .reply(200, getWebhookExamplePayload.data);

      const { result } = await invoke(getWebhook, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(getWebhookExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/connect/${CONNECT_ID}`)
        .reply(404, { errorCode: "CONNECT_CONFIGURATION_NOT_FOUND" });

      await expect(invoke(getWebhook, params)).rejects.toThrow();
    });
  });

  describe("listWebhooks", () => {
    const params = { connection };

    it("lists every Connect configuration", async () => {
      const scope = mockApi()
        .get(`${ACCOUNT_PATH}/connect`)
        .reply(200, listWebhooksExamplePayload.data);

      const { result } = await invoke(listWebhooks, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(listWebhooksExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .get(`${ACCOUNT_PATH}/connect`)
        .reply(500, { errorCode: "UNSPECIFIED_ERROR" });

      await expect(invoke(listWebhooks, params)).rejects.toThrow();
    });
  });

  describe("updateWebhook", () => {
    const params = { connection, jsonInput: webhookBody };

    it("puts the JSON body to /connect", async () => {
      const scope = mockApi()
        .put(`${ACCOUNT_PATH}/connect`, webhookBody)
        .reply(200, updateWebhookExamplePayload.data);

      const { result } = await invoke(updateWebhook, params);

      expect(scope.isDone()).toBe(true);
      expect(result).toEqual(updateWebhookExamplePayload);
    });

    it("surfaces an API error", async () => {
      mockApi()
        .put(`${ACCOUNT_PATH}/connect`)
        .reply(400, { errorCode: "INVALID_REQUEST_BODY" });

      await expect(invoke(updateWebhook, params)).rejects.toThrow();
    });
  });
});
