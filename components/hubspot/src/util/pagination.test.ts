import { getAllPaginatedData } from "./pagination";

const URL = "/crm/objects/2026-09/contacts";

const clientWith = (...pages: unknown[]) => {
  const get = vi.fn();
  for (const page of pages) get.mockResolvedValueOnce({ data: page });
  return { get, client: { get } as never };
};

describe("getAllPaginatedData", () => {
  test("pages with paging.next.after against the same url and ignores paging.next.link", async () => {
    const { get, client } = clientWith(
      {
        results: [{ id: "1" }],
        paging: {
          next: {
            after: "cursor-1",
            link: "https://api.hubapi.com/crm/v3/objects/contacts?after=cursor-1",
          },
        },
      },
      { results: [{ id: "2" }] },
    );

    const results = await getAllPaginatedData(client, URL, true, true, {
      params: { limit: 100, archived: false },
    });

    expect(results).toEqual([{ id: "1" }, { id: "2" }]);
    expect(get).toHaveBeenCalledTimes(2);
    expect(get).toHaveBeenNthCalledWith(1, URL, {
      params: { limit: 100, archived: false },
    });
    expect(get).toHaveBeenNthCalledWith(2, URL, {
      params: { limit: 100, archived: false, after: "cursor-1" },
    });
  });

  test("overrides a caller-supplied after on later pages without mutating the first config", async () => {
    const config = { params: { after: "start" } };
    const { get, client } = clientWith(
      { results: [1], paging: { next: { after: "b" } } },
      { results: [2], paging: { next: { after: "c" } } },
      { results: [3] },
    );

    await getAllPaginatedData(client, URL, true, true, config);

    expect(get.mock.calls.map(([, c]) => c.params.after)).toEqual([
      "start",
      "b",
      "c",
    ]);
    expect(config).toEqual({ params: { after: "start" } });
  });

  test("keeps repeated URLSearchParams keys on later pages", async () => {
    const params = new URLSearchParams([
      ["properties", "hs_timestamp"],
      ["properties", "hs_call_title"],
    ]);
    const { get, client } = clientWith(
      { results: [1], paging: { next: { after: "b" } } },
      { results: [2] },
    );

    await getAllPaginatedData(client, URL, true, true, { params });

    const secondParams = get.mock.calls[1][1].params as URLSearchParams;
    expect(secondParams.getAll("properties")).toEqual([
      "hs_timestamp",
      "hs_call_title",
    ]);
    expect(secondParams.get("after")).toBe("b");
    expect(params.has("after")).toBe(false);
  });

  test("works when no config was supplied", async () => {
    const { get, client } = clientWith(
      { results: [1], paging: { next: { after: "b" } } },
      { results: [2] },
    );

    await getAllPaginatedData(client, URL, true);

    expect(get).toHaveBeenNthCalledWith(1, URL, undefined);
    expect(get).toHaveBeenNthCalledWith(2, URL, { params: { after: "b" } });
  });

  test("fetches a single page when fetchAll is false and returns the paging object", async () => {
    const paging = { next: { after: "b" } };
    const { get, client } = clientWith({ results: [1], paging });

    const result = await getAllPaginatedData(client, URL, false, false, {
      params: {},
    });

    expect(get).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ results: [1], paging });
  });

  test("returns the last page's paging (undefined) when all pages are drained", async () => {
    const { client } = clientWith(
      { results: [1], paging: { next: { after: "b" } } },
      { results: [2] },
    );

    const result = (await getAllPaginatedData(client, URL, true, false)) as {
      results: number[];
      paging?: unknown;
    };

    expect(result.results).toEqual([1, 2]);
    expect(result.paging).toBeUndefined();
  });
});
