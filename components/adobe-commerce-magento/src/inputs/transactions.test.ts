import { transactionId } from "./transactions";
describe("transactions inputs: happy-path normalization", () => {
  test("transactionId.clean normalizes a valid value", () => {
    expect(transactionId.clean?.("12")).toBe("12");
  });
});
