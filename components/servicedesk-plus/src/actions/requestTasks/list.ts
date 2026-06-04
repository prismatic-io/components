import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listRequestTasksResponse as examplePayload } from "../../examplePayloads";
import { listRequestTasksInputs as inputs } from "../../inputs";
import { buildCriteriaObject, paginateData } from "../../util";

export const listRequestTasks = action({
  display: {
    label: "List Request Tasks",
    description: "Retrieve a list of request tasks",
  },
  inputs,
  perform: async (
    context,
    {
      connectionInput,
      taskRequestId,
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
      `/requests/${taskRequestId}/tasks`,
    );
    return { data };
  },
  examplePayload,
});
