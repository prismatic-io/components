import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { afterEach, describe, expect, test } from "vitest";
import { apiKey } from "../../connections";
import {
  archiveBoardExamplePayload,
  createBoardExamplePayload,
  getBoardExamplePayload,
  listBoardsExamplePayload,
} from "../../examplePayloads";
import { archiveBoard } from "./archiveBoard";
import { createBoard } from "./createBoard";
import { getBoard } from "./getBoard";
import { listBoards } from "./listBoards";

const BASE = "https://api.monday.com";
const connection = createConnection(apiKey, { apiKey: "test-key" });
const errorBody = { errors: [{ message: "Internal error" }] };

afterEach(() => nock.cleanAll());

describe("archiveBoard", () => {
  test("happy path returns the archived board", async () => {
    nock(BASE)
      .post("/v2")
      .reply(200, { data: archiveBoardExamplePayload.data });
    const { result } = await invoke(archiveBoard, {
      connection,
      boardId: 4277545378,
    });
    expect(result).toEqual(archiveBoardExamplePayload);
  });

  test("error path rejects", async () => {
    nock(BASE).post("/v2").reply(500, errorBody);
    await expect(
      invoke(archiveBoard, { connection, boardId: 4277545378 }),
    ).rejects.toThrow();
  });
});

describe("createBoard", () => {
  const params = {
    connection,
    boardName: "Project Tracker",
    boardKind: "public",
    folderId: undefined,
    workspaceId: undefined,
    templateId: undefined,
  };

  test("happy path returns the created board", async () => {
    nock(BASE).post("/v2").reply(200, { data: createBoardExamplePayload.data });
    const { result } = await invoke(createBoard, params);
    expect(result).toEqual(createBoardExamplePayload);
  });

  test("error path rejects", async () => {
    nock(BASE).post("/v2").reply(500, errorBody);
    await expect(invoke(createBoard, params)).rejects.toThrow();
  });
});

describe("getBoard", () => {
  test("happy path returns boards as an array (not unwrapped)", async () => {
    nock(BASE).post("/v2").reply(200, { data: getBoardExamplePayload.data });
    const { result } = await invoke(getBoard, {
      connection,
      boardId: 2924980809,
    });
    expect(result).toEqual(getBoardExamplePayload);
  });

  test("error path rejects", async () => {
    nock(BASE).post("/v2").reply(500, errorBody);
    await expect(
      invoke(getBoard, { connection, boardId: 2924980809 }),
    ).rejects.toThrow();
  });
});

describe("listBoards", () => {
  const params = {
    connection,
    fetchAll: false,
    pagination: { limit: 25, page: 1 },
  };

  test("fetchAll false issues a single request and returns the page", async () => {
    const scope = nock(BASE)
      .post("/v2")
      .reply(200, { data: listBoardsExamplePayload.data });
    const { result } = await invoke(listBoards, params);
    expect(result).toEqual(listBoardsExamplePayload);
    expect(scope.isDone()).toBe(true);
  });

  test("error path rejects", async () => {
    nock(BASE).post("/v2").reply(500, errorBody);
    await expect(invoke(listBoards, params)).rejects.toThrow();
  });
});
