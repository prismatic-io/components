import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  MAX_ITERATIONS_DEFAULT,
  MAX_PAGE_SIZE_DEFAULT,
  PaginationGuardError,
  paginateByPage,
  paginateByToken,
  TOKEN_MAX_ITEMS_DEFAULT,
} from "./pagination";



const makeMockClient = (
  responses: Array<Record<string, unknown>>,
): HttpClient => {
  let call = 0;
  return {
    get: jest.fn(async () => {
      const body = responses[call] ?? responses[responses.length - 1];
      call++;
      return { data: body };
    }),
  } as unknown as HttpClient;
};

const makeInfiniteTokenClient = (): HttpClient => {
  let call = 0;
  return {
    get: jest.fn(async () => {
      const key = `key-${call}`;
      call++;
      return { data: { data: [{ id: call }], lastKey: key } };
    }),
  } as unknown as HttpClient;
};

const makeErrorClient = (
  responses: Array<Record<string, unknown> | Error>,
): HttpClient => {
  let call = 0;
  return {
    get: jest.fn(async () => {
      const entry = responses[call] ?? responses[responses.length - 1];
      call++;
      if (entry instanceof Error) throw entry;
      return { data: entry };
    }),
  } as unknown as HttpClient;
};



describe("paginateByToken", () => {
  
  it("S-A-01: accumulates items across pages, stops when lastKey absent on final page", async () => {
    const client = makeMockClient([
      { data: [{ id: 1 }, { id: 2 }, { id: 3 }], lastKey: "abc" },
      { data: [{ id: 4 }, { id: 5 }] },
    ]);
    const result = await paginateByToken(client, "/workspaces");
    expect(result).toHaveLength(5);
    expect(result).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ]);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(2);
  });

  
  it("S-A-02: stops after single page when lastKey is null", async () => {
    const client = makeMockClient([
      {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        lastKey: null,
      },
    ]);
    const result = await paginateByToken(client, "/workspaces");
    expect(result).toHaveLength(5);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(1);
  });

  
  it("S-A-03: stops after single page when lastKey is empty string", async () => {
    const client = makeMockClient([
      {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        lastKey: "",
      },
    ]);
    const result = await paginateByToken(client, "/workspaces");
    expect(result).toHaveLength(5);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(1);
  });

  
  it("S-A-04: empty first page returns empty array without error", async () => {
    const client = makeMockClient([{ data: [] }]);
    const result = await paginateByToken(client, "/workspaces");
    expect(result).toEqual([]);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(1);
  });

  
  it("S-A-05: throws PaginationGuardError after MAX_ITERATIONS_DEFAULT iterations", async () => {
    
    
    const client = makeInfiniteTokenClient();
    const err = await paginateByToken(client, "/workspaces").catch((e) => e);
    expect(err).toBeInstanceOf(PaginationGuardError);
    expect(err.code).toBe("SMARTSHEET_PAGINATION_GUARD");
    expect((client.get as jest.Mock).mock.calls.length).toBe(
      MAX_ITERATIONS_DEFAULT,
    );
  });

  
  it("S-A-06: clamps caller-supplied maxIterations above ceiling to MAX_ITERATIONS_DEFAULT", async () => {
    const client = makeInfiniteTokenClient();
    const err = await paginateByToken(client, "/workspaces", {
      maxIterations: 9999,
    }).catch((e) => e);
    expect(err).toBeInstanceOf(PaginationGuardError);
    expect((client.get as jest.Mock).mock.calls.length).toBe(
      MAX_ITERATIONS_DEFAULT,
    );
  });

  
  it("S-A-07: mid-loop HTTP error propagates immediately without returning partial data", async () => {
    const client = makeErrorClient([
      { data: [{ id: 1 }], lastKey: "k1" },
      new Error("HTTP 500 Internal Server Error"),
    ]);
    await expect(paginateByToken(client, "/workspaces")).rejects.toThrow(
      "HTTP 500",
    );
  });

  
  it("S-A-08: sends paginationType=token and maxItems on every request; includes lastKey on subsequent calls", async () => {
    const client = makeMockClient([
      { data: [{ id: 1 }], lastKey: "xyz" },
      { data: [{ id: 2 }] },
    ]);
    await paginateByToken(client, "/workspaces");
    const calls = (client.get as jest.Mock).mock.calls;
    expect(calls[0][1].params).toMatchObject({
      paginationType: "token",
      maxItems: TOKEN_MAX_ITEMS_DEFAULT,
    });
    expect(calls[0][1].params.lastKey).toBeUndefined();
    expect(calls[1][1].params).toMatchObject({
      paginationType: "token",
      maxItems: TOKEN_MAX_ITEMS_DEFAULT,
      lastKey: "xyz",
    });
  });

  
  it("S-A-09: exits cleanly when server returns same lastKey on consecutive pages", async () => {
    const client = makeMockClient([
      { data: [{ id: 1 }], lastKey: "X" },
      { data: [{ id: 2 }], lastKey: "X" },
    ]);
    const result = await paginateByToken(client, "/workspaces");
    expect(result).toHaveLength(2);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(2);
  });

  
  it("S-A-10: merges caller query params into every request without overwriting paginator params", async () => {
    const client = makeMockClient([
      { data: [{ id: 1 }], lastKey: "k1" },
      { data: [{ id: 2 }] },
    ]);
    await paginateByToken(client, "/workspaces", {
      query: { modifiedSince: "2026-01-01" },
    });
    const calls = (client.get as jest.Mock).mock.calls;
    expect(calls[0][1].params).toMatchObject({ modifiedSince: "2026-01-01" });
    expect(calls[1][1].params).toMatchObject({ modifiedSince: "2026-01-01" });
  });

  
  it("S-A-11: propagates HTTP 429 immediately without retrying", async () => {
    const client = makeErrorClient([
      { data: [{ id: 1 }], lastKey: "k1" },
      new Error("HTTP 429 Too Many Requests"),
    ]);
    await expect(paginateByToken(client, "/workspaces")).rejects.toThrow("429");
    expect((client.get as jest.Mock).mock.calls).toHaveLength(2);
  });

  
  it("S-A-12: accepts a valid custom maxItems (multiple of 100, within range)", async () => {
    const client = makeMockClient([{ data: [{ id: 1 }] }]);
    await paginateByToken(client, "/workspaces", { maxItems: 500 });
    const params = (client.get as jest.Mock).mock.calls[0][1].params;
    expect(params.maxItems).toBe(500);
  });

  it("S-A-12b: rejects maxItems below 100", async () => {
    const client = makeMockClient([{ data: [] }]);
    await expect(
      paginateByToken(client, "/workspaces", { maxItems: 50 }),
    ).rejects.toThrow(/multiple of 100/);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(0);
  });

  it("S-A-12c: rejects maxItems above 1000", async () => {
    const client = makeMockClient([{ data: [] }]);
    await expect(
      paginateByToken(client, "/workspaces", { maxItems: 10000 }),
    ).rejects.toThrow(/multiple of 100/);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(0);
  });

  it("S-A-12d: rejects maxItems not a multiple of 100", async () => {
    const client = makeMockClient([{ data: [] }]);
    await expect(
      paginateByToken(client, "/workspaces", { maxItems: 750 }),
    ).rejects.toThrow(/multiple of 100/);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(0);
  });
});



