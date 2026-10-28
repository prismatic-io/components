import type { MockedFunction } from "vitest";
import { getHubspotClient } from "../../client";
import { search } from "./search";
vi.mock("../../client");
const mockedGetHubspotClient = getHubspotClient as MockedFunction<
  typeof getHubspotClient
>;
const context = { debug: { enabled: false } } as never;
const params = (overrides: Record<string, unknown> = {}) =>
  ({
    hubspotConnection: {
      key: "privateAppAccessToken",
      fields: { accessToken: "t" },
    },
    timeout: undefined,
    searchEndpoint: "/crm/v3/objects/contacts/search",
    searchProperties: { query: "ada" },
    objectType: undefined,
    fetchAll: false,
    searchLimit: 10,
    ...overrides,
  }) as never;
const run = async (
  overrides: Record<string, unknown> = {},
  pages: unknown[] = [{ results: [] }],
) => {
  const post = vi.fn();
  for (const page of pages) post.mockResolvedValueOnce({ data: page });
  mockedGetHubspotClient.mockReturnValue({ post } as never);
  const result = await search.perform(context, params(overrides));
  return { post, result };
};
beforeEach(() => vi.clearAllMocks());
describe("search", () => {
  test.each([
    ["a legacy stored value", "/crm/v3/objects/contacts/search"],
    ["a dated stored value", "/crm/objects/2026-09/contacts/search"],
    ["a mixed-case stored value", "/CRM/V3/Objects/Contacts/Search"],
  ])("posts %s to the dated path", async (_, stored) => {
    const { post } = await run({ searchEndpoint: stored });
    expect(post).toHaveBeenCalledWith("/crm/objects/2026-09/contacts/search", {
      limit: 10,
      query: "ada",
    });
  });
  test("substitutes the object type for the custom-objects placeholder", async () => {
    const { post } = await run({
      searchEndpoint: "/crm/v3/objects/{objectType}/search",
      objectType: "p123_equipment",
    });
    expect(post.mock.calls[0][0]).toBe(
      "/crm/objects/2026-09/p123_equipment/search",
    );
  });
  test("requires an object type for the placeholder", async () => {
    await expect(
      run({
        searchEndpoint: "/crm/v3/objects/{objectType}/search",
        objectType: undefined,
      }),
    ).rejects.toThrow("Object Type input is required");
  });
  test("throws on a junk stored value before any request", async () => {
    const post = vi.fn();
    mockedGetHubspotClient.mockReturnValue({ post } as never);
    await expect(
      search.perform(context, params({ searchEndpoint: "/nope" })),
    ).rejects.toThrow(/Unrecognized search endpoint/);
    expect(post).not.toHaveBeenCalled();
  });
  test("keeps paging on the same dated path with fetchAll", async () => {
    const { post, result } = await run({ fetchAll: true }, [
      { results: [{ id: "1" }], paging: { next: { after: "b" } } },
      { results: [{ id: "2" }] },
    ]);
    expect(post.mock.calls.map(([path]) => path)).toEqual([
      "/crm/objects/2026-09/contacts/search",
      "/crm/objects/2026-09/contacts/search",
    ]);
    expect(post.mock.calls[1][1]).toEqual({
      limit: 200,
      after: "b",
      query: "ada",
    });
    expect(
      (
        result as {
          data: {
            results: unknown[];
          };
        }
      ).data.results,
    ).toHaveLength(2);
  });
});
