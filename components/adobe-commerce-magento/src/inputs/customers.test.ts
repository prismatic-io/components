import {
  customer,
  customerId,
  password,
  passwordHash,
  redirectUrl,
} from "./customers";
describe("customers inputs: happy-path normalization", () => {
  test("customer.clean parses a JSON string to an object", () => {
    expect(
      customer.clean?.('{"customer":{"email":"jdoe@example.com"}}'),
    ).toEqual({
      customer: { email: "jdoe@example.com" },
    });
  });
  test.each<
    [string, ((value: unknown) => unknown) | undefined, unknown, unknown]
  >([
    ["password", password.clean, "s3cret", "s3cret"],
    [
      "redirectUrl",
      redirectUrl.clean,
      "https://www.example.com/customer/account/confirm",
      "https://www.example.com/customer/account/confirm",
    ],
    ["customerId", customerId.clean, "1", "1"],
    ["passwordHash", passwordHash.clean, "hashed-value", "hashed-value"],
  ])("%s.clean normalizes a valid value", (_label, clean, raw, expected) => {
    expect(clean?.(raw)).toEqual(expected);
  });
  test.each<[string, ((value: unknown) => unknown) | undefined]>([
    ["password", password.clean],
    ["redirectUrl", redirectUrl.clean],
    ["passwordHash", passwordHash.clean],
  ])('%s resolves an empty string to undefined rather than ""', (_label, clean) => {
    expect(clean?.("")).toBeUndefined();
  });
});
