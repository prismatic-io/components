import { handleMultipleWorkspacesError, mapToLabelKey } from "./dataSources";
describe("mapToLabelKey", () => {
  it("maps gid/name to key/label", () => {
    const data = [
      { gid: "1", name: "Project A" },
      { gid: "2", name: "Project B" },
    ];
    expect(mapToLabelKey(data)).toEqual([
      { key: "1", label: "Project A" },
      { key: "2", label: "Project B" },
    ]);
  });
  it("returns empty array for empty input", () => {
    expect(mapToLabelKey([])).toEqual([]);
  });
});
describe("handleMultipleWorkspacesError", () => {
  it("throws when error contains multiple workspaces message", () => {
    const error = {
      response: {
        data: {
          errors: [
            {
              message:
                "This request accesses data in multiple workspaces and must be scoped",
            },
          ],
        },
      },
    };
    expect(() => handleMultipleWorkspacesError(error)).toThrow(
      "Workspace ID must be provided",
    );
  });
  it("does not throw for unrelated errors", () => {
    const error = {
      response: { data: { errors: [{ message: "Not found" }] } },
    };
    expect(() => handleMultipleWorkspacesError(error)).not.toThrow();
  });
  it("does not throw for null", () => {
    expect(() => handleMultipleWorkspacesError(null)).not.toThrow();
  });
});
