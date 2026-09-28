import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listOrderItemsExamplePayload } from "../../examplePayloads";
import { listOrderItemsInputs } from "../../inputs";
import { paginateResults, removeUndefinedValuesFromObject } from "../../utils";
export const listOrderItems = action({
  display: {
    label: "List Order Items",
    description: "Lists order items that match specified search criteria.",
  },
  examplePayload: listOrderItemsExamplePayload,
  performSafety: "notAllowed",
  examplePerform: async () => listOrderItemsExamplePayload,
  perform: async (
    context,
    {
      connection,
      fetchAll,
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
      endpoint: ENDPOINTS.orderItems,
      queryParams,
      fetchAll,
    });
  },
  inputs: listOrderItemsInputs,
});
