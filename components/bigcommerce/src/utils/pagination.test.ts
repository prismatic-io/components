import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { paginateResults } from "./pagination";

const mockProduct = (id: number, name: string, sku: string) => ({
  id,
  name,
  sku,
});

const v3Response = (
  items: unknown[],
  currentPage: number,
  totalPages: number,
) => ({
  data: {
    data: items,
    meta: {
      pagination: {
        total: totalPages * items.length,
        count: items.length,
        per_page: 50,
        current_page: currentPage,
        total_pages: totalPages,
      },
    },
  },
});

const v2Response = (items: unknown[]) => ({ data: items });

const createMockClient = (
  getMock: jest.Mock,
): Pick<HttpClient, "get"> => ({
  get: getMock,
});

describe("paginateResults", () => {
  let getMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn();
  });

  it("fetchAll=false: makes a single call and passes params through", async () => {
    const responseData = v3Response(
      [mockProduct(77, "Product A", "SKU-001")],
      1,
      1,
    );
    getMock.mockResolvedValueOnce(responseData);

    const client = createMockClient(getMock) as unknown as HttpClient;
    const params = { limit: 10, include_fields: "name,sku" };
    const result = await paginateResults(client, "/v3/catalog/products", false, params);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith("/v3/catalog/products", { params });
    expect(result).toEqual({ data: responseData.data });
  });

  it("fetchAll=true, V3 single page (total_pages=1): returns all items", async () => {
    const items = [
      mockProduct(77, "Product A", "SKU-001"),
      mockProduct(78, "Product B", "SKU-002"),
    ];
    getMock.mockResolvedValueOnce(v3Response(items, 1, 1));

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await paginateResults(client, "/v3/catalog/products", true);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: items });
  });

  it("fetchAll=true, V3 three pages: aggregates all items", async () => {
    const page1 = [mockProduct(1, "Product A", "SKU-001")];
    const page2 = [mockProduct(2, "Product B", "SKU-002")];
    const page3 = [mockProduct(3, "Product C", "SKU-003")];

    getMock
      .mockResolvedValueOnce(v3Response(page1, 1, 3))
      .mockResolvedValueOnce(v3Response(page2, 2, 3))
      .mockResolvedValueOnce(v3Response(page3, 3, 3));

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await paginateResults(client, "/v3/catalog/products", true);

    expect(getMock).toHaveBeenCalledTimes(3);
    expect(result).toEqual({
      data: [...page1, ...page2, ...page3],
    });
  });

  it("fetchAll=true, V2 flat array, single page: returns items from one page", async () => {
    
    
    const page1 = [mockProduct(10, "Legacy A", "L-001")];

    getMock.mockResolvedValueOnce(v2Response(page1));

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await paginateResults(client, "/v2/orders", true);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: page1 });
  });

  it("fetchAll=true, V2 flat array, empty first page: returns empty and breaks", async () => {
    getMock.mockResolvedValueOnce(v2Response([]));

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await paginateResults(client, "/v2/orders", true);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: [] });
  });

  it("fetchAll=true, non-array/non-wrapped response: returns as-is", async () => {
    const singleObject = { id: 99, name: "Single Item", sku: "SINGLE-001" };
    getMock.mockResolvedValueOnce({ data: singleObject });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await paginateResults(client, "/v3/catalog/products/99", true);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ data: singleObject });
  });

  it("fetchAll=true: strips user-supplied page param and starts at page=1", async () => {
    const items = [mockProduct(77, "Product A", "SKU-001")];
    getMock.mockResolvedValueOnce(v3Response(items, 1, 1));

    const client = createMockClient(getMock) as unknown as HttpClient;
    await paginateResults(client, "/v3/catalog/products", true, {
      page: 5,
      limit: 25,
    });

    expect(getMock).toHaveBeenCalledWith("/v3/catalog/products", {
      params: { limit: 25, page: 1 },
    });
  });

  it("fetchAll=true, V3: total_pages from response drives the loop count", async () => {
    const items = [mockProduct(1, "P", "S")];

    getMock
      .mockResolvedValueOnce(v3Response(items, 1, 2))
      .mockResolvedValueOnce(v3Response(items, 2, 2));

    const client = createMockClient(getMock) as unknown as HttpClient;
    await paginateResults(client, "/v3/catalog/products", true);

    expect(getMock).toHaveBeenCalledTimes(2);
    expect(getMock).toHaveBeenNthCalledWith(1, "/v3/catalog/products", {
      params: { page: 1 },
    });
    expect(getMock).toHaveBeenNthCalledWith(2, "/v3/catalog/products", {
      params: { page: 2 },
    });
  });

  it("fetchAll=true: preserves other params like limit and include_fields", async () => {
    const items = [mockProduct(77, "Product A", "SKU-001")];
    getMock.mockResolvedValueOnce(v3Response(items, 1, 1));

    const client = createMockClient(getMock) as unknown as HttpClient;
    await paginateResults(client, "/v3/catalog/products", true, {
      limit: 100,
      include_fields: "name,sku",
      sort: "date_modified",
    });

    expect(getMock).toHaveBeenCalledWith("/v3/catalog/products", {
      params: {
        limit: 100,
        include_fields: "name,sku",
        sort: "date_modified",
        page: 1,
      },
    });
  });

  it("fetchAll=true, MAX_PAGES safety: stops at 100 calls even if total_pages is higher", async () => {
    const items = [mockProduct(1, "P", "S")];
    getMock.mockImplementation(() =>
      Promise.resolve(v3Response(items, 1, 150)),
    );

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await paginateResults(client, "/v3/catalog/products", true);

    expect(getMock).toHaveBeenCalledTimes(100);
    expect((result.data as unknown[]).length).toBe(100);
  });
});
