import { driveRootPath, folderChildrenPath } from "./paths";

describe("driveRootPath", () => {
  test("prefixes a plain folder path with the drive root", () => {
    expect(driveRootPath("/Archive")).toBe("/drive/root:/Archive");
  });

  test("keeps a path that already names the drive root", () => {
    expect(driveRootPath("/drive/root:/Archive")).toBe("/drive/root:/Archive");
  });
});

describe("folderChildrenPath", () => {
  test("maps a forward slash to the children of the drive root", () => {
    expect(folderChildrenPath("/")).toBe("/me/drive/root/children");
  });

  test("resolves a folder path against the drive root", () => {
    expect(folderChildrenPath("/Reports/2024")).toBe(
      "/me/drive/root:/Reports/2024:/children",
    );
  });

  test.each([
    "/me/drive/items/01ABC/children",
    "/drive/root:/Docs:/children",
    "/drives/d1/root/children",
    "/sites/s1/drive/root/children",
    "/users/u1/drive/root/children",
    "/groups/g1/drive/root/children",
  ])("passes %s through as a Graph path", (path) => {
    expect(folderChildrenPath(path)).toBe(path);
  });
});
