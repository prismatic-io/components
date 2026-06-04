import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listProblemTasksResponse as examplePayload } from "../../examplePayloads";
import { listProblemTasksInputs as inputs } from "../../inputs";
import { buildCriteriaObject, paginateData } from "../../util";

export const listProblemTasks = action({
  display: {
    label: "List Problem Tasks",
    description: "Retrieve a list of problem tasks",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      taskProblemId,
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
      "tasks",
      rowCount,
      page,
      fetchAll,
      criteriaData,
      false,
      `/problems/${taskProblemId}/tasks`,
    );
    return { data };
  },
  examplePayload,
});
