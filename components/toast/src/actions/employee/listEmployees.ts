import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { listEmployeesExamplePayload as examplePayload } from "../../examplePayloads";
import { listEmployeesInputs as inputs } from "../../inputs/employee";
import { serializeRepeatedParam } from "../../utils";

export const listEmployees = action({
  display: {
    label: "List Employees",
    description:
      "Returns an array of Employee objects containing information about restaurant employees.",
  },
  perform: async (
    context,
    { connection, restaurantExternalId, employeeIds },
  ) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );
    const serializedEmployeeIds = serializeRepeatedParam(
      employeeIds || [],
      "employeeIds",
    );

    const { data } = await client.get(
      `/labor/v1/employees?${serializedEmployeeIds}`,
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
