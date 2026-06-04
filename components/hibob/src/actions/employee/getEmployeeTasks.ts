import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { getEmployeeTasksExamplePayload } from "../../examplePayloads";
import { getEmployeeTasksInputs } from "../../inputs";

export const getEmployeeTasks = action({
  display: {
    label: "Get Employee Tasks",
    description: "Retrieves all tasks assigned to a specific employee.",
  },
  perform: async (context, { connection, employeeId, taskStatus }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.get(`/tasks/people/${employeeId}`, {
      params: {
        task_status: taskStatus,
      },
    });
    return {
      data,
    };
  },
  inputs: getEmployeeTasksInputs,
  examplePayload: getEmployeeTasksExamplePayload,
});
