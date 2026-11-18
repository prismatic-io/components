import {
  createSubscriptionInputs,
  deleteSubscriptionInputs,
  updateSubscriptionInputs,
} from "./subscription";

type Clean = (value: unknown) => unknown;

describe.each<[string, Clean]>([
  ["notificationUrl", updateSubscriptionInputs.notificationUrl.clean],
  ["expirationDateTime", updateSubscriptionInputs.expirationDateTime.clean],
])("updateSubscription %s.clean", (_name, clean) => {
  test("returns the value as a string", () => {
    expect(clean("https://example.com/hook")).toBe("https://example.com/hook");
  });

  test("returns undefined for an empty value so the field is left out", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});

describe.each<[string, Clean]>([
  ["changeType", createSubscriptionInputs.changeType.clean],
  ["notificationUrl", createSubscriptionInputs.notificationUrl.clean],
  ["resource", createSubscriptionInputs.resource.clean],
  ["subscriptionId", deleteSubscriptionInputs.subscriptionId.clean],
])("%s.clean", (_name, clean) => {
  test("returns the value as a string", () => {
    expect(clean("created,updated")).toBe("created,updated");
  });

  test("coerces an empty value to an empty string instead of throwing", () => {
    expect(clean(undefined)).toBe("");
  });
});

describe("createSubscription headers.clean", () => {
  const { clean } = createSubscriptionInputs.headers;

  test("converts a key/value list to a header object", () => {
    expect(
      clean([
        { key: "x-one", value: "1" },
        { key: "x-two", value: "2" },
      ]),
    ).toEqual({ "x-one": "1", "x-two": "2" });
  });

  test("returns an empty object for a value that is not a list", () => {
    expect(clean(undefined)).toEqual({});
  });
});
