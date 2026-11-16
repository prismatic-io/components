import {
  deleteRecordInputs,
  getRecordInputs,
  updateRecordInputs,
} from "./records";

describe("Record ID input", () => {
  test.each([
    ["Get Record", getRecordInputs.id],
    ["Update Record", updateRecordInputs.id],
    ["Delete Record", deleteRecordInputs.id],
  ])("%s accepts an external ID in the eid: format its comment documents", (_label, input) => {
    expect(input.clean?.("eid:CID001")).toBe("eid:CID001");
  });

  test("keeps an internal ID usable in the record URL", () => {
    expect(`${getRecordInputs.id.clean?.("107")}`).toBe("107");
  });
});

describe("Fields to Return clean", () => {
  const clean = getRecordInputs.fields.clean;

  test("joins an array into a comma-separated string", () => {
    expect(clean?.(["email", "companyname", "subsidiary"])).toBe(
      "email,companyname,subsidiary",
    );
  });

  test("passes a non-array value through unchanged", () => {
    expect(clean?.("email")).toBe("email");
    expect(clean?.(undefined)).toBeUndefined();
  });
});

describe("Replace clean", () => {
  const clean = updateRecordInputs.replace.clean;

  test("joins an array into a comma-separated string", () => {
    expect(clean?.(["itemList", "addressbookList"])).toBe(
      "itemList,addressbookList",
    );
  });

  test("passes a non-array value through unchanged", () => {
    expect(clean?.("itemList")).toBe("itemList");
    expect(clean?.(undefined)).toBeUndefined();
  });
});
