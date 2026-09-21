import { describe, expect, it } from "vitest";
import { assignParametersToObject, getObjectFromArray } from "./sdk";
describe("assignParametersToObject", () => {
  it("assigns non-empty strings", () => {
    const obj: Record<string, unknown> = {};
    assignParametersToObject(obj, { name: "Alice" });
    expect(obj.name).toBe("Alice");
  });
  it("skips empty strings", () => {
    const obj: Record<string, unknown> = {};
    assignParametersToObject(obj, { name: "" });
    expect(obj).not.toHaveProperty("name");
  });
  it("assigns positive numbers", () => {
    const obj: Record<string, unknown> = {};
    assignParametersToObject(obj, { count: 5 });
    expect(obj.count).toBe(5);
  });
  it("skips zero", () => {
    const obj: Record<string, unknown> = {};
    assignParametersToObject(obj, { count: 0 });
    expect(obj).not.toHaveProperty("count");
  });
  it("assigns non-empty arrays", () => {
    const obj: Record<string, unknown> = {};
    assignParametersToObject(obj, { items: [1, 2] });
    expect(obj.items).toEqual([1, 2]);
  });
  it("skips empty arrays", () => {
    const obj: Record<string, unknown> = {};
    assignParametersToObject(obj, { items: [] });
    expect(obj).not.toHaveProperty("items");
  });
  it("always assigns booleans including false", () => {
    const obj: Record<string, unknown> = {};
    assignParametersToObject(obj, { active: false });
    expect(obj.active).toBe(false);
  });
  it("skips null and undefined", () => {
    const obj: Record<string, unknown> = {};
    assignParametersToObject(obj, { a: null, b: undefined });
    expect(obj).not.toHaveProperty("a");
    expect(obj).not.toHaveProperty("b");
  });
});
describe("getObjectFromArray", () => {
  it("returns first element of an array", () => {
    expect(getObjectFromArray([{ id: 1 }, { id: 2 }])).toEqual({ id: 1 });
  });
  it("returns null for non-array", () => {
    expect(getObjectFromArray("string")).toBeNull();
    expect(getObjectFromArray(42)).toBeNull();
  });
  it("returns undefined for empty array", () => {
    expect(getObjectFromArray([])).toBeUndefined();
  });
});
