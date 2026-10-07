import { CHANGE_TYPE } from "../../constants";
import {
  buildBudgetAlertQuery,
  buildCampaignChangeEventQuery,
  buildChangeHistoryQuery,
} from "./queryBuilders";
describe("buildCampaignChangeEventQuery", () => {
  const baseOptions = {
    sinceTime: "2026-01-01 00:00:00",
    toTime: "2026-01-02 00:00:00",
    limit: 10000,
  };
  test("with an empty change-types filter, queries both CAMPAIGN and CAMPAIGN_BUDGET (leave empty = all)", () => {
    const query = buildCampaignChangeEventQuery({
      ...baseOptions,
      changeTypes: [],
    });
    expect(query).toContain("'CAMPAIGN'");
    expect(query).toContain("'CAMPAIGN_BUDGET'");
  });
  test("with only 'status' selected, does not query CAMPAIGN_BUDGET", () => {
    const query = buildCampaignChangeEventQuery({
      ...baseOptions,
      changeTypes: [CHANGE_TYPE.STATUS],
    });
    expect(query).toContain("'CAMPAIGN'");
    expect(query).not.toContain("'CAMPAIGN_BUDGET'");
  });
  test("with 'budget' selected, queries CAMPAIGN_BUDGET", () => {
    const query = buildCampaignChangeEventQuery({
      ...baseOptions,
      changeTypes: [CHANGE_TYPE.BUDGET],
    });
    expect(query).toContain("'CAMPAIGN_BUDGET'");
  });
});
describe("buildChangeHistoryQuery", () => {
  const baseOptions = {
    sinceTime: "2026-01-01 00:00:00",
    toTime: "2026-01-02 00:00:00",
    includeUserInfo: false,
    limit: 1000,
  };
  test("maps the published KEYWORD option to the valid AD_GROUP_CRITERION enum value", () => {
    const query = buildChangeHistoryQuery({
      ...baseOptions,
      resourceTypes: ["KEYWORD"],
    });
    expect(query).toContain("'AD_GROUP_CRITERION'");
    expect(query).not.toContain("'KEYWORD'");
  });
  test("passes other resource types through unchanged", () => {
    const query = buildChangeHistoryQuery({
      ...baseOptions,
      resourceTypes: ["CAMPAIGN", "AD_GROUP", "AD"],
    });
    expect(query).toContain("'CAMPAIGN'");
    expect(query).toContain("'AD_GROUP'");
    expect(query).toContain("'AD'");
  });
  test("an empty resourceTypes list applies no filter", () => {
    const query = buildChangeHistoryQuery({
      ...baseOptions,
      resourceTypes: [],
    });
    expect(query).not.toContain("change_resource_type IN");
  });
});
describe("buildBudgetAlertQuery", () => {
  test("always scopes the comparison to today's spend, not a persisted range", () => {
    const query = buildBudgetAlertQuery({ includeSharedBudgets: true });
    expect(query).toContain("segments.date DURING TODAY");
    expect(query).not.toMatch(/segments\.date >= /);
  });
  test("default (includeSharedBudgets: true) does not filter out shared budgets", () => {
    const query = buildBudgetAlertQuery({ includeSharedBudgets: true });
    expect(query).not.toContain("explicitly_shared");
  });
  test("includeSharedBudgets: false excludes explicitly shared budgets", () => {
    const query = buildBudgetAlertQuery({ includeSharedBudgets: false });
    expect(query).toContain("campaign_budget.explicitly_shared = FALSE");
  });
});
