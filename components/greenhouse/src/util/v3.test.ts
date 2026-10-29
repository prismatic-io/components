import type { Connection } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { fetchAllV3, getV3Token, paginateV3 } from "./v3";

interface FakeResponse {
  data: unknown;
  headers: Record<string, string>;
}

const makeClient = (queue: Array<FakeResponse | { throw429: string }>) => {
  const get = vi.fn(async () => {
    const next = queue.shift();
    if (next && "throw429" in next) {
      throw {
        response: {
          status: 429,
          headers: { "retry-after": next.throw429 },
        },
      };
    }
    return next;
  });
  return { client: { get } as unknown as HttpClient, get };
};

describe("fetchAllV3", () => {
  test("follows Link rel=next without resending params", async () => {
    const nextUrl = "https://harvest.greenhouse.io/v3/users?cursor=abc";
    const { client, get } = makeClient([
      {
        data: [{ id: 1 }, { id: 2 }],
        headers: { link: `<${nextUrl}>; rel="next"` },
      },
      { data: [{ id: 3 }], headers: {} },
    ]);

    const results = await fetchAllV3(client, "/users", { deactivated: false });

    expect(results).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
    expect(get).toHaveBeenCalledTimes(2);
    expect(get).toHaveBeenNthCalledWith(1, "/users", {
      params: { per_page: 500, deactivated: false },
    });
    expect(get).toHaveBeenNthCalledWith(2, nextUrl, { params: undefined });
  });

  test("stops when no rel=next link is present", async () => {
    const { client, get } = makeClient([{ data: [{ id: 1 }], headers: {} }]);

    const results = await fetchAllV3(client, "/jobs");

    expect(results).toEqual([{ id: 1 }]);
    expect(get).toHaveBeenCalledTimes(1);
  });

  test("retries once on 429 honoring Retry-After", async () => {
    const { client, get } = makeClient([
      { throw429: "1" },
      { data: [{ id: 7 }], headers: {} },
    ]);

    const results = await fetchAllV3(client, "/candidates");

    expect(results).toEqual([{ id: 7 }]);
    expect(get).toHaveBeenCalledTimes(2);
  });

  test("rethrows non-429 errors", async () => {
    const get = vi.fn(async () => {
      throw { response: { status: 401 } };
    });
    const client = { get } as unknown as HttpClient;

    await expect(fetchAllV3(client, "/users")).rejects.toEqual({
      response: { status: 401 },
    });
    expect(get).toHaveBeenCalledTimes(1);
  });
});

describe("paginateV3", () => {
  test("fetchAll walks every page and ignores perPage/cursor", async () => {
    const nextUrl = "https://harvest.greenhouse.io/v3/jobs?cursor=abc";
    const { client, get } = makeClient([
      { data: [{ id: 1 }], headers: { link: `<${nextUrl}>; rel="next"` } },
      { data: [{ id: 2 }], headers: {} },
    ]);

    const data = await paginateV3(client, "/jobs", true, {
      perPage: 10,
      cursor: "ignored",
      params: { status: "open" },
    });

    expect(data).toEqual([{ id: 1 }, { id: 2 }]);
    expect(get).toHaveBeenNthCalledWith(1, "/jobs", {
      params: { per_page: 500, status: "open" },
    });
  });

  test("single page sends filters plus perPage when no cursor", async () => {
    const { client, get } = makeClient([{ data: [{ id: 1 }], headers: {} }]);

    const data = await paginateV3(client, "/jobs", false, {
      perPage: 25,
      params: { status: "open" },
    });

    expect(data).toEqual([{ id: 1 }]);
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("/jobs", {
      params: { status: "open", per_page: 25 },
    });
  });

  test("cursor request carries ONLY the cursor", async () => {
    const { client, get } = makeClient([{ data: [{ id: 9 }], headers: {} }]);

    const data = await paginateV3(client, "/jobs", false, {
      cursor: "eyJwYWdlIjoyfQ",
      params: { status: "open" },
    });

    expect(data).toEqual([{ id: 9 }]);
    expect(get).toHaveBeenCalledWith("/jobs", {
      params: { cursor: "eyJwYWdlIjoyfQ" },
    });
  });

  test("single page honors Retry-After on a 429", async () => {
    const { client, get } = makeClient([
      { throw429: "1" },
      { data: [{ id: 7 }], headers: {} },
    ]);

    const data = await paginateV3(client, "/candidates", false, {});

    expect(data).toEqual([{ id: 7 }]);
    expect(get).toHaveBeenCalledTimes(2);
  });
});

const makeConnection = (
  token: Record<string, unknown> | undefined,
): Connection =>
  ({
    key: "oauth2ClientCredentials",
    configVarKey: "greenhouse",
    fields: { clientId: "id", clientSecret: "secret" },
    token,
  }) as unknown as Connection;

describe("getV3Token", () => {
  test("returns the platform-managed access token", () => {
    const connection = makeConnection({ access_token: "test-token" });

    expect(getV3Token(connection)).toBe("test-token");
  });

  test("throws a connection error when the token is missing", () => {
    const connection = makeConnection(undefined);

    expect(() => getV3Token(connection)).toThrow(
      /does not contain a valid access token/,
    );
  });

  test("throws a connection error when the token is empty", () => {
    const connection = makeConnection({ access_token: "" });

    expect(() => getV3Token(connection)).toThrow(
      /does not contain a valid access token/,
    );
  });
});
