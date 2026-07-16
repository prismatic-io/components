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
      const response = { data: [{ id: "1" }], total: 1 };
      getMock.mockResolvedValueOnce({ data: response });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/person/v4/people",
        params: { search: "John" },
        fetchAll: false,
        limit: 20,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: response });
    });
    it("forwards limit and offset to the API call", async () => {
      getMock.mockResolvedValueOnce({ data: { data: [], total: 0 } });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/staffing/v6/workers",
        fetchAll: false,
        limit: 25,
        offset: 50,
      });
      expect(getMock).toHaveBeenCalledWith("/staffing/v6/workers", {
        params: { limit: 25, offset: 50 },
      });
    });
    it("forwards extra params alongside limit and offset", async () => {
      getMock.mockResolvedValueOnce({ data: { data: [], total: 0 } });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/person/v4/people",
        params: { search: "engineer" },
        fetchAll: false,
        limit: 10,
        offset: 20,
      });
      expect(getMock).toHaveBeenCalledWith("/person/v4/people", {
        params: { search: "engineer", limit: 10, offset: 20 },
      });
    });
    it("passes undefined offset when not provided", async () => {
      getMock.mockResolvedValueOnce({ data: { data: [], total: 0 } });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/staffing/v6/workers",
        fetchAll: false,
        limit: 50,
      });
      const callParams = getMock.mock.calls[0][1].params;
      expect(callParams.limit).toBe(50);
      expect(callParams.offset).toBeUndefined();
    });
  });
  describe("fetchAll=true", () => {
    it("accumulates items across multiple pages", async () => {
      const page1 = Array.from({ length: 100 }, (_, i) => ({ id: `p${i}` }));
      const page2 = Array.from({ length: 100 }, (_, i) => ({
        id: `p${100 + i}`,
      }));
      const page3 = [{ id: "p200" }];
      getMock
        .mockResolvedValueOnce({ data: { data: page1, total: 201 } })
        .mockResolvedValueOnce({ data: { data: page2, total: 201 } })
        .mockResolvedValueOnce({ data: { data: page3, total: 201 } });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/person/v4/people",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(3);
      expect(getMock.mock.calls[0][1].params).toEqual({
        limit: 100,
        offset: 0,
      });
      expect(getMock.mock.calls[1][1].params).toEqual({
        limit: 100,
        offset: 100,
      });
      expect(getMock.mock.calls[2][1].params).toEqual({
        limit: 100,
        offset: 200,
      });
      expect((result.data as unknown[]).length).toBe(201);
    });
    it("handles single page with fewer results than limit", async () => {
      getMock.mockResolvedValueOnce({
        data: { data: [{ id: "1" }], total: 1 },
      });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/staffing/v6/workers",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [{ id: "1" }] });
    });
    it("handles empty results", async () => {
      getMock.mockResolvedValueOnce({
        data: { data: [], total: 0 },
      });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/person/v4/people",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [] });
    });
    it("preserves extra params across pages", async () => {
      const page1 = Array.from({ length: 100 }, (_, i) => ({ id: `w${i}` }));
      const page2 = [{ id: "w100" }];
      getMock
        .mockResolvedValueOnce({ data: { data: page1, total: 101 } })
        .mockResolvedValueOnce({ data: { data: page2, total: 101 } });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/staffing/v6/workers",
        params: { search: "engineer" },
        fetchAll: true,
      });
      expect(getMock.mock.calls[0][1].params).toEqual({
        search: "engineer",
        limit: 100,
        offset: 0,
      });
      expect(getMock.mock.calls[1][1].params).toEqual({
        search: "engineer",
        limit: 100,
        offset: 100,
      });
    });
    it("stops after MAX_PAGES (100) to prevent infinite loops", async () => {
      const fullPage = Array.from({ length: 100 }, (_, i) => ({ id: `p${i}` }));
      getMock.mockResolvedValue({ data: { data: fullPage, total: 999999 } });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/person/v4/people",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(100);
      expect((result.data as unknown[]).length).toBe(10000);
    });
    it("handles null data gracefully", async () => {
      getMock.mockResolvedValueOnce({
        data: { data: null, total: 0 },
      });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/person/v4/people",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [] });
    });
  });
});
