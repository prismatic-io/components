jest.mock("@prismatic-io/spectral", () => ({
  util: {
    types: {
      toNumber: (val: string) => Number.parseInt(val, 10),
      toString: (val: number) => String(val),
    },
  },
}));

import { paginateResults } from "./pagination";

const createMockClient = (responses: { data: unknown }[]) => {
  const get = jest.fn();
  for (const response of responses) {
    get.mockResolvedValueOnce(response);
  }
  return { get } as unknown as Parameters<typeof paginateResults>[0];
};

const makeItems = (start: number, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    name: `User ${start + i}`,
  }));

describe("paginateResults", () => {
  it("fetchAll=false: makes a single call and returns data as-is", async () => {
    const items = makeItems(1, 2);
    const client = createMockClient([{ data: items }]);

    const result = await paginateResults(client, "/v1/users", false, {
      sort: "name",
    });

    expect(result).toEqual({ data: items });
    expect(client.get).toHaveBeenCalledTimes(1);
    expect(client.get).toHaveBeenCalledWith("/v1/users", {
      params: { sort: "name" },
      headers: { Accept: "application/json" },
    });
  });

  it("fetchAll=true, single page (fewer items than limit): returns items and stops", async () => {
    const items = makeItems(1, 2);
    const client = createMockClient([{ data: items }]);

    const result = await paginateResults(client, "/v1/users", true, {
      limit: "3",
    });

    expect(result).toEqual({ data: items });
    expect(client.get).toHaveBeenCalledTimes(1);
  });

  it("fetchAll=true, 2 full pages + 1 partial: aggregates all items", async () => {
    const page1 = makeItems(1, 3);
    const page2 = makeItems(4, 3);
    const page3 = makeItems(7, 1);
    const client = createMockClient([
      { data: page1 },
      { data: page2 },
      { data: page3 },
    ]);

    const result = await paginateResults(client, "/v1/users", true, {
      limit: "3",
    });

    expect(result).toEqual({ data: [...page1, ...page2, ...page3] });
    expect(client.get).toHaveBeenCalledTimes(3);

    
    expect(client.get).toHaveBeenNthCalledWith(
      1,
      "/v1/users",
      expect.objectContaining({
        params: expect.objectContaining({ offset: "0", limit: "3" }),
      }),
    );
    expect(client.get).toHaveBeenNthCalledWith(
      2,
      "/v1/users",
      expect.objectContaining({
        params: expect.objectContaining({ offset: "3", limit: "3" }),
      }),
    );
    expect(client.get).toHaveBeenNthCalledWith(
      3,
      "/v1/users",
      expect.objectContaining({
        params: expect.objectContaining({ offset: "6", limit: "3" }),
      }),
    );
  });

  it("fetchAll=true, empty first page: returns empty array", async () => {
    const client = createMockClient([{ data: [] }]);

    const result = await paginateResults(client, "/v1/users", true);

    expect(result).toEqual({ data: [] });
    expect(client.get).toHaveBeenCalledTimes(1);
  });

  it("fetchAll=true, non-array response: returns empty array", async () => {
    const client = createMockClient([{ data: { message: "not an array" } }]);

    const result = await paginateResults(client, "/v1/users", true);

    expect(result).toEqual({ data: [] });
    expect(client.get).toHaveBeenCalledTimes(1);
  });

  it("user-supplied limit overrides default 50", async () => {
    const items = makeItems(1, 5);
    const client = createMockClient([{ data: items }]);

    await paginateResults(client, "/v1/users", true, { limit: "100" });

    expect(client.get).toHaveBeenCalledWith(
      "/v1/users",
      expect.objectContaining({
        params: expect.objectContaining({ limit: "100" }),
      }),
    );
  });

  it("user-supplied offset is stripped when fetchAll=true (first call starts at 0)", async () => {
    const items = makeItems(1, 2);
    const client = createMockClient([{ data: items }]);

    await paginateResults(client, "/v1/users", true, {
      limit: "3",
      offset: "500",
    });

    expect(client.get).toHaveBeenCalledWith(
      "/v1/users",
      expect.objectContaining({
        params: expect.objectContaining({ offset: "0" }),
      }),
    );
    
    const callParams = (client.get as jest.Mock).mock.calls[0][1].params;
    expect(callParams).not.toHaveProperty("offset", "500");
  });

  it("passes Accept: application/json header", async () => {
    const client = createMockClient([{ data: [] }]);

    await paginateResults(client, "/v1/users", true);

    expect(client.get).toHaveBeenCalledWith(
      "/v1/users",
      expect.objectContaining({
        headers: { Accept: "application/json" },
      }),
    );
  });

  it("preserves other params (nameLike, sort) when fetchAll=true", async () => {
    const items = makeItems(1, 1);
    const client = createMockClient([{ data: items }]);

    await paginateResults(client, "/v1/users", true, {
      limit: "3",
      offset: "10",
      nameLike: "test",
      sort: "name",
    });

    const callParams = (client.get as jest.Mock).mock.calls[0][1].params;
    expect(callParams).toMatchObject({
      nameLike: "test",
      sort: "name",
      limit: "3",
      offset: "0",
    });
  });

  it("MAX_PAGES safety: stops after 100 pages even if server keeps returning full pages", async () => {
    const fullPage = makeItems(1, 50);
    const responses = Array.from({ length: 101 }, () => ({ data: fullPage }));
    const client = createMockClient(responses);

    const result = await paginateResults(client, "/v1/users", true);

    expect(client.get).toHaveBeenCalledTimes(100);
    expect((result.data as unknown[]).length).toBe(100 * 50);
  });
});
