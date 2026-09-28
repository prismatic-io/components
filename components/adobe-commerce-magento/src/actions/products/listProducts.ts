import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listProductsExamplePayload } from "../../examplePayloads";
import { listProductsInputs } from "../../inputs";
import { paginateResults, removeUndefinedValuesFromObject } from "../../utils";
export const listProducts = action({
  display: {
    label: "List Products",
    description: "Get product list",
  },
  performSafety: "notAllowed",
  examplePerform: async () => listProductsExamplePayload,
  perform: async (
    context,
    {
      connection,
      fetchAll,
      searchCriteriaCurrentPage,
      searchCriteriaConditionType,
      searchCriteriaField,
      searchCriteriaValue,
      searchCriteriaPageSize,
      searchCriteriaSortDirection,
      searchCriteriaSortField,
    },
  ) => {
    const client = await getClient(connection, context.debug.enabled);
    const queryParams = removeUndefinedValuesFromObject({
      "searchCriteria[filterGroups][0][filters][0][conditionType]":
        searchCriteriaConditionType,
      "searchCriteria[filterGroups][0][filters][0][field]": searchCriteriaField,
      "searchCriteria[filterGroups][0][filters][0][value]": searchCriteriaValue,
      "searchCriteria[sortOrders][0][direction]": searchCriteriaSortDirection,
      "searchCriteria[sortOrders][0][field]": searchCriteriaSortField,
      "searchCriteria[currentPage]": searchCriteriaCurrentPage,
      "searchCriteria[pageSize]": searchCriteriaPageSize,
    });
    return await paginateResults({
      client,
      endpoint: ENDPOINTS.products,
      queryParams,
      fetchAll,
    });
  },
  inputs: listProductsInputs,
  examplePayload: listProductsExamplePayload,
});
