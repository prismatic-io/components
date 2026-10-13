import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { fetchAtomEntries } from "./atomFeed";
const makeAtomXml = (
  entries: {
    id: string;
    updated: string;
  }[],
): string => {
  const entryXml = entries
    .map(
      (e) => `<entry>
      <id>${e.id}</id>
      <updated>${e.updated}</updated>
      <published>${e.updated}</published>
      <content type="application/xml">
        <TestFeed_Context>
          <ChangedAttributes><Attribute>Name</Attribute></ChangedAttributes>
        </TestFeed_Context>
      </content>
    </entry>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  ${entryXml}
</feed>`;
};
describe("fetchAtomEntries", () => {
  test("returns all entries from a single page when count < pageSize", async () => {
    const xml = makeAtomXml([
      { id: "e1", updated: "2026-01-01T00:00:00Z" },
      { id: "e2", updated: "2026-01-02T00:00:00Z" },
    ]);
    const client = {
      get: vi.fn().mockResolvedValue({ data: xml }),
    } as unknown as HttpClient;
    const entries = await fetchAtomEntries(
      client,
      "TestFeed",
      "2025-12-01T00:00:00Z",
      100,
    );
    expect(entries).toHaveLength(2);
    expect(entries.map((e) => e.id)).toEqual(["e1", "e2"]);
    expect(client.get).toHaveBeenCalledTimes(1);
    expect(client.get).toHaveBeenCalledWith("/atomFeed/TestFeed", {
      params: {
        "updated-min": "2025-12-01T00:00:00Z",
        "page-size": 100,
        page: 1,
        orderBy: "updated:asc",
      },
    });
  });
  test("paginates via page parameter until entries < pageSize", async () => {
    const pageSize = 2;
    const page1Xml = makeAtomXml([
      { id: "e1", updated: "2026-01-01T00:00:00Z" },
      { id: "e2", updated: "2026-01-02T00:00:00Z" },
    ]);
    const page2Xml = makeAtomXml([
      { id: "e3", updated: "2026-01-03T00:00:00Z" },
      { id: "e4", updated: "2026-01-04T00:00:00Z" },
    ]);
    const page3Xml = makeAtomXml([
      { id: "e5", updated: "2026-01-05T00:00:00Z" },
    ]);
    const client = {
      get: vi
        .fn()
        .mockResolvedValueOnce({ data: page1Xml })
        .mockResolvedValueOnce({ data: page2Xml })
        .mockResolvedValueOnce({ data: page3Xml }),
    } as unknown as HttpClient;
    const entries = await fetchAtomEntries(
      client,
      "TestFeed",
      "2025-12-01T00:00:00Z",
      pageSize,
    );
    expect(entries).toHaveLength(5);
    expect(entries.map((e) => e.id)).toEqual(["e1", "e2", "e3", "e4", "e5"]);
    expect(client.get).toHaveBeenCalledTimes(3);
    for (let p = 1; p <= 3; p++) {
      expect(client.get).toHaveBeenNthCalledWith(p, "/atomFeed/TestFeed", {
        params: {
          "updated-min": "2025-12-01T00:00:00Z",
          "page-size": pageSize,
          page: p,
          orderBy: "updated:asc",
        },
      });
    }
  });
  test("stops after one request when feed returns zero entries", async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"></feed>`;
    const client = {
      get: vi.fn().mockResolvedValue({ data: xml }),
    } as unknown as HttpClient;
    const entries = await fetchAtomEntries(
      client,
      "TestFeed",
      "2025-12-01T00:00:00Z",
      100,
    );
    expect(entries).toHaveLength(0);
    expect(client.get).toHaveBeenCalledTimes(1);
  });
  test("parses changedAttributes from entry content", async () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <id>e1</id>
    <updated>2026-01-01T00:00:00Z</updated>
    <published>2026-01-01T00:00:00Z</published>
    <content type="application/xml">
      <EmployeeFeed_Context>
        <ChangedAttributes>
          <Attribute>FirstName</Attribute>
          <Attribute>LastName</Attribute>
        </ChangedAttributes>
      </EmployeeFeed_Context>
    </content>
  </entry>
</feed>`;
    const client = {
      get: vi.fn().mockResolvedValue({ data: xml }),
    } as unknown as HttpClient;
    const entries = await fetchAtomEntries(
      client,
      "Employee",
      "2025-12-01T00:00:00Z",
      100,
    );
    expect(entries[0].changedAttributes).toEqual(["FirstName", "LastName"]);
    expect(entries[0].feedName).toBe("Employee");
  });
});
