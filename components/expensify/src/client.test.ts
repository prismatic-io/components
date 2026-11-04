import { describe, expect, it } from "vitest";
import { assertJobSucceeded } from "./client";

describe("assertJobSucceeded", () => {
  it("returns the response when responseCode is 200", () => {
    const response = { data: { responseCode: 200, policyList: [] } };
    expect(assertJobSucceeded(response)).toBe(response);
  });

  it("throws with the code and message when responseCode is an error", () => {
    const response = {
      data: {
        responseCode: 410,
        responseMessage: "Unknown policy",
      },
    };
    expect(() => assertJobSucceeded(response)).toThrow(
      "Expensify request failed with responseCode 410: Unknown policy",
    );
  });

  it("throws when an error responseCode has no message", () => {
    const response = { data: { responseCode: 500 } };
    expect(() => assertJobSucceeded(response)).toThrow(
      "Expensify request failed with responseCode 500",
    );
  });

  it("passes non-JSON bodies through, such as a downloaded report", () => {
    const response = { data: "Report ID,Total\n123,45.67" };
    expect(assertJobSucceeded(response)).toBe(response);
  });

  it("passes objects without a responseCode through", () => {
    const response = { data: { reportName: "report.csv" } };
    expect(assertJobSucceeded(response)).toBe(response);
  });
});
