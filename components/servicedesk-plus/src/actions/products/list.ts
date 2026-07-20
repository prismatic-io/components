import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listProductsResponse } from "../../examplePayloads";
import {
  conditionsCriteria,
  conditionsCriteriaValue,
  connectionInput,
  fetchAll,
  pagination,
} from "../../inputs";
import { buildCriteriaObject, paginateData } from "../../util";
export const listProducts = action({
  display: {
    label: "List Products",
    description: "Retrieve a list of products",
  },
  inputs: {
    conditionsCriteria,
    conditionsCriteriaValue,
    pagination,
    fetchAll,
    connectionInput,
  },
  perform: async (
    context,
    {
      connectionInput,
      fetchAll,
      pagination = {},
      conditionsCriteria,
      conditionsCriteriaValue,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const criteriaData = buildCriteriaObject(
      conditionsCriteria,
      conditionsCriteriaValue,
    );
    const data = await paginateData(
      client,
      "products",
      pagination.rowCount,
      pagination.page,
      fetchAll,
      criteriaData,
    );
    return { data };
  },
  examplePayload: {
    data: listProductsResponse,
  },
});
