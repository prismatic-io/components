import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { afterEach, describe, expect, test } from "vitest";
import { apiKey } from "../../connections";
import {
  createWebhookExamplePayload,
  deleteWebhookExamplePayload,
  listWebhooksExamplePayload,
} from "../../examplePayloads";
import { createWebhook } from "./createWebhook";
import { deleteWebhook } from "./deleteWebhook";
import { listWebhooks } from "./listWebhooks";

const BASE = "https://api.monday.com";
const connection = createConnection(apiKey, { apiKey: "test-key" });
const errorBody = { errors: [{ message: "Internal error" }] };

afterEach(() => nock.cleanAll());

describe("createWebhook", () => {
  const params = {
    connection,
    boardId: 2924980809,
    webhookUrl: "https://hooks.example.com/monday/events",
    webhookEvent: "create_item",
    webhookConfig: undefined,
  };

  test("happy path returns the created webhook", async () => {
    nock(BASE)
      .post("/v2")
      .reply(200, { data: createWebhookExamplePayload.data });
    const { result } = await invoke(createWebhook, params);
    expect(result).toEqual(createWebhookExamplePayload);
  });

  test("error path logs and rethrows", async () => {
    nock(BASE).post("/v2").reply(500, errorBody);
    await expect(invoke(createWebhook, params)).rejects.toThrow();
  });
});

describe("deleteWebhook", () => {
  const params = { connection, boardId: 2924980809, webhookId: 147295839 };

  test("happy path returns the deleted webhook", async () => {
    nock(BASE)
      .post("/v2")
      .reply(200, { data: deleteWebhookExamplePayload.data });
    const { result } = await invoke(deleteWebhook, params);
    expect(result).toEqual(deleteWebhookExamplePayload);
  });

  test("error path logs and rethrows", async () => {
    nock(BASE).post("/v2").reply(500, errorBody);
    await expect(invoke(deleteWebhook, params)).rejects.toThrow();
  });
});

describe("listWebhooks", () => {
  const params = { connection, boardId: 2924980809 };

  test("happy path returns the board's webhooks", async () => {
    nock(BASE)
      .post("/v2")
      .reply(200, { data: listWebhooksExamplePayload.data });
    const { result } = await invoke(listWebhooks, params);
    expect(result).toEqual(listWebhooksExamplePayload);
  });

  test("error path logs and rethrows", async () => {
    nock(BASE).post("/v2").reply(500, errorBody);
    await expect(invoke(listWebhooks, params)).rejects.toThrow();
  });
});
