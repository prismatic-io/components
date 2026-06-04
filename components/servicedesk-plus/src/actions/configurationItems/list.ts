import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listConfigurationItemsResponse } from "../../examplePayloads";
import {
  ciTypeApiName,
  conditionsCriteria,
  conditionsCriteriaValue,
  connectionInput,
  fetchAll,
  page,
  rowCount,
} from "../../inputs";
import { buildCriteriaObject, paginateData } from "../../util";

export const listConfigurationItems = action({
  display: {
    label: "List Configuration Items",
    description: "Retrieve a list of all configuration items on the CMDB",
  },
  inputs: {
    ciTypeApiName,
    conditionsCriteria,
    conditionsCriteriaValue,
    rowCount,
    page,
    fetchAll,
    connectionInput,
  },
  perform: async (
    context,
    {
      connectionInput,
      ciTypeApiName,
      fetchAll,
      page,
      rowCount,
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
      ciTypeApiName as string,
      rowCount,
      page,
      fetchAll,
      criteriaData,
      true,
    );
    return { data };
  },
  examplePayload: {
    data: listConfigurationItemsResponse,
  },
});
