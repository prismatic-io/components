import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listProblemNotesResponse as examplePayload } from "../../examplePayloads";
import { listProblemNotesInputs as inputs } from "../../inputs";
import { buildCriteriaObject, paginateData } from "../../util";

export const listProblemNotes = action({
  display: {
    label: "List Problem Notes",
    description: "Retrieve a list of problem notes",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      noteProblemId,
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
      "notes",
      rowCount,
      page,
      fetchAll,
      criteriaData,
      false,
      `/problems/${noteProblemId}/notes`,
    );
    return { data };
  },
  examplePayload,
});
