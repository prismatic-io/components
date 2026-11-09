import { util } from "@prismatic-io/spectral";
import {
  getRequestStatusInputs,
  ingestAudienceMembersInputs,
  removeAudienceMembersInputs,
} from "./audiences";
import { mutateCampaignCriteriaInputs, mutateCampaignInputs } from "./campaign";
import {
  fetchAll,
  pageSizeInput,
  partialFailure,
  validateOnly,
} from "./common";
import {
  ingestOfflineConversionsInputs,
  uploadCallConversionsInputs,
  uploadClickConversionsInputs,
} from "./conversions";
import { confirmClientLinkInputs, customerEntityInputs } from "./customer";
import {
  accountReportsInputs,
  appendLeadConversationInputs,
  detailedLeadReportsInputs,
  provideLeadFeedbackInputs,
} from "./localServices";
import { mutateResourcesInputs } from "./mutate";
import { searchAdsLocalServicesInputs, searchStreamInputs } from "./search";
import {
  budgetAlertTriggerInputs,
  campaignChangesTriggerInputs,
  changeHistoryTriggerInputs,
} from "./triggers";
import { inviteUserInputs } from "./user";

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

describe.each([
  ["mutateCampaignInputs", mutateCampaignInputs.operations.default],
  [
    "mutateCampaignCriteriaInputs",
    mutateCampaignCriteriaInputs.operations.default,
  ],
])("%s.operations default", (_, defaultValue) => {
  const defaultOperations = util.types.toObject(defaultValue) as Record<
    string,
    unknown
  >[];

  test("each operation sets exactly one of create, update or remove", () => {
    for (const operation of defaultOperations) {
      const kinds = ["create", "update", "remove"].filter(
        (kind) => operation[kind] !== undefined,
      );
      expect(kinds).toHaveLength(1);
    }
  });

  test("each update carries an updateMask, and nothing else does", () => {
    for (const operation of defaultOperations) {
      expect(operation.updateMask !== undefined).toBe(
        operation.update !== undefined,
      );
    }
  });

  test("covers a create, an update and a remove", () => {
    expect(defaultOperations).toHaveLength(3);
  });
});

describe.each([
  [
    "ingestAudienceMembersInputs.audienceMembers",
    ingestAudienceMembersInputs.audienceMembers,
  ],
  [
    "removeAudienceMembersInputs.audienceMembers",
    removeAudienceMembersInputs.audienceMembers,
  ],
  [
    "mutateResourcesInputs.mutateOperations",
    mutateResourcesInputs.mutateOperations,
  ],
])("%s.clean (toObject)", (_name, codeInput) => {
  const clean = codeInput.clean as (value: unknown) => unknown;

  test("parses a valid JSON array string", () => {
    expect(clean('[{"id":"1"}]')).toEqual([{ id: "1" }]);
  });

  test("passes an already-parsed array through", () => {
    expect(clean([{ id: "1" }])).toEqual([{ id: "1" }]);
  });

  test("returns an invalid JSON string unchanged", () => {
    expect(clean("[not json")).toBe("[not json");
  });

  test("returns an empty value unchanged", () => {
    expect(clean("")).toBe("");
    expect(clean(undefined)).toBeUndefined();
  });
});

describe.each([
  [
    "ingestAudienceMembersInputs.audienceId",
    ingestAudienceMembersInputs.audienceId,
  ],
  [
    "ingestAudienceMembersInputs.customerMatchTermsOfService",
    ingestAudienceMembersInputs.customerMatchTermsOfService,
  ],
  ["getRequestStatusInputs.requestId", getRequestStatusInputs.requestId],
  [
    "confirmClientLinkInputs.managerLinkId",
    confirmClientLinkInputs.managerLinkId,
  ],
  ["provideLeadFeedbackInputs.leadId", provideLeadFeedbackInputs.leadId],
  ["appendLeadConversationInputs.leadId", appendLeadConversationInputs.leadId],
  ["appendLeadConversationInputs.text", appendLeadConversationInputs.text],
  ["searchAdsLocalServicesInputs.query", searchAdsLocalServicesInputs.query],
  ["searchStreamInputs.query", searchStreamInputs.query],
  ["inviteUserInputs.emailAddress", inviteUserInputs.emailAddress],
  ["inviteUserInputs.accessRole", inviteUserInputs.accessRole],
])("%s.clean (toString)", (_name, stringInput) => {
  const clean = stringInput.clean as (value: unknown) => unknown;

  test("returns a string value as is", () => {
    expect(clean("9876543210")).toBe("9876543210");
  });

  test("stringifies a number", () => {
    expect(clean(9876543210)).toBe("9876543210");
  });

  test("does not trim surrounding whitespace", () => {
    expect(clean(" 42 ")).toBe(" 42 ");
  });

  test("returns an empty string for an empty value", () => {
    expect(clean("")).toBe("");
    expect(clean(undefined)).toBe("");
  });
});

describe.each([
  ["validateOnly", validateOnly],
  ["fetchAll", fetchAll],
  ["partialFailure", partialFailure],
  [
    "mutateResourcesInputs.partialFailure",
    mutateResourcesInputs.partialFailure,
  ],
  [
    "searchAdsLocalServicesInputs.returnTotalResultsCount",
    searchAdsLocalServicesInputs.returnTotalResultsCount,
  ],
  [
    "budgetAlertTriggerInputs.includeSharedBudgets",
    budgetAlertTriggerInputs.includeSharedBudgets,
  ],
  [
    "changeHistoryTriggerInputs.includeUserInfo",
    changeHistoryTriggerInputs.includeUserInfo,
  ],
])("%s.clean (toBool)", (_name, boolInput) => {
  const clean = boolInput.clean as (value: unknown) => unknown;

  test("converts the toggle strings", () => {
    expect(clean("true")).toBe(true);
    expect(clean("false")).toBe(false);
  });

  test("passes a boolean through", () => {
    expect(clean(true)).toBe(true);
    expect(clean(false)).toBe(false);
  });

  test("returns false for an empty value, regardless of the input default", () => {
    expect(clean("")).toBe(false);
    expect(clean(undefined)).toBe(false);
  });

  test("returns true for an unrecognized string", () => {
    expect(clean("maybe")).toBe(true);
  });
});

describe("provideLeadFeedbackInputs.surveyAnswer.clean", () => {
  const clean = provideLeadFeedbackInputs.surveyAnswer.clean;

  test("accepts each answer the model offers", () => {
    expect(clean("SATISFIED")).toBe("SATISFIED");
    expect(clean("VERY_DISSATISFIED")).toBe("VERY_DISSATISFIED");
  });

  test("refuses a value the model does not offer", () => {
    expect(() => clean("HAPPY")).toThrow(
      'Survey Answer must be one of VERY_SATISFIED, SATISFIED, NEUTRAL, DISSATISFIED, VERY_DISSATISFIED; got "HAPPY".',
    );
    expect(() => clean("")).toThrow("Survey Answer must be one of");
  });
});
