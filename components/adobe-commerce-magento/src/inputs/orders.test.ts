import { entity, orderId } from "./orders";
describe("orders inputs: happy-path normalization", () => {
  test("entity.clean parses a JSON string to an object", () => {
    expect(
      entity.clean?.('{"entity":{"customer_email":"jdoe@example.com"}}'),
    ).toEqual({
      entity: { customer_email: "jdoe@example.com" },
    });
  });
  test("orderId.clean normalizes a valid value", () => {
    expect(orderId.clean?.("1")).toBe("1");
  });
});
