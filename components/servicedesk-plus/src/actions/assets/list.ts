import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAssetsResponse } from "../../examplePayloads";
import {
  conditionsCriteria,
  conditionsCriteriaValue,
  connectionInput,
  fetchAll,
  page,
  rowCount,
} from "../../inputs";
import { buildCriteriaObject, paginateData } from "../../util";

export const listAssets = action({
  display: {
    label: "List Assets",
    description: "Retrieve a list of assets",
  },
  inputs: {
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
      "assets",
      rowCount,
      page,
      fetchAll,
      criteriaData,
    );
    return { data };
  },
  examplePayload: {
    data: listAssetsResponse,
  },
});
