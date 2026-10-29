import { describe, expect, it } from "vitest";
import { postSupplierInvoiceRequestsInputs } from "./accountsPayable";
import { postJobChangesInputs } from "./commonApi";
import {
  initiateJobChangeInputs,
  initiateOrganizationAssignmentChangeInputs,
} from "./staffing";

const requiredDateInputs = [
  ["Invoice Date", postSupplierInvoiceRequestsInputs.invoiceDate],
  ["Effective Date (Job Changes)", postJobChangesInputs.effective],
  ["Effective Date (Job Change)", initiateJobChangeInputs.effectiveDate],
  [
    "Effective Date (Organization Assignment Change)",
    initiateOrganizationAssignmentChangeInputs.effectiveDate,
  ],
] as const;

describe.each(requiredDateInputs)("%s", (_label, dateInput) => {
  const clean = dateInput.clean as (value: unknown) => unknown;

  it("parses an ISO 8601 date", () => {
    expect(clean("2026-10-01T00:00:00.000Z")).toEqual(
      new Date("2026-10-01T00:00:00.000Z"),
    );
  });

  it("throws for an empty value instead of returning undefined", () => {
    expect(() => clean("")).toThrow();
    expect(() => clean(undefined)).toThrow();
    expect(() => clean(null)).toThrow();
  });

  it("throws for a value that is not a date", () => {
    expect(() => clean("not a date")).toThrow();
  });
});
