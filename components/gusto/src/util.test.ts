import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { fetchAllPages, fetchAllCursorEvents } from "./util";

const createMockClient = (getMock: jest.Mock): Pick<HttpClient, "get"> => ({
  get: getMock,
});

describe("fetchAllPages", () => {
  let getMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn();
  });

  it("single page: returns items when x-total-pages equals x-page", async () => {
    const items = [{ id: 1 }, { id: 2 }];
    getMock.mockResolvedValueOnce({
      data: items,
      headers: { "x-total-pages": "1", "x-page": "1" },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllPages(client, "/companies");

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith("/companies", { params: { page: 1 } });
    expect(result).toEqual(items);
  });

  it("multi-page: accumulates items across 3 pages", async () => {
    getMock
      .mockResolvedValueOnce({
        data: [{ id: 1 }],
        headers: { "x-total-pages": "3", "x-page": "1" },
      })
      .mockResolvedValueOnce({
        data: [{ id: 2 }],
        headers: { "x-total-pages": "3", "x-page": "2" },
      })
      .mockResolvedValueOnce({
        data: [{ id: 3 }],
        headers: { "x-total-pages": "3", "x-page": "3" },
      });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllPages(client, "/employees");

    expect(getMock).toHaveBeenCalledTimes(3);
    expect(result).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it("10+ pages: correctly compares double-digit page numbers", async () => {
    
    for (let i = 1; i <= 10; i++) {
      getMock.mockResolvedValueOnce({
        data: [{ id: i }],
        headers: {
          "x-total-pages": "10",
          "x-page": String(i),
        },
      });
    }

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllPages(client, "/companies");

    expect(getMock).toHaveBeenCalledTimes(10);
    expect(result).toHaveLength(10);
  });

  it("empty first page: returns empty array", async () => {
    getMock.mockResolvedValueOnce({
      data: [],
      headers: { "x-total-pages": "1", "x-page": "1" },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllPages(client, "/companies");

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});

describe("fetchAllCursorEvents", () => {
  let getMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn();
  });

  it("single page: stops when x-has-next-page is false", async () => {
    const events = [{ uuid: "aaa", type: "created" }];
    getMock.mockResolvedValueOnce({
      data: events,
      headers: { "x-has-next-page": "false" },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllCursorEvents(client, "/events");

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(events);
  });

  it("multi-page: follows cursor chain via UUIDs", async () => {
    getMock
      .mockResolvedValueOnce({
        data: [{ uuid: "aaa", type: "created" }],
        headers: { "x-has-next-page": "true" },
      })
      .mockResolvedValueOnce({
        data: [{ uuid: "bbb", type: "updated" }],
        headers: { "x-has-next-page": "true" },
      })
      .mockResolvedValueOnce({
        data: [{ uuid: "ccc", type: "deleted" }],
        headers: { "x-has-next-page": "false" },
      });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllCursorEvents(client, "/events");

    expect(getMock).toHaveBeenCalledTimes(3);
    expect(result).toEqual([
      { uuid: "aaa", type: "created" },
      { uuid: "bbb", type: "updated" },
      { uuid: "ccc", type: "deleted" },
    ]);

    
    const secondCallParams = getMock.mock.calls[1][1].params;
    expect(secondCallParams.starting_after_uuid).toBe("aaa");
    const thirdCallParams = getMock.mock.calls[2][1].params;
    expect(thirdCallParams.starting_after_uuid).toBe("bbb");
  });

  it("empty data stops iteration", async () => {
    getMock.mockResolvedValueOnce({
      data: [],
      headers: { "x-has-next-page": "true" },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllCursorEvents(client, "/events");

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it("passes extra params through to each request", async () => {
    getMock.mockResolvedValueOnce({
      data: [{ uuid: "aaa" }],
      headers: { "x-has-next-page": "false" },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    await fetchAllCursorEvents(client, "/events", {
      resource_uuid: "r-123",
      event_type: "company.update",
    });

    const callParams = getMock.mock.calls[0][1].params;
    expect(callParams.resource_uuid).toBe("r-123");
    expect(callParams.event_type).toBe("company.update");
    expect(callParams.limit).toBeDefined();
  });
});
