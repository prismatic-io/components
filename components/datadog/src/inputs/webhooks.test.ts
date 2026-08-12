import {
  webhookCustomHeaders,
  webhookEncodeAs,
  webhookName,
  webhookPayload,
  webhookUrl,
} from "./webhooks";
describe("webhookName.clean", () => {
  test("coerces the value to a string", () => {
    expect(webhookName.clean("my-integration-webhook")).toBe(
      "my-integration-webhook",
    );
    expect(webhookName.clean(123)).toBe("123");
  });
  test("returns an empty string when unset", () => {
    expect(webhookName.clean(undefined)).toBe("");
  });
});
describe("webhookUrl.clean", () => {
  test("coerces the value to a string", () => {
    expect(webhookUrl.clean("https://hooks.example.com/datadog")).toBe(
      "https://hooks.example.com/datadog",
    );
  });
  test("returns an empty string when unset", () => {
    expect(webhookUrl.clean(undefined)).toBe("");
  });
});
describe.each([
  ["webhookCustomHeaders", webhookCustomHeaders],
  ["webhookEncodeAs", webhookEncodeAs],
  ["webhookPayload", webhookPayload],
])("%s.clean", (_label, field) => {
  test("coerces a supplied value to a string", () => {
    expect(field.clean('{"Authorization": "Bearer my-token"}')).toBe(
      '{"Authorization": "Bearer my-token"}',
    );
  });
  test("returns undefined for a falsy value", () => {
    expect(field.clean(undefined)).toBeUndefined();
    expect(field.clean("")).toBeUndefined();
  });
});
