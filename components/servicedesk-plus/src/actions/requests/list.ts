import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listRequestsResponse as examplePayload } from "../../examplePayloads";
import { listRequestsInputs as inputs } from "../../inputs";
import { buildCriteriaObject, paginateData } from "../../util";

export const listRequests = action({
  display: {
    label: "List Requests",
    description: "Retrieve a list of requests",
  },
  inputs,
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
      "requests",
      rowCount,
      page,
      fetchAll,
      criteriaData,
    );
    return { data };
  },
  examplePayload,
});
