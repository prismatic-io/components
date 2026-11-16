import { encodeRecordId, parseLocationData } from "./records";

describe("encodeRecordId", () => {
  test("leaves an internal ID unchanged", () => {
    expect(encodeRecordId("107")).toBe("107");
  });

  test("keeps the eid: prefix and encodes the external ID after it", () => {
    expect(encodeRecordId("eid:INV#2024/07")).toBe("eid:INV%232024%2F07");
  });

  test("leaves a plain external ID readable", () => {
    expect(encodeRecordId("eid:CUST-9")).toBe("eid:CUST-9");
  });
});

describe("parseLocationData", () => {
  const base =
    "https://1234567.suitetalk.api.netsuite.com/services/rest/record/v1";

  test("reads the record type and internal ID", () => {
    expect(parseLocationData(`${base}/customer/12345`)).toEqual({
      recordType: "customer",
      id: "12345",
    });
  });

  test("reads an ID that is not numeric instead of returning it empty", () => {
    expect(parseLocationData(`${base}/customer/eid:CUST-9`)).toEqual({
      recordType: "customer",
      id: "eid:CUST-9",
    });
  });

  test("throws when the header carries no record ID", () => {
    expect(() => parseLocationData(`${base}/customer/`)).toThrow(
      `Something went wrong when parsing location header ${base}/customer/`,
    );
  });
});
