import { mutateCampaignCriteriaInputs, mutateCampaignInputs } from "./campaign";
import {
  ingestOfflineConversionsInputs,
  uploadCallConversionsInputs,
  uploadClickConversionsInputs,
} from "./conversions";
import { pageSizeInput } from "./common";
import { customerEntityInputs } from "./customer";
import {
  accountReportsInputs,
  detailedLeadReportsInputs,
} from "./localServices";
import { searchAdsLocalServicesInputs } from "./search";
import {
  budgetAlertTriggerInputs,
  campaignChangesTriggerInputs,
  changeHistoryTriggerInputs,
} from "./triggers";
describe("mutateCampaignInputs.operations.clean", () => {
  const clean = mutateCampaignInputs.operations.clean as (
    value: unknown,
  ) => unknown;
  test("parses a valid JSON array string", () => {
    expect(clean('[{"create":{"name":"Campaign 1"}}]')).toEqual([
      { create: { name: "Campaign 1" } },
    ]);
  });
  test("returns an invalid JSON string unchanged", () => {
    expect(clean("{not valid json")).toBe("{not valid json");
  });
});
describe("uploadClickConversionsInputs.conversions.clean", () => {
  const clean = uploadClickConversionsInputs.conversions.clean as (
    value: unknown,
  ) => unknown;
  test("parses a valid JSON array string", () => {
    expect(clean('[{"gclid":"abc123","conversionValue":10}]')).toEqual([
      { gclid: "abc123", conversionValue: 10 },
    ]);
  });
  test("returns an invalid JSON string unchanged", () => {
    expect(clean("not json")).toBe("not json");
  });
});
describe("ingestOfflineConversionsInputs.events.clean", () => {
  const clean = ingestOfflineConversionsInputs.events.clean as (
    value: unknown,
  ) => unknown;
  test("parses a valid JSON array string", () => {
    expect(
      clean('[{"transactionId":"ORDER-1","conversionValue":99.99}]'),
    ).toEqual([{ transactionId: "ORDER-1", conversionValue: 99.99 }]);
  });
  test("returns an invalid JSON string unchanged", () => {
    expect(clean("[not json]")).toBe("[not json]");
  });
});
describe("ingestOfflineConversionsInputs.destinations.clean", () => {
  const clean = ingestOfflineConversionsInputs.destinations.clean as (
    value: unknown,
  ) => unknown;
  test("parses a valid JSON array string", () => {
    expect(
      clean(
        '[{"operatingAccount":{"accountType":"GOOGLE_ADS","accountId":"1"},"productDestinationId":"2"}]',
      ),
    ).toEqual([
      {
        operatingAccount: { accountType: "GOOGLE_ADS", accountId: "1" },
        productDestinationId: "2",
      },
    ]);
  });
  test("returns an invalid JSON string unchanged", () => {
    expect(clean("{destinations")).toBe("{destinations");
  });
});
describe.each([
  ["mutateCampaignInputs", mutateCampaignInputs.managerCustomerId],
  [
    "mutateCampaignCriteriaInputs",
    mutateCampaignCriteriaInputs.managerCustomerId,
  ],
  [
    "uploadClickConversionsInputs",
    uploadClickConversionsInputs.managerCustomerId,
  ],
  [
    "uploadCallConversionsInputs",
    uploadCallConversionsInputs.managerCustomerId,
  ],
  ["customerEntityInputs", customerEntityInputs.managerCustomerId],
  [
    "searchAdsLocalServicesInputs",
    searchAdsLocalServicesInputs.managerCustomerId,
  ],
  [
    "campaignChangesTriggerInputs",
    campaignChangesTriggerInputs.managerCustomerId,
  ],
  ["budgetAlertTriggerInputs", budgetAlertTriggerInputs.managerCustomerId],
  ["changeHistoryTriggerInputs", changeHistoryTriggerInputs.managerCustomerId],
])("%s.managerCustomerId (optional override)", (_name, managerCustomerId) => {
  const clean = managerCustomerId.clean as (value: unknown) => unknown;
  test("is optional", () => {
    expect(managerCustomerId.required).toBe(false);
  });
  test("returns undefined for an empty value", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
  test("still normalizes a hyphenated customer ID", () => {
    expect(clean("123-456-7890")).toBe("1234567890");
  });
});
describe.each([
  ["pageSizeInput", pageSizeInput],
  [
    "accountReportsInputs.pagination",
    accountReportsInputs.pagination.inputs.pageSizeInput,
  ],
  [
    "detailedLeadReportsInputs.pagination",
    detailedLeadReportsInputs.pagination.inputs.pageSizeInput,
  ],
])("%s page size clean", (_name, pageSize) => {
  const clean = pageSize.clean as (value: unknown) => unknown;
  test("is optional", () => {
    expect(pageSize.required).toBe(false);
  });
  test("parses a numeric string", () => {
    expect(clean("100")).toBe(100);
  });
  test("returns undefined for an empty value", () => {
    expect(clean("")).toBeUndefined();
    expect(clean(undefined)).toBeUndefined();
  });
});
