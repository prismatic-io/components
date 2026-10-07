import { CHANGE_TYPE } from "../../constants";
import type { CampaignChangeEventRow } from "../../types";
import {
  isAllChangeTypesSelected,
  mapChangeEventsToCampaignChanges,
} from "./changeDetection";
describe("isAllChangeTypesSelected", () => {
  test("is true when the list is empty (the input's own comment: leave empty to detect all)", () => {
    expect(isAllChangeTypesSelected([])).toBe(true);
  });
  test("is true when 'all' is explicitly selected", () => {
    expect(isAllChangeTypesSelected([CHANGE_TYPE.ALL])).toBe(true);
    expect(
      isAllChangeTypesSelected([CHANGE_TYPE.STATUS, CHANGE_TYPE.ALL]),
    ).toBe(true);
  });
  test("is false for a non-empty list without 'all'", () => {
    expect(isAllChangeTypesSelected([CHANGE_TYPE.STATUS])).toBe(false);
  });
});
describe("mapChangeEventsToCampaignChanges", () => {
  const statusRow: CampaignChangeEventRow = {
    campaign: { id: "1", name: "Example-Campaign-1" },
    changeEvent: {
      resourceName: "customers/1/changeEvents/1",
      changeDateTime: "2026-01-01 12:00:00",
      changeResourceType: "CAMPAIGN",
      changeResourceName: "customers/1/campaigns/1",
      clientType: "GOOGLE_ADS_WEB_CLIENT",
      resourceChangeOperation: "UPDATE",
      oldResource: {
        campaign: { resourceName: "customers/1/campaigns/1", status: "PAUSED" },
      },
      newResource: {
        campaign: {
          resourceName: "customers/1/campaigns/1",
          status: "ENABLED",
        },
      },
    },
  };
  const budgetRow: CampaignChangeEventRow = {
    campaign: { id: "1", name: "Example-Campaign-1" },
    changeEvent: {
      resourceName: "customers/1/changeEvents/2",
      changeDateTime: "2026-01-01 12:05:00",
      changeResourceType: "CAMPAIGN_BUDGET",
      changeResourceName: "customers/1/campaignBudgets/1",
      clientType: "GOOGLE_ADS_WEB_CLIENT",
      resourceChangeOperation: "UPDATE",
      oldResource: { campaignBudget: { amountMicros: "50000000" } },
      newResource: { campaignBudget: { amountMicros: "75000000" } },
    },
  };
  test("with an empty change-types filter, reports status and budget changes (leave empty = all)", () => {
    const changes = mapChangeEventsToCampaignChanges(
      [statusRow, budgetRow],
      [],
    );
    expect(changes.map((c) => c.changeType)).toEqual(
      expect.arrayContaining(["status", "budget"]),
    );
    expect(changes).toHaveLength(2);
  });
  test("with an empty filter, still reports bidding changes", () => {
    const biddingRow: CampaignChangeEventRow = {
      campaign: { id: "1", name: "Example-Campaign-1" },
      changeEvent: {
        ...statusRow.changeEvent,
        resourceName: "customers/1/changeEvents/3",
      },
    };
    biddingRow.changeEvent.oldResource = {
      campaign: {
        resourceName: "customers/1/campaigns/1",
        biddingStrategyType: "MANUAL_CPC",
      },
    };
    biddingRow.changeEvent.newResource = {
      campaign: {
        resourceName: "customers/1/campaigns/1",
        biddingStrategyType: "TARGET_CPA",
      },
    };
    const changes = mapChangeEventsToCampaignChanges([biddingRow], []);
    expect(changes).toHaveLength(1);
    expect(changes[0].changeType).toBe("bidding");
  });
  test("with a specific filter that excludes budget, budget changes are not reported", () => {
    const changes = mapChangeEventsToCampaignChanges(
      [statusRow, budgetRow],
      [CHANGE_TYPE.STATUS],
    );
    expect(changes.map((c) => c.changeType)).toEqual(["status"]);
  });
  test("rows arriving oldest first produce the same order the newest-first query did", () => {
    const statusAndBiddingRow: CampaignChangeEventRow = {
      campaign: { id: "1", name: "Example-Campaign-1" },
      changeEvent: {
        ...statusRow.changeEvent,
        oldResource: {
          campaign: {
            resourceName: "customers/1/campaigns/1",
            status: "PAUSED",
            biddingStrategyType: "MANUAL_CPC",
          },
        },
        newResource: {
          campaign: {
            resourceName: "customers/1/campaigns/1",
            status: "ENABLED",
            biddingStrategyType: "TARGET_CPA",
          },
        },
      },
    };
    const changes = mapChangeEventsToCampaignChanges(
      [statusAndBiddingRow, budgetRow],
      [],
    );
    expect(changes.map((c) => c.changeType)).toEqual([
      "bidding",
      "status",
      "budget",
    ]);
  });
});
