import { vi } from "vitest";
import { DEFAULT_SUBSCRIPTION_DAYS, SITE_LIST_SUBSCRIPTION_DEFAULT_DAYS } from "../constants";
import {
  createSiteListSubscriptionInputs,
  createSubscriptionInputs,
  deleteAllInstanceSubscriptionsInputs,
  deleteSubscriptionInputs,
  listSubscriptionsInputs,
  renewSubscriptionInputs,
  updateSiteListSubscriptionExpirationInputs,
} from "./subscriptions";

const NOTIFICATION_URL = "https://contoso.azurewebsites.net/api/webhook-receiver";
const SUBSCRIPTION_ID = "38031b7d-16b1-448a-8e68-68b8aec62315";

describe("string subscription inputs", () => {
  test.each([
    [
      "createSubscription notificationUrl",
      createSubscriptionInputs.notificationUrl,
      NOTIFICATION_URL,
    ],
    [
      "createSiteListSubscription notificationUrl",
      createSiteListSubscriptionInputs.notificationUrl,
      NOTIFICATION_URL,
    ],
    ["deleteSubscription subscriptionId", deleteSubscriptionInputs.subscriptionId, SUBSCRIPTION_ID],
    ["renewSubscription subscriptionId", renewSubscriptionInputs.subscriptionId, SUBSCRIPTION_ID],
    [
      "updateSiteListSubscriptionExpiration subscriptionId",
      updateSiteListSubscriptionExpirationInputs.subscriptionId,
      SUBSCRIPTION_ID,
    ],
  ])("%s keeps a value and turns a missing one into an empty string", (_key, definition, value) => {
    expect(definition.clean?.(value)).toBe(value);
    expect(definition.clean?.(undefined)).toBe("");
  });
});

describe("deleteAllInstanceSubscriptions notificationUrl", () => {
  const { notificationUrl } = deleteAllInstanceSubscriptionsInputs;

  test("keeps a value", () => {
    expect(notificationUrl.clean?.(NOTIFICATION_URL)).toBe(NOTIFICATION_URL);
  });

  test("turns a blank value into undefined so the flow's own URL is used", () => {
    expect(notificationUrl.clean?.("")).toBeUndefined();
    expect(notificationUrl.clean?.(undefined)).toBeUndefined();
  });
});

describe("boolean subscription inputs", () => {
  test.each([
    ["createSubscription allowDuplicates", createSubscriptionInputs.allowDuplicates],
    [
      "createSiteListSubscription allowDuplicates",
      createSiteListSubscriptionInputs.allowDuplicates,
    ],
    [
      "listSubscriptions showInstanceSubscriptions",
      listSubscriptionsInputs.showInstanceSubscriptions,
    ],
  ])("%s coerces true/false strings and treats blank as false", (_key, definition) => {
    expect(definition.clean?.("true")).toBe(true);
    expect(definition.clean?.(true)).toBe(true);
    expect(definition.clean?.("false")).toBe(false);
    expect(definition.clean?.("")).toBe(false);
  });
});

describe("renewSubscription expirationDays", () => {
  const { expirationDays } = renewSubscriptionInputs;

  test("defaults a blank value and accepts a whole number in range", () => {
    expect(expirationDays.clean?.("")).toBe(DEFAULT_SUBSCRIPTION_DAYS);
    expect(expirationDays.clean?.("7")).toBe(7);
  });

  test("rejects a value outside 1 to 30 days", () => {
    expect(() => expirationDays.clean?.("31")).toThrow(
      "Expiration Days must be a whole number between 1 and 30.",
    );
    expect(() => expirationDays.clean?.("2.5")).toThrow();
  });
});

describe("site list expirationDateTime", () => {
  const NOW = new Date("2026-11-09T12:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test.each([
    ["createSiteListSubscription", createSiteListSubscriptionInputs.expirationDateTime],
    [
      "updateSiteListSubscriptionExpiration",
      updateSiteListSubscriptionExpirationInputs.expirationDateTime,
    ],
  ])("%s normalizes a Date, keeps a string and defaults a blank value", (_key, definition) => {
    const expected = new Date(NOW);
    expected.setDate(expected.getDate() + SITE_LIST_SUBSCRIPTION_DEFAULT_DAYS);

    expect(definition.clean?.(new Date("2026-12-01T10:00:00.000Z"))).toBe(
      "2026-12-01T10:00:00.000Z",
    );
    expect(definition.clean?.("2026-12-01T10:00:00Z")).toBe("2026-12-01T10:00:00Z");
    expect(definition.clean?.("")).toBe(expected.toISOString());
  });

  test("rejects a value that is not a date", () => {
    expect(() => createSiteListSubscriptionInputs.expirationDateTime.clean?.("not-a-date")).toThrow(
      "cannot be coerced to date",
    );
  });
});
