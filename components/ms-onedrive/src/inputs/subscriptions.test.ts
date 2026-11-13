import {
  createSubscriptionInputs,
  deleteSubscriptionInputs,
  listSubscriptionsInputs,
} from "./subscriptions";

const {
  allowDuplicates,
  changeType,
  expirationDateTime,
  notificationUrl,
  resource,
} = createSubscriptionInputs;
const { showInstanceSubscriptions } = listSubscriptionsInputs;
const { subscriptionId } = deleteSubscriptionInputs;

describe("expirationDateTime input", () => {
  test("normalizes a valid date to an ISO 8601 string", () => {
    expect(expirationDateTime.clean?.("2026-12-01T10:00:00Z")).toBe(
      "2026-12-01T10:00:00.000Z",
    );
  });

  test("rejects a value that is not a date", () => {
    expect(() => expirationDateTime.clean?.("not-a-date")).toThrow();
  });
});

describe("boolean subscription inputs", () => {
  test.each([
    ["allowDuplicates", allowDuplicates],
    ["showInstanceSubscriptions", showInstanceSubscriptions],
  ])("%s coerces true/false strings and treats blank as false", (_key, definition) => {
    expect(definition.clean?.("true")).toBe(true);
    expect(definition.clean?.("false")).toBe(false);
    expect(definition.clean?.("")).toBe(false);
  });
});

describe("string subscription inputs", () => {
  test.each([
    ["changeType", changeType, "updated"],
    [
      "notificationUrl",
      notificationUrl,
      "https://contoso.azurewebsites.net/api/webhook-receiver",
    ],
    ["resource", resource, "/me/drive/root"],
    ["subscriptionId", subscriptionId, "38031b7d-16b1-448a-8e68-68b8aec62315"],
  ])("%s keeps a value and turns a missing one into an empty string", (_key, definition, value) => {
    expect(definition.clean?.(value)).toBe(value);
    expect(definition.clean?.(undefined)).toBe("");
  });
});
