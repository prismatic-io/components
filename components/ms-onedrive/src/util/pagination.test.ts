import { vi } from "vitest";
import { fetchAllPages } from "./pagination";

describe("fetchAllPages", () => {
  test("sends the params on the first request only and follows @odata.nextLink", async () => {
    const nextLink = "https://graph.microsoft.com/v1.0/sites?$skiptoken=abc";
    const get = vi
      .fn()
      .mockResolvedValueOnce({
        data: { value: [{ id: "s1" }], "@odata.nextLink": nextLink },
      })
      .mockResolvedValueOnce({ data: { value: [{ id: "s2" }] } });

    const items = await fetchAllPages({ get } as never, "/sites", {
      search: "",
    });

    expect(get).toHaveBeenNthCalledWith(1, "/sites", {
      params: { search: "" },
    });
    expect(get).toHaveBeenNthCalledWith(2, nextLink, { params: undefined });
    expect(items).toEqual([{ id: "s1" }, { id: "s2" }]);
  });

  test("returns an empty list when the reply has no value", async () => {
    const get = vi.fn().mockResolvedValue({ data: {} });

    expect(await fetchAllPages({ get } as never, "/sites")).toEqual([]);
  });
});
