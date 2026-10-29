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
        value: [{ id: "queue-1", name: "my-queue" }],
        nextLink: "https://management.azure.com/next?skip=1",
      };
      getMock.mockResolvedValueOnce({ data: response });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint:
          "/sub/rg/providers/Microsoft.ServiceBus/namespaces/ns/queues?api-version=2021-11-01",
        fetchAll: false,
      });

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: response });
    });

    it("forwards $skip and $top params to the API call", async () => {
      getMock.mockResolvedValueOnce({ data: { value: [] } });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sub/rg/queues?api-version=2021-11-01",
        params: { $skip: "10", $top: "5" },
        fetchAll: false,
      });

      expect(getMock).toHaveBeenCalledWith(
        "/sub/rg/queues?api-version=2021-11-01",
        { params: { $skip: "10", $top: "5" } },
      );
    });

    it("omits params when empty", async () => {
      getMock.mockResolvedValueOnce({ data: { value: [] } });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sub/rg/namespaces?api-version=2021-11-01",
        fetchAll: false,
      });

      expect(getMock).toHaveBeenCalledWith(
        "/sub/rg/namespaces?api-version=2021-11-01",
        { params: undefined },
      );
    });
  });

  describe("fetchAll=true", () => {
    it("accumulates items across multiple pages via nextLink", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "q1" }, { id: "q2" }],
            nextLink: "https://management.azure.com/next?skip=2",
          },
        })
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "q3" }],
          },
        });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sub/rg/queues?api-version=2021-11-01",
        fetchAll: true,
      });

      expect(getMock).toHaveBeenCalledTimes(2);
      expect(getMock.mock.calls[1]).toEqual([
        "https://management.azure.com/next?skip=2",
      ]);
      expect(result).toEqual({
        data: [{ id: "q1" }, { id: "q2" }, { id: "q3" }],
      });
    });

    it("passes params on the initial fetchAll request", async () => {
      getMock.mockResolvedValueOnce({
        data: { value: [{ id: "q1" }] },
      });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sub/rg/queues?api-version=2021-11-01",
        params: { $top: "5" },
        fetchAll: true,
      });

      expect(getMock.mock.calls[0]).toEqual([
        "/sub/rg/queues?api-version=2021-11-01",
        { params: { $top: "5" } },
      ]);
    });

    it("handles single page with no nextLink", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          value: [{ id: "topic-1" }],
        },
      });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sub/rg/topics?api-version=2021-11-01",
        fetchAll: true,
      });

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [{ id: "topic-1" }] });
    });

    it("handles empty results", async () => {
      getMock.mockResolvedValueOnce({
        data: { value: [] },
      });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sub/rg/queues?api-version=2021-11-01",
        fetchAll: true,
      });

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [] });
    });

    it("stops after MAX_PAGES (100) to prevent infinite loops", async () => {
      getMock.mockResolvedValue({
        data: {
          value: [{ id: "item" }],
          nextLink: "https://management.azure.com/next?skip=always",
        },
      });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sub/rg/queues?api-version=2021-11-01",
        fetchAll: true,
      });

      expect(getMock).toHaveBeenCalledTimes(100);
      expect((result.data as unknown[]).length).toBe(100);
    });

    it("treats null nextLink as end of results", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          value: [{ id: "1" }],
          nextLink: null,
        },
      });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/sub/rg/queues?api-version=2021-11-01",
        fetchAll: true,
      });

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [{ id: "1" }] });
    });

    it("follows three pages of results correctly", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "ns-1" }],
            nextLink: "https://management.azure.com/next?skip=1",
          },
        })
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "ns-2" }],
            nextLink: "https://management.azure.com/next?skip=2",
          },
        })
        .mockResolvedValueOnce({
          data: {
            value: [{ id: "ns-3" }],
          },
        });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint:
          "/sub/providers/Microsoft.ServiceBus/namespaces?api-version=2021-11-01",
        fetchAll: true,
      });

      expect(getMock).toHaveBeenCalledTimes(3);
      expect(result).toEqual({
        data: [{ id: "ns-1" }, { id: "ns-2" }, { id: "ns-3" }],
      });
    });
  });
});
