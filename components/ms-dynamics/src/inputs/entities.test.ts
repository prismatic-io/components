import { describe, expect, test } from "vitest";
import { includeAllCustomRecordTypes } from "./common";
import { batchEntityActionsInputs } from "./entities";
const parseBatchedActions = batchEntityActionsInputs.actions.clean;
describe("parseBatchedActions", () => {
  test("valid batch array parses correctly", () => {
    const input = [
      { collection: "accounts", action: "create", data: { name: "test" } },
      {
        collection: "accounts",
        action: "update",
        key: "abc-123",
        data: { name: "updated" },
      },
      { collection: "accounts", action: "delete", key: "abc-456" },
    ];
    const result = parseBatchedActions(input);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(3);
  });
  test("non-array throws", () => {
    expect(() => parseBatchedActions("not-an-array")).toThrow(
      "Batch Actions must be specified as a JSON or JavaScript array",
    );
  });
  test("missing collection throws", () => {
    const input = [{ action: "create", data: { name: "test" } }];
    expect(() => parseBatchedActions(input)).toThrow("missing a collection");
  });
  test("invalid action type throws", () => {
    const input = [{ collection: "accounts", action: "invalid", data: {} }];
    expect(() => parseBatchedActions(input)).toThrow(
      "missing an action type, or the action type doesn't match",
    );
  });
  test("update without key throws", () => {
    const input = [
      { collection: "accounts", action: "update", data: { name: "test" } },
    ];
    expect(() => parseBatchedActions(input)).toThrow("missing an entity key");
  });
  test("create without data throws", () => {
    const input = [{ collection: "accounts", action: "create" }];
    expect(() => parseBatchedActions(input)).toThrow("missing data");
  });
});
describe("includeAllCustomRecordTypes.clean", () => {
  test("truthy value returns true", () => {
    expect(includeAllCustomRecordTypes.clean(true)).toBe(true);
    expect(includeAllCustomRecordTypes.clean("true")).toBe(true);
  });
  test("falsy/undefined defaults to true (toBool(value, true))", () => {
    expect(includeAllCustomRecordTypes.clean(undefined)).toBe(true);
    expect(includeAllCustomRecordTypes.clean(null)).toBe(true);
  });
});
