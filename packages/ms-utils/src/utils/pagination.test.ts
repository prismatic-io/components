import { paginateResults } from "./pagination";
const createMockClient = (getMock: jest.Mock) => ({
  get: getMock,
});
describe("paginateResults", () => {
  let getMock: jest.Mock;
  beforeEach(() => {
    getMock = jest.fn();
  });
  describe("fetchAll=false", () => {
    it("makes a single call and returns full response", async () => {
      const response = {
        value: [{ id: "1", displayName: "Customer 1" }],
        "@odata.nextLink": "https://api.example.com/next",
        "@odata.context": "https://api.example.com/$metadata",
      };
      getMock.mockResolvedValueOnce({ data: response });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/companies(abc)/customers",
        params: { $filter: "startswith(displayName,'A')" },
        fetchAll: false,
        pageSize: "50",
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(getMock).toHaveBeenCalledWith("/companies(abc)/customers", {
        params: {
          $filter: "startswith(displayName,'A')",
          $top: "50",
        },
      });
      expect(result).toEqual({ data: response });
    });
    it("does not pass $top when pageSize is not provided", async () => {
      const response = { value: [{ id: "1" }] };
      getMock.mockResolvedValueOnce({ data: response });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/companies(abc)/items",
        fetchAll: false,
      });
      expect(getMock).toHaveBeenCalledWith("/companies(abc)/items", {
        params: { $top: undefined, $skiptoken: undefined },
      });
    });
    it("forwards pageToken as $skiptoken to the API call", async () => {
      getMock.mockResolvedValueOnce({ data: { value: [{ id: "1" }] } });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/drives/abc/items/123/children",
        fetchAll: false,
        pageSize: "25",
        pageToken: "eyJza2lwIjoyNX0",
      });
      expect(getMock).toHaveBeenCalledWith("/drives/abc/items/123/children", {
        params: {
          $top: "25",
          $skiptoken: "eyJza2lwIjoyNX0",
        },
      });
    });
    it("forwards extra params alongside $top and $skiptoken", async () => {
      getMock.mockResolvedValueOnce({ data: { value: [] } });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/companies(abc)/customers",
        params: { $filter: "displayName eq 'Acme'" },
        fetchAll: false,
        pageSize: "10",
        pageToken: "token123",
      });
      expect(getMock).toHaveBeenCalledWith("/companies(abc)/customers", {
        params: {
          $filter: "displayName eq 'Acme'",
          $top: "10",
          $skiptoken: "token123",
        },
      });
    });
    it("omits $skiptoken when pageToken is not provided", async () => {
      getMock.mockResolvedValueOnce({ data: { value: [] } });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sites",
        fetchAll: false,
        pageSize: "50",
      });
      expect(getMock.mock.calls[0][1].params.$skiptoken).toBeUndefined();
      expect(getMock.mock.calls[0][1].params.$top).toBe("50");
    });
  });
  describe("fetchAll=true", () => {
    it("accumulates items across multiple pages", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "1" }, { id: "2" }],
            "@odata.nextLink": "https://api.example.com/next?skiptoken=abc",
          },
        })
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "3" }, { id: "4" }],
            "@odata.nextLink": "https://api.example.com/next?skiptoken=def",
          },
        })
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "5" }],
          },
        });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/companies(abc)/customers",
        params: { $filter: "city eq 'Chicago'" },
        fetchAll: true,
        pageSize: "2",
      });
      expect(getMock).toHaveBeenCalledTimes(3);
      expect(getMock.mock.calls[0]).toEqual([
        "/companies(abc)/customers",
        { params: { $filter: "city eq 'Chicago'", $top: "2" } },
      ]);
      expect(getMock.mock.calls[1]).toEqual([
        "https://api.example.com/next?skiptoken=abc",
      ]);
      expect(getMock.mock.calls[2]).toEqual([
        "https://api.example.com/next?skiptoken=def",
      ]);
      expect(result).toEqual({
        data: {
          value: [
            { id: "1" },
            { id: "2" },
            { id: "3" },
            { id: "4" },
            { id: "5" },
          ],
        },
      });
    });
    it("wraps accumulated items in a { value } envelope and preserves @odata.context without leaking the nextLink", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            "@odata.context":
              "https://graph.microsoft.com/v1.0/$metadata#drives",
            value: [{ id: "1" }, { id: "2" }],
            "@odata.nextLink": "https://api.example.com/next?skiptoken=abc",
          },
        })
        .mockResolvedValueOnce({
          data: { value: [{ id: "3" }] },
        });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/me/drives",
        fetchAll: true,
      });
      expect(result).toEqual({
        data: {
          "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#drives",
          value: [{ id: "1" }, { id: "2" }, { id: "3" }],
        },
      });
    });
    it("handles single page with no nextLink", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          value: [{ id: "1" }],
        },
      });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/companies(abc)/vendors",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: { value: [{ id: "1" }] } });
    });
    it("handles empty results", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          value: [],
        },
      });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/companies(abc)/salesOrders",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: { value: [] } });
    });
    it("uses default page size of 100 when not provided", async () => {
      getMock.mockResolvedValueOnce({
        data: { value: [], "@odata.nextLink": undefined },
      });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/companies(abc)/items",
        fetchAll: true,
      });
      expect(getMock.mock.calls[0][1].params.$top).toBe("100");
    });
    it("stops after MAX_PAGES (100) to prevent infinite loops", async () => {
      getMock.mockResolvedValue({
        data: {
          value: [{ id: "item" }],
          "@odata.nextLink": "https://api.example.com/next?skiptoken=always",
        },
      });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/companies(abc)/generalLedgerEntries",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(100);
      expect(
        (
          result.data as {
            value: unknown[];
          }
        ).value.length,
      ).toBe(100);
    });
    it("preserves filter params on initial request only", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "1" }],
            "@odata.nextLink": "https://api.example.com/next?skiptoken=tok1",
          },
        })
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "2" }],
          },
        });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/companies(abc)/purchaseOrders",
        params: { $filter: "status eq 'Open'", $orderBy: "number desc" },
        fetchAll: true,
        pageSize: "50",
      });
      expect(getMock.mock.calls[0]).toEqual([
        "/companies(abc)/purchaseOrders",
        {
          params: {
            $filter: "status eq 'Open'",
            $orderBy: "number desc",
            $top: "50",
          },
        },
      ]);
      expect(getMock.mock.calls[1]).toEqual([
        "https://api.example.com/next?skiptoken=tok1",
      ]);
    });
    it("follows Azure ARM-style nextLink (without @odata prefix)", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "1" }],
            nextLink: "https://management.azure.com/next?skip=1",
          },
        })
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "2" }],
          },
        });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/subscriptions/sub1/queues",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(2);
      expect(getMock.mock.calls[1]).toEqual([
        "https://management.azure.com/next?skip=1",
      ]);
      expect(result).toEqual({ data: { value: [{ id: "1" }, { id: "2" }] } });
    });
    it("treats null nextLink as end of results", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          value: [{ id: "1" }],
          "@odata.nextLink": null,
        },
      });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/companies(abc)/items",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: { value: [{ id: "1" }] } });
    });
  });
});
