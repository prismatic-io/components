import type { BoxClient } from "box-node-sdk";
import { getPathEntries } from "./utils";
import folderTree from "../tests/fixtures/files.json";
const buildMockClient = () =>
  ({
    folders: {
      getFolderItems: jest
        .fn()
        .mockImplementation((id: string, { queryParams }) => {
          const result: {
            entries: {
              rawData: Record<string, unknown>;
            }[];
            nextMarker: string | null;
          } = { entries: [], nextMarker: null };
          const allEntries = folderTree.files.filter(
            (entry) => entry.parent === id,
          );
          if (!allEntries.length) return Promise.reject(new Error("Not found"));
          let index = Number.parseInt(queryParams?.marker);
          if (Number.isNaN(index)) index = 0;
          const { id: fileId, name, type } = allEntries[index];
          result.entries.push({ rawData: { id: fileId, name, type } });
          index += 1;
          if (index < allEntries.length) result.nextMarker = index.toString();
          return Promise.resolve(result);
        }),
    },
  }) as unknown as BoxClient;
const client = buildMockClient();
describe("getPathEntries", () => {
  test('throws error when path does not start with "/"', async () => {
    await expect(getPathEntries(client, "path_without_slash")).rejects.toThrow(
      "Path must start with '/'",
    );
  });
  test("throws error when path does not exist", async () => {
    await expect(getPathEntries(client, "/a/a1/a1file3")).rejects.toThrow(
      "Path not found",
    );
  });
  test("throws error when last item should not exist but does", async () => {
    await expect(
      getPathEntries(client, "/a/a1/a1file1", false),
    ).rejects.toThrow("Expected 'a1file1' to not exist");
  });
  test("returns all entries in a path", async () => {
    const actual = await getPathEntries(client, "/a/a1/a1file1");
    const expected = [
      { id: "0", name: "", type: "folder" },
      { id: "1", name: "a", type: "folder" },
      { id: "3", name: "a1", type: "folder" },
      { id: "7", name: "a1file1", type: "file" },
    ];
    expect(actual).toEqual(expected);
  });
  test("last item does not need to exist when requested", async () => {
    const actual = await getPathEntries(client, "/a/a1/a1file3", false);
    const expected = [
      { id: "0", name: "", type: "folder" },
      { id: "1", name: "a", type: "folder" },
      { id: "3", name: "a1", type: "folder" },
      { name: "a1file3" },
    ];
    expect(actual).toEqual(expected);
  });
});
