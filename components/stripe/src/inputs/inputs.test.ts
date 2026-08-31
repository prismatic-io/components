import { updateChargeInputs } from "./charges";
import {
  createPaymentIntentInputs,
  listPaymentIntentsInputs,
  updatePaymentIntentInputs,
} from "./paymentIntents";
type CleanableInput = {
  required?: boolean;
  clean?: (value: unknown) => unknown;
};
const asInput = (value: unknown) => value as CleanableInput;
const optionalStringOverrides: Array<[string, CleanableInput]> = [
  ["updateChargeInputs.customerId", asInput(updateChargeInputs.customerId)],
  ["updateChargeInputs.description", asInput(updateChargeInputs.description)],
  [
    "createPaymentIntentInputs.customerId",
    asInput(createPaymentIntentInputs.customerId),
  ],
  [
    "createPaymentIntentInputs.description",
    asInput(createPaymentIntentInputs.description),
  ],
  [
    "listPaymentIntentsInputs.customerId",
    asInput(listPaymentIntentsInputs.customerId),
  ],
  [
    "updatePaymentIntentInputs.customerId",
    asInput(updatePaymentIntentInputs.customerId),
  ],
  [
    "updatePaymentIntentInputs.description",
    asInput(updatePaymentIntentInputs.description),
  ],
];
describe.each(optionalStringOverrides)("%s (optional)", (_name, field) => {
  it("is optional", () => {
    expect(field.required).toBeFalsy();
  });
  it("resolves a blank value to undefined so the field is omitted", () => {
    expect(field.clean?.("")).toBeUndefined();
    expect(field.clean?.(undefined)).toBeUndefined();
  });
  it("passes a supplied value through", () => {
    expect(field.clean?.("cus_supplied")).toBe("cus_supplied");
  });
});
describe("createPaymentIntentInputs.currency (required)", () => {
  const currency = asInput(createPaymentIntentInputs.currency);
  it("is required", () => {
    expect(currency.required).toBe(true);
  });
  it("never resolves to undefined, so the perform needs no re-coercion", () => {
    expect(currency.clean?.(undefined)).not.toBeUndefined();
    expect(currency.clean?.("")).not.toBeUndefined();
  });
  it("passes a supplied value through", () => {
    expect(currency.clean?.("usd")).toBe("usd");
  });
});
