import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { getAllPaginatedData } from "./util";

const createMockClient = (getMock: jest.Mock): Pick<HttpClient, "get"> => ({
  get: getMock,
});

describe("getAllPaginatedData", () => {
  let getMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn();
  });

  it("single page: returns items when total-pages is 1", async () => {
    const items = [{ id: 1 }, { id: 2 }];
    getMock.mockResolvedValueOnce({
      data: items,
      headers: { "Total-Pages": "1", "Total-Count": "2" },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await getAllPaginatedData(client, "/order");

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith("/order", {
      params: { Page: 1, Limit: 250 },
    });
    expect(result).toEqual(items);
  });

  it("multi-page: accumulates items across 3 pages", async () => {
    const page1 = Array.from({ length: 250 }, (_, i) => ({ id: i }));
    const page2 = Array.from({ length: 250 }, (_, i) => ({ id: 250 + i }));
    const page3 = [{ id: 500 }, { id: 501 }];

    getMock
      .mockResolvedValueOnce({
        data: page1,
        headers: { "Total-Pages": "3" },
      })
      .mockResolvedValueOnce({
        data: page2,
        headers: { "Total-Pages": "3" },
      })
      .mockResolvedValueOnce({
        data: page3,
        headers: { "Total-Pages": "3" },
      });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await getAllPaginatedData(client, "/order");

    expect(getMock).toHaveBeenCalledTimes(3);
    expect(result).toHaveLength(502);
    expect(getMock.mock.calls[1][1].params.Page).toBe(2);
    expect(getMock.mock.calls[2][1].params.Page).toBe(3);
  });

  it("missing total-pages header: defaults to 1 page", async () => {
    getMock.mockResolvedValueOnce({
      data: [{ id: 1 }],
      headers: {},
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await getAllPaginatedData(client, "/product");

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 1 }]);
  });

  it("passes extra params and headers through", async () => {
    getMock.mockResolvedValueOnce({
      data: [{ id: 1 }],
      headers: { "Total-Pages": "1" },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    await getAllPaginatedData(
      client,
      "/order",
      { SortOrder: "Newest" },
      { shipbob_channel_id: "ch-123" },
    );

    const callArgs = getMock.mock.calls[0][1];
    expect(callArgs.params).toMatchObject({
      Page: 1,
      Limit: 250,
      SortOrder: "Newest",
    });
    expect(callArgs.headers).toEqual({ shipbob_channel_id: "ch-123" });
  });

  it("empty data: returns empty array", async () => {
    getMock.mockResolvedValueOnce({
      data: [],
      headers: { "Total-Pages": "1" },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await getAllPaginatedData(client, "/webhook");

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
