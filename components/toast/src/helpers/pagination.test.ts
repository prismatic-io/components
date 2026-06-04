import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { DEFAULT_PAGE_SIZE } from "../constants";
import { paginateResults } from "./pagination";

const createMockClient = (getMock: jest.Mock): Pick<HttpClient, "get"> => ({
  get: getMock,
});

describe("paginateResults", () => {
  let getMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn();
  });

  it("fetchAll=false: makes a single call and returns full response", async () => {
    const response = {
      results: [{ restaurantGuid: "abc" }],
      nextPageToken: "tok2",
      totalResultCount: 50,
    };
    getMock.mockResolvedValueOnce({ data: response });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await paginateResults({
      client,
      endpoint: "/partners/v1/connectedRestaurants",
      fetchAll: false,
      pageSize: "100",
      pageToken: "tok1",
    });

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith("/partners/v1/connectedRestaurants", {
      params: { pageSize: "100", pageToken: "tok1" },
    });
    expect(result).toEqual({ data: response });
  });

  it("fetchAll=true, single page: returns flat array when no nextPageToken", async () => {
    const restaurants = [{ restaurantGuid: "r1" }, { restaurantGuid: "r2" }];
    getMock.mockResolvedValueOnce({
      data: { results: restaurants, nextPageToken: null },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await paginateResults({
      client,
      endpoint: "/partners/v1/connectedRestaurants",
      fetchAll: true,
    });

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: restaurants });
  });

  it("fetchAll=true, multi-page: accumulates results across 3 token pages", async () => {
    getMock
      .mockResolvedValueOnce({
        data: { results: [{ id: 1 }], nextPageToken: "tok2" },
      })
      .mockResolvedValueOnce({
        data: { results: [{ id: 2 }], nextPageToken: "tok3" },
      })
      .mockResolvedValueOnce({
        data: { results: [{ id: 3 }], nextPageToken: null },
      });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await paginateResults({
      client,
      endpoint: "/partners/v1/connectedRestaurants",
      fetchAll: true,
    });

    expect(getMock).toHaveBeenCalledTimes(3);
    expect(result).toEqual({ data: [{ id: 1 }, { id: 2 }, { id: 3 }] });

    
    expect(getMock.mock.calls[1][1].params.pageToken).toBe("tok2");
    expect(getMock.mock.calls[2][1].params.pageToken).toBe("tok3");
  });

  it("fetchAll=true, empty results: returns empty array", async () => {
    getMock.mockResolvedValueOnce({
      data: { results: [], nextPageToken: null },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await paginateResults({
      client,
      endpoint: "/partners/v1/connectedRestaurants",
      fetchAll: true,
    });

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: [] });
  });

  it("fetchAll=true: uses DEFAULT_PAGE_SIZE when pageSize not provided", async () => {
    getMock.mockResolvedValueOnce({
      data: { results: [], nextPageToken: null },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    await paginateResults({
      client,
      endpoint: "/test",
      fetchAll: true,
    });

    expect(getMock.mock.calls[0][1].params.pageSize).toBe(DEFAULT_PAGE_SIZE);
  });
});
