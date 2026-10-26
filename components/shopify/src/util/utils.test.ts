import {
  buildPollingWindowQuery,
  categorizeByChangeType,
  cleanArrayCodeInput,
  cleanCodeInput,
  cleanCustomerId,
  cleanDraftOrderId,
  cleanFulfillmentId,
  cleanFulfillmentOrderId,
  cleanKeyValueListInput,
  cleanLocationId,
  cleanNumberInput,
  cleanOptionalBooleanInput,
  cleanOrderId,
  cleanProductId,
  cleanProductIdForVariant,
  cleanStringInput,
  cleanValueListInput,
  createTimezoneString,
  findKeyByValue,
  generateModelFromSnakeCaseArray,
  getNumericId,
  gqlErrorsCheck,
  validateMetafieldType,
} from ".";
describe("getNumericId", () => {
  test("extracts numeric ID from a standard GID", () => {
    expect(getNumericId("gid://shopify/Product/123456")).toBe(123456);
  });
  test("extracts numeric ID from a GID with query params", () => {
    expect(
      getNumericId(
        "gid://shopify/MailingAddress/999?model_name=CustomerAddress",
      ),
    ).toBe(999);
  });
  test("returns null for a GID with no numeric segment", () => {
    expect(getNumericId("gid://shopify/Product/")).toBe(null);
  });
  test("returns null for an empty string", () => {
    expect(getNumericId("")).toBe(null);
  });
});
describe("cleanProductId / cleanCustomerId / cleanOrderId / etc.", () => {
  test("passes through a full GID unchanged", () => {
    expect(cleanProductId("gid://shopify/Product/123")).toBe(
      "gid://shopify/Product/123",
    );
  });
  test("wraps a bare numeric ID into a GID", () => {
    expect(cleanProductId("123")).toBe("gid://shopify/Product/123");
  });
  test("cleanCustomerId wraps bare ID", () => {
    expect(cleanCustomerId("456")).toBe("gid://shopify/Customer/456");
  });
  test("cleanOrderId wraps bare ID", () => {
    expect(cleanOrderId("789")).toBe("gid://shopify/Order/789");
  });
  test("cleanFulfillmentOrderId wraps bare ID", () => {
    expect(cleanFulfillmentOrderId("111")).toBe(
      "gid://shopify/FulfillmentOrder/111",
    );
  });
  test("cleanFulfillmentId wraps bare ID", () => {
    expect(cleanFulfillmentId("222")).toBe("gid://shopify/Fulfillment/222");
  });
  test("cleanLocationId wraps bare ID", () => {
    expect(cleanLocationId("333")).toBe("gid://shopify/Location/333");
  });
  test("cleanDraftOrderId wraps bare ID", () => {
    expect(cleanDraftOrderId("444")).toBe("gid://shopify/DraftOrder/444");
  });
});
describe("cleanProductIdForVariant", () => {
  test("extracts numeric ID from a full GID", () => {
    expect(cleanProductIdForVariant("gid://shopify/Product/123456")).toBe(
      "123456",
    );
  });
  test("passes through a bare numeric string", () => {
    expect(cleanProductIdForVariant("789")).toBe("789");
  });
});
describe("validateMetafieldType", () => {
  test("returns string for single_line_text_field", () => {
    expect(validateMetafieldType(42, "single_line_text_field")).toBe("42");
  });
  test("returns integer for number_integer", () => {
    expect(validateMetafieldType("5", "number_integer")).toBe(5);
  });
  test("returns boolean for boolean type", () => {
    expect(validateMetafieldType("true", "boolean")).toBe(true);
  });
  test("returns undefined for unknown type", () => {
    expect(validateMetafieldType("value", "json")).toBeUndefined();
  });
  test("is case-insensitive and trims whitespace", () => {
    expect(validateMetafieldType(7, " Number_Integer ")).toBe(7);
  });
});
describe("generateModelFromSnakeCaseArray", () => {
  test("converts snake_case keys to Title Case labels", () => {
    expect(
      generateModelFromSnakeCaseArray(["first_name", "last_name"]),
    ).toEqual([
      { label: "First Name", value: "first_name" },
      { label: "Last Name", value: "last_name" },
    ]);
  });
  test("handles single-word keys", () => {
    expect(generateModelFromSnakeCaseArray(["email"])).toEqual([
      { label: "Email", value: "email" },
    ]);
  });
  test("returns empty array for empty input", () => {
    expect(generateModelFromSnakeCaseArray([])).toEqual([]);
  });
});
describe("createTimezoneString", () => {
  test("formats offset and IANA timezone correctly", () => {
    expect(createTimezoneString("-0500", "America/New_York")).toBe(
      "(GMT-05:00) America/New_York",
    );
  });
  test("handles positive offset", () => {
    expect(createTimezoneString("+0530", "Asia/Kolkata")).toBe(
      "(GMT+05:30) Asia/Kolkata",
    );
  });
});
describe("findKeyByValue", () => {
  const map = {
    "orders/create": "ORDERS_CREATE",
    "customers/update": "CUSTOMERS_UPDATE",
  };
  test("finds the key for an existing value", () => {
    expect(findKeyByValue(map, "ORDERS_CREATE")).toBe("orders/create");
  });
  test("returns undefined for a missing value", () => {
    expect(findKeyByValue(map, "MISSING")).toBeUndefined();
  });
});
describe("gqlErrorsCheck", () => {
  test("throws when userErrors are present", () => {
    expect(() =>
      gqlErrorsCheck({
        customerCreate: { userErrors: [{ message: "Email taken" }] },
      }),
    ).toThrow("Email taken");
  });
  test("joins multiple error messages", () => {
    expect(() =>
      gqlErrorsCheck({
        mutation: { userErrors: [{ message: "A" }, { message: "B" }] },
      }),
    ).toThrow("A, B");
  });
  test("does not throw when userErrors is empty", () => {
    expect(() =>
      gqlErrorsCheck({ customerCreate: { userErrors: [] } }),
    ).not.toThrow();
  });
  test("does not throw when no userErrors key exists", () => {
    expect(() => gqlErrorsCheck({ data: { id: "123" } })).not.toThrow();
  });
});
describe("categorizeByChangeType", () => {
  const lastPolledAt = "2026-10-20T12:00:00.000Z";
  test("puts items created after lastPolledAt into created", () => {
    const items = [{ createdAt: "2026-10-20T13:00:00.000Z", id: "1" }];
    const result = categorizeByChangeType(items, lastPolledAt);
    expect(result.created).toHaveLength(1);
    expect(result.updated).toHaveLength(0);
  });
  test("puts items created before lastPolledAt into updated", () => {
    const items = [{ createdAt: "2026-10-19T00:00:00.000Z", id: "2" }];
    const result = categorizeByChangeType(items, lastPolledAt);
    expect(result.created).toHaveLength(0);
    expect(result.updated).toHaveLength(1);
  });
  test("handles empty array", () => {
    const result = categorizeByChangeType([], lastPolledAt);
    expect(result).toEqual({ created: [], updated: [] });
  });
});
describe("buildPollingWindowQuery", () => {
  test("builds a Shopify search query from a cursor", () => {
    const result = buildPollingWindowQuery({
      windowStart: "2026-10-20T00:00:00Z",
      windowEnd: "2026-10-21T00:00:00Z",
      isBackfill: false,
    });
    expect(result).toBe(
      "updated_at:>='2026-10-20T00:00:00Z' updated_at:<'2026-10-21T00:00:00Z'",
    );
  });
});
describe("clean input helpers", () => {
  test("cleanStringInput returns string or undefined", () => {
    expect(cleanStringInput("hello")).toBe("hello");
    expect(cleanStringInput("")).toBeUndefined();
    expect(cleanStringInput(null)).toBeUndefined();
  });
  test("cleanNumberInput returns number or undefined", () => {
    expect(cleanNumberInput("42")).toBe(42);
    expect(cleanNumberInput("")).toBeUndefined();
  });
  test("cleanCodeInput returns object or empty object", () => {
    expect(cleanCodeInput('{"a":1}')).toEqual({ a: 1 });
    expect(cleanCodeInput("")).toEqual({});
  });
  test("cleanKeyValueListInput converts key-value pairs", () => {
    expect(cleanKeyValueListInput([{ key: "a", value: "1" }])).toEqual({
      a: "1",
    });
    expect(cleanKeyValueListInput("not-an-array")).toEqual({});
  });
  test("cleanArrayCodeInput returns array or throws", () => {
    expect(cleanArrayCodeInput("[1,2,3]", "test")).toEqual([1, 2, 3]);
    expect(cleanArrayCodeInput(undefined, "test")).toBeUndefined();
    expect(() => cleanArrayCodeInput('{"a":1}', "test")).toThrow(
      "Invalid array",
    );
  });
  test("cleanValueListInput maps array to strings", () => {
    expect(cleanValueListInput(["a", 1])).toEqual(["a", "1"]);
    expect(cleanValueListInput(null)).toEqual([]);
    expect(cleanValueListInput(null, true)).toBeUndefined();
  });
  test("cleanOptionalBooleanInput returns boolean or undefined", () => {
    expect(cleanOptionalBooleanInput("true")).toBe(true);
    expect(cleanOptionalBooleanInput("")).toBeUndefined();
  });
});
