import { type Mock, vi } from "vitest";
import { listDrives } from "./listDrives";

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

describe("listDrives", () => {
  test("reads the page size and page token from the pagination group", async () => {
    await listDrives.perform(context, {
      connection,
      siteId: "site-1",
      fetchAll: false,
      pagination: { pageLimit: 10, pageToken: "token-1" },
    } as never);

    expect(getMock).toHaveBeenCalledWith("/sites/site-1/drives", {
      params: { $top: 10, $skipToken: "token-1" },
    });
  });

  test("surfaces the next page token from Graph's nextLink", async () => {
    getMock.mockResolvedValue({
      data: {
        value: [],
        "@odata.nextLink":
          "https://graph.microsoft.com/v1.0/sites/site-1/drives?$skiptoken=X%2744537079ghv",
      },
    });

    const { data } = await listDrives.perform(context, {
      connection,
      siteId: "site-1",
      fetchAll: false,
      pagination: { pageLimit: 10, pageToken: undefined },
    } as never);

    expect(data["@odata.nextToken"]).toBe("X'44537079ghv");
  });
});
