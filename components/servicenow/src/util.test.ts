import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { vi } from "vitest";
import { fetchAllKnowledgeRecords, fetchAllTableRecords } from "./util";
vi.mock("./client", () => ({
  createClient: vi.fn(),
}));
const createMockClient = (
  getMock: ReturnType<typeof vi.fn>,
): Pick<HttpClient, "get"> => ({
  get: getMock as unknown as HttpClient["get"],
});
describe("fetchAllTableRecords", () => {
  let getMock: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    getMock = vi.fn();
  });
  it("single page: returns records when count < pageSize", async () => {
    const records = [{ sys_id: "1" }, { sys_id: "2" }];
    getMock.mockResolvedValueOnce({ data: { result: records } });
    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllTableRecords(client, "/table/incident");
    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(records);
  });
  it("multi-page: accumulates records using offset pagination", async () => {
    const page1 = Array.from({ length: 100 }, (_, i) => ({ sys_id: `${i}` }));
    const page2 = [{ sys_id: "100" }, { sys_id: "101" }];
    getMock
      .mockResolvedValueOnce({ data: { result: page1 } })
      .mockResolvedValueOnce({ data: { result: page2 } });
    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllTableRecords(client, "/table/incident");
    expect(getMock).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(102);
    expect(getMock.mock.calls[0][1].params.sysparm_offset).toBe("0");
    expect(getMock.mock.calls[1][1].params.sysparm_offset).toBe("100");
  });
  it("empty result: returns empty array", async () => {
    getMock.mockResolvedValueOnce({ data: { result: [] } });
    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllTableRecords(client, "/table/incident");
    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
describe("fetchAllKnowledgeRecords", () => {
  let getMock: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    getMock = vi.fn();
  });
  it("single page: returns articles when count < pageSize", async () => {
    const articles = [{ sys_id: "a1", title: "Article 1" }];
    getMock.mockResolvedValueOnce({
      data: { result: { articles } },
    });
    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllKnowledgeRecords(client, "/articles");
    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(articles);
  });
  it("multi-page: accumulates articles using offset pagination", async () => {
    const page1 = Array.from({ length: 100 }, (_, i) => ({
      sys_id: `a${i}`,
    }));
    const page2 = [{ sys_id: "a100" }];
    getMock
      .mockResolvedValueOnce({ data: { result: { articles: page1 } } })
      .mockResolvedValueOnce({ data: { result: { articles: page2 } } });
    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllKnowledgeRecords(client, "/articles");
    expect(getMock).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(101);
    expect(getMock.mock.calls[0][1].params.offset).toBe(0);
    expect(getMock.mock.calls[1][1].params.offset).toBe(100);
  });
  it("empty articles: returns empty array", async () => {
    getMock.mockResolvedValueOnce({
      data: { result: { articles: [] } },
    });
    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllKnowledgeRecords(client, "/articles");
    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
