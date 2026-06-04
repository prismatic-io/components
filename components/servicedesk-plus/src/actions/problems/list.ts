import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listProblemsResponse as examplePayload } from "../../examplePayloads";
import { listProblemsInputs as inputs } from "../../inputs";
import { buildCriteriaObject, paginateData } from "../../util";

export const listProblems = action({
  display: {
    label: "List Problems",
    description: "Retrieve a list of problems",
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
      "problems",
      rowCount,
      page,
      fetchAll,
      criteriaData,
    );
    return { data };
  },
  examplePayload,
});
