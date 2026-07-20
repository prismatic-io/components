import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listProductTypesResponse } from "../../examplePayloads";
import {
  conditionsCriteria,
  conditionsCriteriaValue,
  connectionInput,
  fetchAll,
  pagination,
} from "../../inputs";
import { buildCriteriaObject, paginateData } from "../../util";
export const listProductTypes = action({
  display: {
    label: "List Product Types",
    description: "Retrieve a list of product types",
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
      "product_types",
      pagination.rowCount,
      pagination.page,
      fetchAll,
      criteriaData,
    );
    return { data };
  },
  examplePayload: {
    data: listProductTypesResponse,
  },
});
