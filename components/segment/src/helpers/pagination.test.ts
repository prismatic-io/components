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
        sources: [{ id: "src-1" }],
        pagination: { current: "MA==", totalEntries: 1 },
      };
      getMock.mockResolvedValueOnce({ data: response });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sources",
        fetchAll: false,
        count: "50",
      });

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: response });
    });

    it("forwards count and cursor to the API call", async () => {
      getMock.mockResolvedValueOnce({ data: { sources: [] } });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sources",
        fetchAll: false,
        count: "25",
        cursor: "abc123",
      });

      expect(getMock).toHaveBeenCalledWith("/sources", {
        params: {
          pagination: {
            count: "25",
            cursor: "abc123",
          },
        },
      });
    });

    it("forwards extra params alongside pagination", async () => {
      getMock.mockResolvedValueOnce({ data: { functions: [] } });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/functions",
        params: { resourceType: "SOURCE" },
        fetchAll: false,
        count: "10",
        cursor: "xyz",
      });

      const callParams = getMock.mock.calls[0][1].params;
      expect(callParams.resourceType).toBe("SOURCE");
      expect(callParams.pagination).toEqual({
        count: "10",
        cursor: "xyz",
      });
    });

    it("omits cursor when not provided", async () => {
      getMock.mockResolvedValueOnce({ data: { sources: [] } });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sources",
        fetchAll: false,
        count: "50",
      });

      expect(getMock.mock.calls[0][1].params.pagination).toEqual({
        count: "50",
        cursor: undefined,
      });
    });
  });

  describe("fetchAll=true", () => {
    it("accumulates items across multiple pages using cursor", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            destinations: [{ id: "dst-1" }, { id: "dst-2" }],
            pagination: { current: "MA==", next: "Mg==", totalEntries: 3 },
          },
        })
        .mockResolvedValueOnce({
          data: {
            destinations: [{ id: "dst-3" }],
            pagination: { current: "Mg==", totalEntries: 3 },
          },
        });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/destinations",
        fetchAll: true,
        count: "2",
      });

      expect(getMock).toHaveBeenCalledTimes(2);
      expect(getMock.mock.calls[0][1].params.pagination).toEqual({
        count: "2",
        cursor: undefined,
      });
      expect(getMock.mock.calls[1][1].params.pagination).toEqual({
        count: "2",
        cursor: "Mg==",
      });
      expect(result).toEqual({
        data: {
          destinations: [{ id: "dst-1" }, { id: "dst-2" }, { id: "dst-3" }],
        },
      });
    });

    it("handles single page with no next cursor", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          warehouses: [{ id: "wh-1" }],
          pagination: { current: "MA==", totalEntries: 1 },
        },
      });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/warehouses",
        fetchAll: true,
      });

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: { warehouses: [{ id: "wh-1" }] } });
    });

    it("handles empty results", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          sources: [],
          pagination: { current: "MA==", totalEntries: 0 },
        },
      });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sources",
        fetchAll: true,
      });

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: { sources: [] } });
    });

    it("uses default count of 200 when not provided", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          users: [],
          pagination: { current: "MA==", totalEntries: 0 },
        },
      });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/users",
        fetchAll: true,
      });

      expect(getMock.mock.calls[0][1].params.pagination.count).toBe("200");
    });

    it("stops after MAX_PAGES (100) to prevent infinite loops", async () => {
      getMock.mockResolvedValue({
        data: {
          functions: [{ id: "fn-1" }],
          pagination: { current: "MA==", next: "always", totalEntries: 999 },
        },
      });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/functions",
        fetchAll: true,
      });

      expect(getMock).toHaveBeenCalledTimes(100);
      expect((result.data as Record<string, unknown[]>).functions.length).toBe(
        100,
      );
    });

    it("preserves extra params across pages", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            functions: [{ id: "fn-1" }],
            pagination: { current: "MA==", next: "MQ==", totalEntries: 2 },
          },
        })
        .mockResolvedValueOnce({
          data: {
            functions: [{ id: "fn-2" }],
            pagination: { current: "MQ==", totalEntries: 2 },
          },
        });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/functions",
        params: { resourceType: "SOURCE" },
        fetchAll: true,
      });

      expect(getMock.mock.calls[0][1].params.resourceType).toBe("SOURCE");
      expect(getMock.mock.calls[1][1].params.resourceType).toBe("SOURCE");
    });
  });
});
