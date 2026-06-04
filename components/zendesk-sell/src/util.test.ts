import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { fetchAllPages } from "./util";

const createMockClient = (getMock: jest.Mock): Pick<HttpClient, "get"> => ({
  get: getMock,
});

describe("fetchAllPages", () => {
  let getMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn();
  });

  it("fetchAll=false: returns single page without looping", async () => {
    const items = [{ id: 1, name: "Contact A" }];
    getMock.mockResolvedValueOnce({
      data: {
        items,
        meta: {
          links: { next_page: "https://api.getbase.com/v2/contacts?page=2" },
        },
      },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllPages(client, "/contacts", false, {
      page: 1,
      per_page: 25,
    });

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith("/contacts", {
      params: { page: 1, per_page: 25 },
      headers: { Accept: "application/json" },
    });
    expect(result.items).toEqual(items);
    expect(result.meta?.links?.next_page).toBeTruthy();
  });

  it("fetchAll=true, single page: returns items when next_page is null", async () => {
    const items = [{ id: 1, name: "Contact A" }];
    getMock.mockResolvedValueOnce({
      data: { items, meta: { links: { next_page: null } } },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllPages(client, "/contacts", true, {});

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith("/contacts", {
      params: { page: 1, per_page: 100 },
      headers: { Accept: "application/json" },
    });
    expect(result.items).toEqual(items);
    expect(result.meta).toEqual({ links: {} });
  });

  it("fetchAll=true, multi-page: accumulates items across 3 pages", async () => {
    getMock
      .mockResolvedValueOnce({
        data: {
          items: [{ id: 1 }],
          meta: {
            links: { next_page: "https://api.getbase.com/v2/contacts?page=2" },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: [{ id: 2 }],
          meta: {
            links: { next_page: "https://api.getbase.com/v2/contacts?page=3" },
          },
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: [{ id: 3 }],
          meta: { links: { next_page: null } },
        },
      });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllPages(client, "/contacts", true, {});

    expect(getMock).toHaveBeenCalledTimes(3);
    expect(result.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    expect(getMock.mock.calls[1][1].params.page).toBe(2);
    expect(getMock.mock.calls[2][1].params.page).toBe(3);
  });

  it("fetchAll=true, empty items: returns empty array", async () => {
    getMock.mockResolvedValueOnce({
      data: { items: [], meta: { links: { next_page: null } } },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllPages(client, "/deals", true, {});

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result.items).toEqual([]);
  });

  it("fetchAll=true, missing meta structure: exits safely", async () => {
    getMock.mockResolvedValueOnce({
      data: { items: [{ id: 1 }] },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllPages(client, "/leads", true, {});

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result.items).toEqual([{ id: 1 }]);
  });

  it("fetchAll=true: passes filter params through alongside pagination params", async () => {
    getMock.mockResolvedValueOnce({
      data: { items: [], meta: { links: { next_page: null } } },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    await fetchAllPages(client, "/contacts", true, {
      sort_by: "last_name",
      status: "active",
    });

    expect(getMock.mock.calls[0][1].params).toEqual({
      sort_by: "last_name",
      status: "active",
      page: 1,
      per_page: 100,
    });
  });
});
