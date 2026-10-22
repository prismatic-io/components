import { createCustomerInputs } from "./customers";
describe("createCustomer optional string cleans", () => {
  const optionalStrings = {
    lastName: createCustomerInputs.lastName.clean,
    phoneNumber: createCustomerInputs.phoneNumber.clean,
    country: createCustomerInputs.country.clean,
    timezone: createCustomerInputs.timezone.clean,
  };
  for (const [key, clean] of Object.entries(optionalStrings)) {
    it(`${key}: keeps a provided value`, () => {
      expect(clean("Doe")).toBe("Doe");
    });
    it(`${key}: maps an empty string to undefined`, () => {
      expect(clean("")).toBeUndefined();
    });
    it(`${key}: maps undefined to undefined`, () => {
      expect(clean(undefined)).toBeUndefined();
    });
  }
});
describe("createCustomer promotionOptIn clean", () => {
  const clean = createCustomerInputs.promotionOptIn.clean;
  it("normalizes boolean and string values", () => {
    expect(clean(true)).toBe(true);
    expect(clean("true")).toBe(true);
    expect(clean("false")).toBe(false);
  });
  it("maps undefined to false", () => {
    expect(clean(undefined)).toBe(false);
  });
});
