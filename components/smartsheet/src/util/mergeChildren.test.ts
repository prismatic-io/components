import { mergeMetadataChildren } from "./mergeChildren";

describe("mergeMetadataChildren", () => {
  
  it("spreads metadata scalar fields into the returned object", () => {
    const metadata = { id: 42, name: "My Workspace", accessLevel: "ADMIN" };
    const result = mergeMetadataChildren(metadata, []);
    expect(result.id).toBe(42);
    expect(result.name).toBe("My Workspace");
    expect(result.accessLevel).toBe("ADMIN");
  });

  
  it("buckets children by type into folders, sheets, reports, sights, templates arrays", () => {
    const children = [
      { id: 1, type: "folder", name: "F1" },
      { id: 2, type: "sheet", name: "S1" },
      { id: 3, type: "report", name: "R1" },
      { id: 4, type: "sight", name: "Si1" },
      { id: 5, type: "template", name: "T1" },
      { id: 6, type: "folder", name: "F2" },
      { id: 7, type: "sheet", name: "S2" },
    ];
    const result = mergeMetadataChildren({}, children);
    expect(result.folders).toEqual([
      { id: 1, type: "folder", name: "F1" },
      { id: 6, type: "folder", name: "F2" },
    ]);
    expect(result.sheets).toEqual([
      { id: 2, type: "sheet", name: "S1" },
      { id: 7, type: "sheet", name: "S2" },
    ]);
    expect(result.reports).toEqual([{ id: 3, type: "report", name: "R1" }]);
    expect(result.sights).toEqual([{ id: 4, type: "sight", name: "Si1" }]);
    expect(result.templates).toEqual([{ id: 5, type: "template", name: "T1" }]);
  });

  
  it("returns empty arrays for all buckets when children is empty", () => {
    const result = mergeMetadataChildren({ id: 1 }, []);
    expect(result.folders).toEqual([]);
    expect(result.sheets).toEqual([]);
    expect(result.reports).toEqual([]);
    expect(result.sights).toEqual([]);
    expect(result.templates).toEqual([]);
  });

  
  it("silently drops children with unrecognized types", () => {
    const children = [
      { id: 1, type: "unknown", name: "X" },
      { id: 2, type: "sheet", name: "S1" },
    ];
    const result = mergeMetadataChildren({}, children);
    expect(result.sheets).toEqual([{ id: 2, type: "sheet", name: "S1" }]);
    
    const allBucketItems = [
      ...(result.folders as unknown[]),
      ...(result.sheets as unknown[]),
      ...(result.reports as unknown[]),
      ...(result.sights as unknown[]),
      ...(result.templates as unknown[]),
    ];
    expect(allBucketItems).not.toContainEqual(
      expect.objectContaining({ id: 1 }),
    );
  });

  
  it("child buckets overwrite metadata fields with the same name", () => {
    
    const metadata = { templates: "x", id: 99 };
    const children = [{ id: 10, type: "template", name: "T1" }];
    const result = mergeMetadataChildren(metadata, children);
    expect(result.templates).toEqual([
      { id: 10, type: "template", name: "T1" },
    ]);
  });
});
