import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { fetchAllServers } from "./util";

const createMockClient = (getMock: jest.Mock): Pick<HttpClient, "get"> => ({
  get: getMock,
});

describe("fetchAllServers", () => {
  let getMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn();
  });

  it("single page: returns servers when TotalCount <= pageSize", async () => {
    const servers = [{ Name: "Server 1" }, { Name: "Server 2" }];
    getMock.mockResolvedValueOnce({
      data: { Servers: servers, TotalCount: 2 },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllServers(client);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual(servers);
  });

  it("multi-page: accumulates servers across offset pages", async () => {
    const page1 = Array.from({ length: 500 }, (_, i) => ({ Name: `S${i}` }));
    const page2 = [{ Name: "S500" }, { Name: "S501" }];

    getMock
      .mockResolvedValueOnce({
        data: { Servers: page1, TotalCount: 502 },
      })
      .mockResolvedValueOnce({
        data: { Servers: page2, TotalCount: 502 },
      });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllServers(client);

    expect(getMock).toHaveBeenCalledTimes(2);
    expect(result).toHaveLength(502);

    
    expect(getMock.mock.calls[0][1].params.offset).toBe(0);
    expect(getMock.mock.calls[1][1].params.offset).toBe(500);
  });

  it("empty servers: returns empty array", async () => {
    getMock.mockResolvedValueOnce({
      data: { Servers: [], TotalCount: 0 },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    const result = await fetchAllServers(client);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it("name filter: passes through to each request", async () => {
    getMock.mockResolvedValueOnce({
      data: { Servers: [{ Name: "Prod" }], TotalCount: 1 },
    });

    const client = createMockClient(getMock) as unknown as HttpClient;
    await fetchAllServers(client, { name: "Prod" });

    expect(getMock.mock.calls[0][1].params.name).toBe("Prod");
    expect(getMock.mock.calls[0][1].params.count).toBe(500);
  });
});
