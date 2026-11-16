import { type Mock, vi } from "vitest";
import { listChanges } from "./listChanges";

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

describe("listChanges", () => {
  test("reads the OData options from the query parameters group", async () => {
    await listChanges.perform(context, {
      connection,
      deltaURL: "/drives/drive-1/root/delta",
      fetchAll: false,
      queryParameters: { $select: "id,name", $expand: "thumbnails", $top: 5 },
    } as never);

    expect(getMock).toHaveBeenCalledWith("/drives/drive-1/root/delta", {
      params: { $expand: "thumbnails", $select: "id,name", $top: 5 },
      headers: { Prefer: "deltaExcludeParent" },
    });
  });
});
