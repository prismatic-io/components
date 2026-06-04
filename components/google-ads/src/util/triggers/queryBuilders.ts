export const buildCampaignQuery = (options: {
  customerId: string;
  changeTypes: string[];
  sinceDate: string;
  toDate: string;
}): string => {
  const { changeTypes, sinceDate, toDate } = options;

  const fields = ["campaign.id", "campaign.name", "campaign.status"];

  if (changeTypes.includes("budget") || changeTypes.includes("all")) {
    fields.push("campaign_budget.amount_micros", "campaign_budget.period");
  }

  if (changeTypes.includes("bidding") || changeTypes.includes("all")) {
    fields.push(
      "campaign.bidding_strategy_type",
      "campaign.target_cpa.target_cpa_micros",
      "campaign.target_roas.target_roas",
    );
  }

  if (changeTypes.includes("settings") || changeTypes.includes("all")) {
    fields.push(
      "campaign.start_date_time",
      "campaign.end_date_time",
      "campaign.advertising_channel_type",
      "campaign.network_settings.target_google_search",
      "campaign.network_settings.target_search_network",
    );
  }

  const query = `
    SELECT ${fields.join(", ")}
    FROM campaign
    WHERE segments.date >= '${sinceDate}' AND segments.date <= '${toDate}'
    ORDER BY campaign.id
  `;

  return query.trim();
};
