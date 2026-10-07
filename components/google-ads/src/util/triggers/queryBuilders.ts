import {
  CAMPAIGN_CHANGE_RESOURCE_TYPE,
  CHANGE_HISTORY_RESOURCE_TYPE_QUERY_VALUE,
  CHANGE_TYPE,
} from "../../constants";
import { isAllChangeTypesSelected } from "./changeDetection";
const resolveCampaignChangeResourceTypes = (
  changeTypes: string[],
): string[] => {
  const all = isAllChangeTypesSelected(changeTypes);
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
  limit: number;
}): string => {
  const { sinceTime, toTime, changeTypes, limit } = options;
  const resourceTypes = resolveCampaignChangeResourceTypes(changeTypes)
    .map((type) => `'${type}'`)
    .join(",");
  return `
    SELECT
      change_event.resource_name,
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
    ORDER BY change_event.change_date_time ASC
    LIMIT ${limit}
  `.trim();
};
export const buildBudgetAlertQuery = (options: {
  includeSharedBudgets: boolean;
}): string => {
  const { includeSharedBudgets } = options;
  const sharedBudgetFilter = includeSharedBudgets
    ? ""
    : "\n      AND campaign_budget.explicitly_shared = FALSE";
  const query = `
    SELECT
      campaign.id,
      campaign.name,
      campaign_budget.amount_micros,
      campaign_budget.total_amount_micros,
      campaign_budget.period,
      metrics.cost_micros
    FROM campaign
    WHERE segments.date DURING TODAY
      AND campaign.status = 'ENABLED'${sharedBudgetFilter}
  `;
  return query.trim();
};
export const buildChangeHistoryQuery = (options: {
  sinceTime: string;
  toTime: string;
  resourceTypes: string[];
  includeUserInfo: boolean;
  limit: number;
}): string => {
  const { sinceTime, toTime, resourceTypes, includeUserInfo, limit } = options;
  const resourceFilter =
    resourceTypes.length > 0
      ? `AND change_event.change_resource_type IN (${resourceTypes
          .map(
            (type) =>
              `'${CHANGE_HISTORY_RESOURCE_TYPE_QUERY_VALUE[type] ?? type}'`,
          )
          .join(",")})`
      : "";
  const userFields = includeUserInfo
    ? "change_event.user_email,\n          change_event.client_type,"
    : "";
  const query = `
    SELECT
      change_event.resource_name,
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
    ORDER BY change_event.change_date_time ASC
    LIMIT ${limit}
  `;
  return query.trim();
};
