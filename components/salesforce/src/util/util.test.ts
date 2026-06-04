import {
  parseFullNameIdentifier,
  processOutboundMessageFields,
  toFindOptions,
  toFullNameIdentifier,
} from ".";

describe("toFindOptions", () => {
  it.each([
    { pageSize: undefined, pageNumber: undefined },
    { pageSize: "0", pageNumber: "0" },
    { pageSize: 0, pageNumber: 0 },
    { pageSize: "20", pageNumber: "0" },
    { pageSize: 20, pageNumber: 0 },
    { pageSize: "0", pageNumber: "1" },
    { pageSize: 0, pageNumber: 1 },
  ])("should return undefined for invalid values", ({ pageSize, pageNumber }) => {
    const result = toFindOptions(pageSize, pageNumber);
    expect(result).toBeUndefined();
  });

  it.each([
    { pageSize: 20, pageNumber: 1, expected: { limit: 20, offset: 0 } },
    { pageSize: "20", pageNumber: "1", expected: { limit: 20, offset: 0 } },
    { pageSize: 20, pageNumber: 2, expected: { limit: 20, offset: 20 } },
    { pageSize: "20", pageNumber: "2", expected: { limit: 20, offset: 20 } },
    { pageSize: 50, pageNumber: 5, expected: { limit: 50, offset: 200 } },
    { pageSize: "50", pageNumber: "5", expected: { limit: 50, offset: 200 } },
  ])(
    "should return expected options object for valid values",
    ({ pageSize, pageNumber, expected }) => {
      const result = toFindOptions(pageSize, pageNumber);
      expect(result).toStrictEqual(expected);
    },
  );
});

describe("toFullNameIdentifier", () => {
  it.each([
    {
      objectType: "Account",
      name: "Foo Bar Baz",
      expected: "Account.Foo_Bar_Baz",
    },
    {
      objectType: "Account",
      name: "Foo\tBar  Baz",
      expected: "Account.Foo_Bar_Baz",
    },
    {
      objectType: "Account",
      name: "helloworld",
      expected: "Account.helloworld",
    },
  ])("should return valid fullName identifiers", ({ objectType, name, expected }) => {
    const result = toFullNameIdentifier(objectType, name);
    expect(result).toStrictEqual(expected);
  });
});

describe("parseFullNameIdentifier", () => {
  it.each([
    {
      fullName: "Account.CreatedDate",
      expected: { objectType: "Account", name: "CreatedDate" },
    },
    {
      fullName: "Account.Foo_Bar_Baz",
      expected: { objectType: "Account", name: "Foo_Bar_Baz" },
    },
    {
      fullName: "Account.Some_Custom_Field__c",
      expected: { objectType: "Account", name: "Some_Custom_Field__c" },
    },
  ])("should return parsed objectType and name", ({ fullName, expected }) => {
    const result = parseFullNameIdentifier(fullName);
    expect(result).toStrictEqual(expected);
  });
});

describe("processOutboundMessageFields", () => {
  it.each([
    { fields: [], dynamicFields: [], expected: [] },
    { fields: undefined, dynamicFields: [], expected: [] },
    { fields: null, dynamicFields: [], expected: [] },
    { fields: [], dynamicFields: [], expected: [] },
    { fields: [], dynamicFields: undefined, expected: [] },
    { fields: [], dynamicFields: null, expected: [] },
    {
      fields: ["id", "name"],
      dynamicFields: ["description"],
      expected: ["id", "name", "description"],
    },
    { fields: ["name"], dynamicFields: ["name"], expected: ["name"] },
  ])("should combine fields from multiple sources", ({ fields, dynamicFields, expected }) => {
    const result = processOutboundMessageFields(fields, dynamicFields);
    expect(result).toStrictEqual(expected);
  });
});
