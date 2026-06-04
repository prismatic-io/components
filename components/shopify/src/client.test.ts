import { getShopifyHostname } from "./client";

describe("Test getShopifyHostname", () => {
  test.each([
    "YOUR-SHOPIFY-DOMAIN.myshopify.com",
    "https://YOUR-SHOPIFY-DOMAIN.myshopify.com",
    "https://YOUR-SHOPIFY-DOMAIN.myshopify.com/",
    "https://YOUR-SHOPIFY-DOMAIN.myshopify.com/some/other/path",
  ])("Verifies parsing of pasted in domain name", (value) => {
    const result = getShopifyHostname(value);
    expect(result).toEqual("YOUR-SHOPIFY-DOMAIN.myshopify.com");
  });

  test("Verify it throws errors when it doesn't match", () => {
    expect(() => getShopifyHostname("some-bad-value")).toThrow(
      'Unable to parse hostname "some-bad-value". It should look like "YOUR-SHOPIFY-DOMAIN.myshopify.com".',
    );
  });
});