describe("paginateByPage", () => {
  
  it("S-B-01: accumulates items across pages, stops when page is shorter than pageSize", async () => {
    const page1Items = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
    const page2Items = Array.from({ length: 7 }, (_, i) => ({ id: 10000 + i }));
    const client = makeMockClient([{ data: page1Items }, { data: page2Items }]);
    const result = await paginateByPage(client, "/webhooks");
    expect(result).toHaveLength(10007);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(2);
  });

  
  it("S-B-02: stops when totalPages is reached even if page is full", async () => {
    const fullPage = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
    const client = makeMockClient([{ data: fullPage, totalPages: 1 }]);
    const result = await paginateByPage(client, "/webhooks");
    expect(result).toHaveLength(10000);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(1);
  });

  
  it("S-B-03: empty first page returns empty array", async () => {
    const client = makeMockClient([{ data: [] }]);
    const result = await paginateByPage(client, "/webhooks");
    expect(result).toEqual([]);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(1);
  });

  
  it("S-B-04: falls back to short-page rule when totalPages is absent", async () => {
    const page1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
    const page2 = Array.from({ length: 50 }, (_, i) => ({ id: 10000 + i }));
    const client = makeMockClient([{ data: page1 }, { data: page2 }]);
    const result = await paginateByPage(client, "/webhooks");
    expect(result).toHaveLength(10050);
    expect((client.get as jest.Mock).mock.calls).toHaveLength(2);
  });

  
  it("S-B-05: throws PaginationGuardError after MAX_ITERATIONS_DEFAULT iterations when pages never end", async () => {
    const fullPage = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
    const client = makeMockClient([{ data: fullPage }]);
    const err = await paginateByPage(client, "/webhooks").catch((e) => e);
    expect(err).toBeInstanceOf(PaginationGuardError);
    expect(err.code).toBe("SMARTSHEET_PAGINATION_GUARD");
    expect((client.get as jest.Mock).mock.calls.length).toBe(
      MAX_ITERATIONS_DEFAULT,
    );
  });

  
  it("S-B-06: substitutes pageSize=0 with MAX_PAGE_SIZE_DEFAULT and does not throw", async () => {
    const client = makeMockClient([{ data: [{ id: 1 }] }]);
    
    const result = await paginateByPage(client, "/webhooks", { pageSize: 0 });
    expect(result).toEqual([{ id: 1 }]);
    const params = (client.get as jest.Mock).mock.calls[0][1].params;
    expect(params.pageSize).toBe(MAX_PAGE_SIZE_DEFAULT);
  });

  
  it("S-B-07: mid-loop HTTP error propagates immediately without returning partial data", async () => {
    const page1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
    const client = makeErrorClient([
      { data: page1 },
      new Error("HTTP 403 Forbidden"),
    ]);
    await expect(paginateByPage(client, "/webhooks")).rejects.toThrow("403");
  });

  
  it("S-B-08: request params contain only page and pageSize (no includeAll/paginationType/maxItems/lastKey)", async () => {
    const client = makeMockClient([{ data: [{ id: 1 }] }]);
    await paginateByPage(client, "/webhooks");
    const params = (client.get as jest.Mock).mock.calls[0][1].params;
    expect(params.page).toBe(1);
    expect(params.pageSize).toBe(MAX_PAGE_SIZE_DEFAULT);
    expect(params.includeAll).toBeUndefined();
    expect(params.paginationType).toBeUndefined();
    expect(params.maxItems).toBeUndefined();
    expect(params.lastKey).toBeUndefined();
  });

  
  it("S-B-09: merges caller query params into every request", async () => {
    const page1 = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
    const page2 = [{ id: 10000 }];
    const client = makeMockClient([{ data: page1 }, { data: page2 }]);
    await paginateByPage(client, "/webhooks", {
      query: { modifiedSince: "2025-01-01" },
    });
    const calls = (client.get as jest.Mock).mock.calls;
    expect(calls[0][1].params).toMatchObject({ modifiedSince: "2025-01-01" });
    expect(calls[1][1].params).toMatchObject({ modifiedSince: "2025-01-01" });
  });

  
  it("increments page number correctly across pages", async () => {
    const fullPage = Array.from({ length: 10000 }, (_, i) => ({ id: i }));
    const client = makeMockClient([
      { data: fullPage },
      { data: fullPage },
      { data: [{ id: 99 }] },
    ]);
    await paginateByPage(client, "/webhooks");
    const calls = (client.get as jest.Mock).mock.calls;
    expect(calls[0][1].params.page).toBe(1);
    expect(calls[1][1].params.page).toBe(2);
    expect(calls[2][1].params.page).toBe(3);
  });
});
