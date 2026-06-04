import type { FilterType } from "./FilterType";

export interface CreateOrUpdateRulesBody {
  properties?: {
    action?: object;
    correlationFilter?: object;
    filterType?: FilterType;
    sqlFilter?: object;
  };
}
