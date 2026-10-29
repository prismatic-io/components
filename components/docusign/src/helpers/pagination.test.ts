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
        envelopeTemplates: [{ templateId: "1" }],
        resultSetSize: "1",
        totalSetSize: "1",
      };
      getMock.mockResolvedValueOnce({ data: response });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/templates",
        fetchAll: false,
        itemsKey: "envelopeTemplates",
      });

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: response });
    });

    it("forwards count and start_position to the API call", async () => {
      getMock.mockResolvedValueOnce({ data: { folders: [] } });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/folders",
        fetchAll: false,
        count: "25",
        startPosition: "50",
        itemsKey: "folders",
      });

      const callParams = getMock.mock.calls[0][1].params;
      expect(callParams.count).toBe("25");
      expect(callParams.start_position).toBe("50");
    });

    it("forwards extra params alongside pagination params", async () => {
      getMock.mockResolvedValueOnce({ data: { folders: [] } });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/folders",
        params: { include: "normal_folders", user_filter: "owned_by_me" },
        fetchAll: false,
        count: "10",
        startPosition: "0",
        itemsKey: "folders",
      });

      const callParams = getMock.mock.calls[0][1].params;
      expect(callParams.include).toBe("normal_folders");
      expect(callParams.user_filter).toBe("owned_by_me");
      expect(callParams.count).toBe("10");
      expect(callParams.start_position).toBe("0");
    });

    it("omits pagination params when not provided", async () => {
      getMock.mockResolvedValueOnce({ data: { templates: [] } });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/templates",
        fetchAll: false,
        itemsKey: "envelopeTemplates",
      });

      const callParams = getMock.mock.calls[0][1].params;
      expect(callParams.count).toBeUndefined();
      expect(callParams.start_position).toBeUndefined();
    });
  });

  describe("fetchAll=true", () => {
    it("accumulates items across multiple pages", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            envelopeTemplates: [{ templateId: "1" }, { templateId: "2" }],
            resultSetSize: "2",
            totalSetSize: "3",
            startPosition: "0",
            endPosition: "1",
          },
        })
        .mockResolvedValueOnce({
          data: {
            envelopeTemplates: [{ templateId: "3" }],
            resultSetSize: "1",
            totalSetSize: "3",
            startPosition: "2",
            endPosition: "2",
          },
        });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/templates",
        fetchAll: true,
        count: "2",
        itemsKey: "envelopeTemplates",
      });

      expect(getMock).toHaveBeenCalledTimes(2);
      expect(getMock.mock.calls[0][1].params.count).toBe("2");
      expect(getMock.mock.calls[0][1].params.start_position).toBe("0");
      expect(getMock.mock.calls[1][1].params.start_position).toBe("2");
      expect(result).toEqual({
        data: [{ templateId: "1" }, { templateId: "2" }, { templateId: "3" }],
      });
    });

    it("handles single page with fewer results than count", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          folders: [{ folderId: "1" }],
          resultSetSize: "1",
          totalSetSize: "1",
        },
      });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/folders",
        fetchAll: true,
        itemsKey: "folders",
      });

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [{ folderId: "1" }] });
    });

    it("handles empty results", async () => {
      getMock.mockResolvedValueOnce({
        data: {
          envelopeTemplates: [],
          resultSetSize: "0",
          totalSetSize: "0",
        },
      });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/templates",
        fetchAll: true,
        itemsKey: "envelopeTemplates",
      });

      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [] });
    });

    it("stops after MAX_PAGES (100) to prevent infinite loops", async () => {
      const fullPage = Array.from({ length: 100 }, (_, i) => ({
        templateId: `${i}`,
      }));
      getMock.mockResolvedValue({
        data: {
          envelopeTemplates: fullPage,
          resultSetSize: "100",
          totalSetSize: "999999",
        },
      });

      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/templates",
        fetchAll: true,
        itemsKey: "envelopeTemplates",
      });

      expect(getMock).toHaveBeenCalledTimes(100);
      expect((result.data as unknown[]).length).toBe(10000);
    });

    it("preserves extra params across pages", async () => {
      getMock
        .mockResolvedValueOnce({
          data: {
            folders: [{ folderId: "1" }],
            resultSetSize: "1",
            totalSetSize: "2",
          },
        })
        .mockResolvedValueOnce({
          data: {
            folders: [],
            resultSetSize: "0",
            totalSetSize: "2",
          },
        });

      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/folders",
        params: { include: "normal_folders", user_filter: "all" },
        fetchAll: true,
        itemsKey: "folders",
        count: "1",
      });

      expect(getMock.mock.calls[0][1].params.include).toBe("normal_folders");
      expect(getMock.mock.calls[0][1].params.user_filter).toBe("all");
    });
  });
});
