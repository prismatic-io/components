import {
  CAMPAIGN_CHANGE_RESOURCE_TYPE,
  CHANGE_EVENT_ROW_LIMIT,
  CHANGE_TYPE,
} from "../../constants";
const resolveCampaignChangeResourceTypes = (
  changeTypes: string[],
): string[] => {
  const all = changeTypes.includes(CHANGE_TYPE.ALL);
  const types: string[] = [CAMPAIGN_CHANGE_RESOURCE_TYPE.CAMPAIGN];
  if (all || changeTypes.includes(CHANGE_TYPE.BUDGET)) {
    types.push(CAMPAIGN_CHANGE_RESOURCE_TYPE.CAMPAIGN_BUDGET);
  }
  return types;
};
export const buildCampaignChangeEventQuery = (options: {
  sinceTime: string;
  toTime: string;
  changeTypes: string[];
}): string => {
  const { sinceTime, toTime, changeTypes } = options;
  const resourceTypes = resolveCampaignChangeResourceTypes(changeTypes)
    .map((type) => `'${type}'`)
    .join(",");
  return `
    SELECT
      change_event.change_date_time,
      change_event.change_resource_type,
      change_event.change_resource_name,
      change_event.resource_change_operation,
      change_event.changed_fields,
      change_event.old_resource,
      change_event.new_resource,
      campaign.id,
      campaign.name
    FROM change_event
    WHERE change_event.change_date_time >= '${sinceTime}'
      AND change_event.change_date_time < '${toTime}'
      AND change_event.change_resource_type IN (${resourceTypes})
    ORDER BY change_event.change_date_time DESC
    LIMIT ${CHANGE_EVENT_ROW_LIMIT}
  `.trim();
};
export const buildBudgetAlertQuery = (options: {
  sinceDate: string;
  toDate: string;
}): string => {
  const { sinceDate, toDate } = options;
  const query = `
    SELECT
      campaign.id,
      campaign.name,
      campaign_budget.amount_micros,
      campaign_budget.total_amount_micros,
      campaign_budget.period,
      metrics.cost_micros
    FROM campaign
    WHERE segments.date >= '${sinceDate}' AND segments.date <= '${toDate}'
      AND campaign.status = 'ENABLED'
  `;
  return query.trim();
};
export const buildChangeHistoryQuery = (options: {
  sinceTime: string;
  toTime: string;
  resourceTypes: string[];
  includeUserInfo: boolean;
}): string => {
  const { sinceTime, toTime, resourceTypes, includeUserInfo } = options;
  const resourceFilter =
    resourceTypes.length > 0
      ? `AND change_event.change_resource_type IN (${resourceTypes.map((type) => `'${type}'`).join(",")})`
      : "";
  const userFields = includeUserInfo
    ? "change_event.user_email,\n          change_event.client_type,"
    : "";
  const query = `
    SELECT
      change_event.change_date_time,
      change_event.change_resource_type,
      change_event.change_resource_name,
      ${userFields}
      change_event.resource_change_operation,
      change_event.old_resource,
      change_event.new_resource
    FROM change_event
    WHERE change_event.change_date_time >= '${sinceTime}'
      AND change_event.change_date_time < '${toTime}'
      ${resourceFilter}
    ORDER BY change_event.change_date_time DESC
    LIMIT 1000
  `;
  return query.trim();
};
