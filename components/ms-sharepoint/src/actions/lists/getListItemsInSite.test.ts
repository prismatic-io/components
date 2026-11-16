import { type Mock, vi } from "vitest";
import { getListItemsInSite } from "./getListItemsInSite";

const getMock: Mock = vi.fn();

vi.mock("../../client", () => ({
  createClient: vi.fn(async () => ({ get: getMock })),
}));

const connection = { key: "oauth", fields: {}, token: { access_token: "t" } } as never;
const context = { debug: { enabled: false } } as never;

beforeEach(() => {
  getMock.mockReset();
  getMock.mockResolvedValue({ data: { value: [] } });
});

describe("getListItemsInSite", () => {
  test("reads the page size and page token from the pagination group", async () => {
    await getListItemsInSite.perform(context, {
      connection,
      siteId: "site-1",
      listId: "list-1",
      pagination: { pageLimit: 10, pageToken: "token-1" },
      optInFields: "id,fields",
    } as never);

    expect(getMock).toHaveBeenCalledWith("/sites/site-1/lists/list-1/items", {
      params: { $top: 10, $skipToken: "token-1", $select: "id,fields" },
    });
  });
});
