import { util } from "@prismatic-io/spectral";
import {
  BUDGET_SEVERITY,
  MICROS_TO_DOLLARS_CONVERSION_FACTOR,
} from "../../constants";
import type { BudgetStatus, CampaignQueryRow } from "../../types";

export const calculateBudgetStatus = (
  campaign: CampaignQueryRow,
  alertThreshold: number,
): BudgetStatus => {
  const budgetMicros = util.types.toNumber(
    campaign?.campaignBudget?.amountMicros,
  );
  const costMicros = util.types.toNumber(campaign?.metrics?.costMicros);

  const budgetAmount = budgetMicros / MICROS_TO_DOLLARS_CONVERSION_FACTOR;
  const spent = costMicros / MICROS_TO_DOLLARS_CONVERSION_FACTOR;
  const percentSpent = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
  const remaining = budgetAmount - spent;

  let severity: BUDGET_SEVERITY = BUDGET_SEVERITY.INFO;
  let shouldAlert = false;
  let message = "";

  const period = campaign.campaignBudget?.period?.toLowerCase() || "budget";

  if (percentSpent >= 100) {
    severity = BUDGET_SEVERITY.CRITICAL;
    shouldAlert = true;
    message = `Campaign has exceeded ${period}`;
  } else if (percentSpent >= 95) {
    severity = BUDGET_SEVERITY.CRITICAL;
    shouldAlert = true;
    message = `Campaign has spent ${percentSpent.toFixed(1)}% of ${period}`;
  } else if (percentSpent >= alertThreshold) {
    severity = BUDGET_SEVERITY.WARNING;
    shouldAlert = true;
    message = `Campaign has spent ${percentSpent.toFixed(1)}% of ${period}`;
  }

  return {
    campaignId: campaign.campaign.id,
    campaignName: campaign.campaign.name,
    budgetAmount,
    spent,
    percentSpent: Math.round(percentSpent),
    remaining,
    period: campaign.campaignBudget?.period || "UNKNOWN",
    shouldAlert,
    severity,
    message,
  };
};
