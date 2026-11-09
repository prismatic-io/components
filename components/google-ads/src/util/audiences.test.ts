import { buildAudienceDestination, buildConsent } from "./audiences";

describe("buildAudienceDestination", () => {
  test("targets the audience of the operating customer", () => {
    expect(buildAudienceDestination("1234567890", "9876543210")).toEqual({
      operatingAccount: { accountType: "GOOGLE_ADS", accountId: "1234567890" },
      productDestinationId: "9876543210",
    });
  });

  test("adds the manager as the login account when given", () => {
    expect(
      buildAudienceDestination("1234567890", "9876543210", "1111111111"),
    ).toMatchObject({
      loginAccount: { accountType: "GOOGLE_ADS", accountId: "1111111111" },
    });
  });
});

describe("buildConsent", () => {
  test("sends nothing when neither status is set", () => {
    expect(buildConsent()).toBeUndefined();
  });

  test("sends only the statuses that are set", () => {
    expect(buildConsent("CONSENT_GRANTED")).toEqual({
      adUserData: "CONSENT_GRANTED",
    });
    expect(buildConsent("CONSENT_GRANTED", "CONSENT_DENIED")).toEqual({
      adUserData: "CONSENT_GRANTED",
      adPersonalization: "CONSENT_DENIED",
    });
  });
});
