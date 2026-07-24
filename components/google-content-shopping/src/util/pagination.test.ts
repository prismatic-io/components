import { fetchAllPages } from "./pagination";
describe("fetchAllPages", () => {
  test("returns the items from a single page when there is no next page token", async () => {
    const result = await fetchAllPages(async () => ({
      items: ["a", "b"],
      nextPageToken: undefined,
    }));
    expect(result).toStrictEqual(["a", "b"]);
  });
  test("walks every page and concatenates items until the token is exhausted", async () => {
    const pages: Record<
      string,
      {
        items: string[];
        nextPageToken?: string;
      }
    > = {
      "": { items: ["a"], nextPageToken: "p2" },
      p2: { items: ["b"], nextPageToken: "p3" },
      p3: { items: ["c"], nextPageToken: undefined },
    };
    const result = await fetchAllPages(
      async (pageToken) => pages[pageToken ?? ""],
    );
    expect(result).toStrictEqual(["a", "b", "c"]);
  });
  test("forwards the next page token to each subsequent request", async () => {
    const seenTokens: (string | undefined)[] = [];
    const pages: Record<
      string,
      {
        items: number[];
        nextPageToken?: string;
      }
    > = {
      "": { items: [1], nextPageToken: "second" },
      second: { items: [2], nextPageToken: undefined },
    };
    await fetchAllPages(async (pageToken) => {
      seenTokens.push(pageToken);
      return pages[pageToken ?? ""];
    });
    expect(seenTokens).toStrictEqual([undefined, "second"]);
  });
});
