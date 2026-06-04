import { util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  aggregateTemplatesAcrossWorkspaces,
  DEFAULT_AGGREGATION_CONCURRENCY,
} from "./templates";




const makeMockClientByUrl = (
  urlMap: Record<string, Array<Record<string, unknown>>>,
): HttpClient => {
  const callCounts: Record<string, number> = {};
  return {
    get: jest.fn(async (url: string) => {
      const queue = urlMap[url] ?? [];
      const idx = callCounts[url] ?? 0;
      callCounts[url] = idx + 1;
      const body = queue[idx] ?? queue[queue.length - 1] ?? { data: [] };
      return { data: body };
    }),
  } as unknown as HttpClient;
};


const makeConstantClient = (body: Record<string, unknown>): HttpClient =>
  ({
    get: jest.fn(async () => ({ data: body })),
  }) as unknown as HttpClient;



describe("aggregateTemplatesAcrossWorkspaces", () => {
  
  it("returns empty array when workspace list is empty", async () => {
    const client = makeConstantClient({ data: [] });
    const result = await aggregateTemplatesAcrossWorkspaces(client);
    expect(result).toEqual([]);
    
    expect((client.get as jest.Mock).mock.calls).toHaveLength(1);
  });

  
  it("filters /children results to items with type === 'template'", async () => {
    const client = makeMockClientByUrl({
      "/workspaces": [{ data: [{ id: 10 }, { id: 20 }] }],
      "/workspaces/10/children": [
        {
          data: [
            { id: 101, type: "sheet", name: "Sheet A" },
            { id: 102, type: "template", name: "Template A" },
          ],
        },
      ],
      "/workspaces/20/children": [
        {
          data: [
            { id: 201, type: "folder", name: "Folder B" },
            { id: 202, type: "template", name: "Template B" },
            { id: 203, type: "template", name: "Template C" },
          ],
        },
      ],
    });

    const result = await aggregateTemplatesAcrossWorkspaces(client);

    expect(result).toHaveLength(3);
    expect(result.map((t) => t.name)).toEqual([
      "Template A",
      "Template B",
      "Template C",
    ]);
    
    expect(result.every((t) => t.type === "template")).toBe(true);
  });

  
  it(`executes per-workspace /children calls in chunks of ${DEFAULT_AGGREGATION_CONCURRENCY}`, async () => {
    
    const totalWorkspaces = 13;
    const workspaces = Array.from({ length: totalWorkspaces }, (_, i) => ({
      id: i + 1,
    }));

    
    const callOrder: number[] = [];
    const resolutionOrder: number[] = [];

    const client: HttpClient = {
      get: jest.fn(async (url: string) => {
        if (url === "/workspaces") {
          return { data: { data: workspaces } };
        }
        
        const match = url.match(/\/workspaces\/(\d+)\/children/);
        const id = match ? util.types.toInt(match[1]) : -1;
        callOrder.push(id);
        
        await Promise.resolve();
        resolutionOrder.push(id);
        return {
          data: {
            data: [{ id: id * 100, type: "template", name: `T${id}` }],
          },
        };
      }),
    } as unknown as HttpClient;

    const result = await aggregateTemplatesAcrossWorkspaces(client);

    expect(result).toHaveLength(totalWorkspaces);

    
    const batchOne = callOrder.slice(0, 5);
    const batchTwo = callOrder.slice(5, 10);
    const batchThree = callOrder.slice(10, 13);

    expect(batchOne).toHaveLength(5);
    expect(batchTwo).toHaveLength(5);
    expect(batchThree).toHaveLength(3);

    
    expect(batchOne).toEqual([1, 2, 3, 4, 5]);
    expect(batchTwo).toEqual([6, 7, 8, 9, 10]);
    expect(batchThree).toEqual([11, 12, 13]);
  });

  
  it("rejects immediately when a per-workspace /children call fails", async () => {
    const workspaces = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const client: HttpClient = {
      get: jest.fn(async (url: string) => {
        if (url === "/workspaces") {
          return { data: { data: workspaces } };
        }
        if (url === "/workspaces/2/children") {
          throw new Error("HTTP 500 Internal Server Error");
        }
        return { data: { data: [] } };
      }),
    } as unknown as HttpClient;

    await expect(aggregateTemplatesAcrossWorkspaces(client)).rejects.toThrow(
      "HTTP 500",
    );
  });

  
  it("preserves workspace order and within-workspace item order", async () => {
    const client = makeMockClientByUrl({
      "/workspaces": [{ data: [{ id: 1 }, { id: 2 }] }],
      "/workspaces/1/children": [
        {
          data: [
            { id: 11, type: "template", name: "T1-A" },
            { id: 12, type: "template", name: "T1-B" },
          ],
        },
      ],
      "/workspaces/2/children": [
        {
          data: [{ id: 21, type: "template", name: "T2-A" }],
        },
      ],
    });

    const result = await aggregateTemplatesAcrossWorkspaces(client);

    expect(result.map((t) => t.name)).toEqual(["T1-A", "T1-B", "T2-A"]);
  });

  
  it("handles workspaces that have no templates without error", async () => {
    const client = makeMockClientByUrl({
      "/workspaces": [{ data: [{ id: 1 }, { id: 2 }] }],
      "/workspaces/1/children": [
        { data: [{ id: 11, type: "sheet", name: "Sheet" }] },
      ],
      "/workspaces/2/children": [
        { data: [{ id: 21, type: "template", name: "Template A" }] },
      ],
    });

    const result = await aggregateTemplatesAcrossWorkspaces(client);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Template A");
  });

  
  
  
  
  it("processes all 13 workspace /children calls and returns combined results", async () => {
    const totalWorkspaces = 13;
    const workspaces = Array.from({ length: totalWorkspaces }, (_, i) => ({
      id: i + 1,
    }));

    const client = makeMockClientByUrl({
      "/workspaces": [{ data: workspaces }],
      ...Object.fromEntries(
        workspaces.map((w) => [
          `/workspaces/${w.id}/children`,
          [{ data: [{ id: w.id * 100, type: "template", name: `T${w.id}` }] }],
        ]),
      ),
    });

    const result = await aggregateTemplatesAcrossWorkspaces(client);

    
    expect(result).toHaveLength(totalWorkspaces);
    
    expect((client.get as jest.Mock).mock.calls).toHaveLength(
      totalWorkspaces + 1,
    );
  });

  
  it("exports DEFAULT_AGGREGATION_CONCURRENCY as a positive number", () => {
    expect(typeof DEFAULT_AGGREGATION_CONCURRENCY).toBe("number");
    expect(DEFAULT_AGGREGATION_CONCURRENCY).toBeGreaterThan(0);
  });
});
