import { describe, expect, it } from "vitest";
import { checkSuccess, handleSageError } from "./error";
import type { SageApiResponse } from "../types";
describe("checkSuccess", () => {
  it("does not throw for 'success' status", () => {
    expect(() => checkSuccess("success", "fail")).not.toThrow();
  });
  it("throws with the provided message for non-success status", () => {
    expect(() => checkSuccess("failure", "Something went wrong")).toThrow(
      "Something went wrong",
    );
  });
});
describe("handleSageError", () => {
  it("throws on top-level error", () => {
    const response: SageApiResponse = {
      response: { errormessage: "Top-level error" },
    };
    expect(() => handleSageError(response)).toThrow("Top-level error");
  });
  it("throws on nested error", () => {
    const response: SageApiResponse = {
      response: {
        operation: { result: { errormessage: "Nested error" } },
      },
    };
    expect(() => handleSageError(response)).toThrow("Nested error");
  });
  it("does not throw when there is no error", () => {
    const response: SageApiResponse = { response: {} };
    expect(() => handleSageError(response)).not.toThrow();
  });
  it("does not throw for undefined response", () => {
    expect(() => handleSageError({})).not.toThrow();
  });
});
