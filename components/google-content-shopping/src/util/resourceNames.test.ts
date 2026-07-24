import {
  accountResourceName,
  dataSourceResourceName,
  productIdSegment,
  productInputResourceName,
  productResourceName,
} from "./resourceNames";
describe("accountResourceName", () => {
  test("builds the account resource name from a bare numeric id", () => {
    expect(accountResourceName("123456")).toBe("accounts/123456");
  });
  test("passes through a value that is already a qualified resource name", () => {
    expect(accountResourceName("accounts/123456")).toBe("accounts/123456");
  });
  test("trims surrounding whitespace before building the name", () => {
    expect(accountResourceName("  123456  ")).toBe("accounts/123456");
  });
});
describe("productIdSegment", () => {
  test("joins content language, feed label and offer id with tildes", () => {
    expect(productIdSegment("en", "US", "sku123")).toBe("en~US~sku123");
  });
});
describe("productResourceName", () => {
  test("builds the processed product resource name under the account", () => {
    expect(productResourceName("123", "en", "US", "sku123")).toBe(
      "accounts/123/products/en~US~sku123",
    );
  });
});
describe("productInputResourceName", () => {
  test("builds the product input resource name under the account", () => {
    expect(productInputResourceName("accounts/123", "en", "US", "sku123")).toBe(
      "accounts/123/productInputs/en~US~sku123",
    );
  });
});
describe("dataSourceResourceName", () => {
  test("builds the data source resource name from a bare id", () => {
    expect(dataSourceResourceName("123", "456")).toBe(
      "accounts/123/dataSources/456",
    );
  });
  test("passes through an already-qualified data source resource name", () => {
    expect(dataSourceResourceName("123", "accounts/123/dataSources/456")).toBe(
      "accounts/123/dataSources/456",
    );
  });
});
