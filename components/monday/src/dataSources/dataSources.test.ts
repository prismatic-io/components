import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/testing";
import nock from "nock";
import { afterEach, describe, expect, test } from "vitest";
import { apiKey } from "../connections";
import {
  selectBoardExamplePayload,
  selectWebhookExamplePayload,
} from "../examplePayloads";
import { selectBoard } from "./selectBoard";
import { selectWebhook } from "./selectWebhook";

const BASE = "https://api.monday.com";
const connection = createConnection(apiKey, { apiKey: "test-key" });

afterEach(() => nock.cleanAll());

describe("selectBoard", () => {
  test("pages until an empty page and maps boards to label/key", async () => {
    nock(BASE)
      .post("/v2")
      .reply(200, {
        data: {
          boards: [
            { id: "2924980809", name: "H2 Kickoff" },
            { id: "2924980810", name: "Engineering Backlog" },
          ],
        },
      });
    nock(BASE)
      .post("/v2")
      .reply(200, { data: { boards: [] } });
    const { result } = await invokeDataSource(selectBoard, { connection });
    expect(result).toEqual(selectBoardExamplePayload.result);
  });

  test("returns an empty array when there are no boards", async () => {
    nock(BASE)
      .post("/v2")
      .reply(200, { data: { boards: [] } });
    const { result } = await invokeDataSource(selectBoard, { connection });
    expect(result).toEqual([]);
  });
});

describe("selectWebhook", () => {
  test("labels each webhook as '<id> - <event>'", async () => {
    nock(BASE)
      .post("/v2")
      .reply(200, {
        data: {
          webhooks: [
            { id: "147295839", event: "create_item" },
            { id: "147295840", event: "change_column_value" },
          ],
        },
      });
    const { result } = await invokeDataSource(selectWebhook, {
      connection,
      boardId: 2924980809,
    });
    expect(result).toEqual(selectWebhookExamplePayload.result);
  });

  test("returns an empty array when there are no webhooks", async () => {
    nock(BASE)
      .post("/v2")
      .reply(200, { data: { webhooks: [] } });
    const { result } = await invokeDataSource(selectWebhook, {
      connection,
      boardId: 2924980809,
    });
    expect(result).toEqual([]);
  });
});
