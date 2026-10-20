import type { Message } from "@microsoft/microsoft-graph-types";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { POLL_PAGE_SIZE } from "../constants";
import { readPollingWindow } from ".";
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("../client", () => ({ createClient: () => createClient() }));
describe("readPollingWindow", () => {
  const NOW = new Date("2026-06-10T00:00:00.000Z");
  const HORIZON = "2026-06-09T23:59:00.000Z";
  const connection = { key: "oauth2", fields: {} } as never;
  const position = {
    watermark: "2026-06-01T10:00:00.000Z",
    boundaryIds: ["a"],
  };
  const request = {
    position,
    folderId: undefined,
    skipFetch: false,
    batching: false,
    debug: false,
    now: NOW,
  };
  let get: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    get = vi.fn();
    createClient.mockReset();
    createClient.mockReturnValue({ get });
  });
  test("makes no request when fetching is skipped and moves the position to the horizon", async () => {
    const window = await readPollingWindow(connection, {
      ...request,
      skipFetch: true,
    });
    expect(window).toEqual({
      messages: [],
      position: { watermark: HORIZON, boundaryIds: [] },
      drained: true,
    });
    expect(createClient).not.toHaveBeenCalled();
  });
  test("keeps a position already past the horizon when fetching is skipped", async () => {
    const ahead = { watermark: "2026-06-11T00:00:00.000Z", boundaryIds: ["z"] };
    const window = await readPollingWindow(connection, {
      ...request,
      position: ahead,
      skipFetch: true,
    });
    expect(window.position).toBe(ahead);
    expect(window.drained).toBe(true);
  });
  test("reads from the position up to the horizon", async () => {
    const row = {
      id: "b",
      lastModifiedDateTime: "2026-06-02T00:00:00Z",
    } as Message;
    get.mockResolvedValueOnce({ data: { value: [row] } });
    const window = await readPollingWindow(connection, request);
    expect(get).toHaveBeenCalledWith("/me/messages", {
      params: {
        $filter: `lastModifiedDateTime ge ${position.watermark} and lastModifiedDateTime le ${HORIZON}`,
        $orderby: expect.any(String),
        $top: POLL_PAGE_SIZE,
      },
    });
    expect(window).toEqual({
      messages: [row],
      position: { watermark: "2026-06-02T00:00:00.000Z", boundaryIds: ["b"] },
      drained: true,
    });
  });
  test("reads a single page when batching drives the rounds", async () => {
    const row = (id: string, hour: number) =>
      ({ id, lastModifiedDateTime: `2026-06-0${hour}T00:00:00Z` }) as Message;
    get
      .mockResolvedValueOnce({
        data: { value: [row("b", 2)], "@odata.nextLink": "next-1" },
      })
      .mockResolvedValueOnce({ data: { value: [row("c", 3)] } });
    const window = await readPollingWindow(connection, {
      ...request,
      batching: true,
    });
    expect(get).toHaveBeenCalledTimes(1);
    expect(window.drained).toBe(false);
  });
});
