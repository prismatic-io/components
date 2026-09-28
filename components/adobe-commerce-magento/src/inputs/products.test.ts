import { attribute, option, product } from "./products";
describe("products inputs: happy-path normalization", () => {
  test.each<
    [string, ((value: unknown) => unknown) | undefined, unknown, unknown]
  >([
    [
      "product",
      product.clean,
      '{"product":{"sku":"MS-Champ-S"}}',
      { product: { sku: "MS-Champ-S" } },
    ],
    [
      "attribute",
      attribute.clean,
      '{"attribute":{"attribute_code":"size"}}',
      { attribute: { attribute_code: "size" } },
    ],
    [
      "option",
      option.clean,
      '{"option":{"product_sku":"MS-Champ"}}',
      { option: { product_sku: "MS-Champ" } },
    ],
  ])("%s.clean parses a JSON string to an object", (_label, clean, raw, expected) => {
    expect(clean?.(raw)).toEqual(expected);
  });
});
