import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getClient } from "../client";
import { removeUndefinedValuesFromObject } from "../helpers";
import {
  connectionInput,
  searchCriteriaConditionType,
  searchCriteriaCurrentPage,
  searchCriteriaField,
  searchCriteriaPageSize,
  searchCriteriaSortDirection,
  searchCriteriaSortField,
  searchCriteriaValue,
} from "../inputs";

export const listOrderItems = action({
  display: {
    label: "List Order Items",
    description: "Lists order items that match specified search criteria.",
  },
  perform: async (
    context,
    {
      connection,
      searchCriteriaConditionType,
      searchCriteriaCurrentPage,
      searchCriteriaField,
      searchCriteriaPageSize,
      searchCriteriaSortDirection,
      searchCriteriaSortField,
      searchCriteriaValue,
    },
  ) => {
    const client = await getClient(connection, context.debug.enabled);
    const queryParams = removeUndefinedValuesFromObject({
      "searchCriteria[currentPage]": searchCriteriaCurrentPage || undefined,
      "searchCriteria[filterGroups][0][filters][0][conditionType]":
        searchCriteriaConditionType || undefined,
      "searchCriteria[filterGroups][0][filters][0][field]": searchCriteriaField || undefined,
      "searchCriteria[filterGroups][0][filters][0][value]": searchCriteriaValue || undefined,
      "searchCriteria[pageSize]": searchCriteriaPageSize || undefined,
      "searchCriteria[sortOrders][0][direction]": searchCriteriaSortDirection || undefined,
      "searchCriteria[sortOrders][0][field]": searchCriteriaSortField || undefined,
    });
    try {
      const { data } = await client.get("/orders/items", {
        params: queryParams,
      });
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection: connectionInput,
    searchCriteriaConditionType,
    searchCriteriaCurrentPage,
    searchCriteriaField,
    searchCriteriaPageSize,
    searchCriteriaSortDirection,
    searchCriteriaSortField,
    searchCriteriaValue,
  },
});

export default { listOrderItems };
