import type { Mock } from "vitest";
import { paginateResults } from "./pagination";
const createMockClient = (getMock: Mock) => ({
  get: getMock,
});
describe("paginateResults", () => {
  let getMock: Mock;
  beforeEach(() => {
    getMock = vi.fn();
  });
  describe("fetchAll=false", () => {
    it("makes a single call and returns full response", async () => {
      const response = [{ id: 1, name: "Customer A" }];
      getMock.mockResolvedValueOnce({ data: response });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/customers",
        fetchAll: false,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: response });
    });
    it("forwards $top and $orderby to the API call", async () => {
      getMock.mockResolvedValueOnce({ data: [] });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/customers",
        fetchAll: false,
        pageSize: 50,
      });
      expect(getMock).toHaveBeenCalledWith("/customers", {
        params: { $top: 50, $orderby: "id" },
      });
    });
    it("omits $top when pageSize is not provided", async () => {
      getMock.mockResolvedValueOnce({ data: [] });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/products",
        fetchAll: false,
      });
      expect(getMock).toHaveBeenCalledWith("/products", {
        params: { $top: undefined, $orderby: "id" },
      });
    });
  });
  describe("fetchAll=true", () => {
    it("accumulates items across multiple pages", async () => {
      const page1 = Array.from({ length: 200 }, (_, i) => ({ id: i }));
      const page2 = Array.from({ length: 200 }, (_, i) => ({ id: 200 + i }));
      const page3 = [{ id: 400 }];
      getMock
        .mockResolvedValueOnce({ data: page1 })
        .mockResolvedValueOnce({ data: page2 })
        .mockResolvedValueOnce({ data: page3 });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/customers",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(3);
      expect(getMock.mock.calls[0][1]).toEqual({
        params: { $top: 200, $skip: 0, $orderby: "id" },
      });
      expect(getMock.mock.calls[1][1]).toEqual({
        params: { $top: 200, $skip: 200, $orderby: "id" },
      });
      expect(getMock.mock.calls[2][1]).toEqual({
        params: { $top: 200, $skip: 400, $orderby: "id" },
      });
      expect((result.data as unknown[]).length).toBe(401);
    });
    it("handles single page with fewer results than page size", async () => {
      getMock.mockResolvedValueOnce({
        data: [{ id: 1 }, { id: 2 }],
      });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/products",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [{ id: 1 }, { id: 2 }] });
    });
    it("handles empty results", async () => {
      getMock.mockResolvedValueOnce({ data: [] });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/tax_codes",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [] });
    });
    it("uses custom page size", async () => {
      getMock.mockResolvedValueOnce({ data: [{ id: 1 }] });
      await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/products",
        fetchAll: true,
        pageSize: 50,
      });
      expect(getMock.mock.calls[0][1].params.$top).toBe(50);
    });
    it("stops after MAX_PAGES (100) to prevent infinite loops", async () => {
      const fullPage = Array.from({ length: 200 }, (_, i) => ({ id: i }));
      getMock.mockResolvedValue({ data: fullPage });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/customers",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(100);
      expect((result.data as unknown[]).length).toBe(20000);
    });
    it("handles null data gracefully", async () => {
      getMock.mockResolvedValueOnce({ data: null });
      const result = await paginateResults({
        client: createMockClient(getMock) as any,
        endpoint: "/customers",
        fetchAll: true,
      });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ data: [] });
    });
  });
});
