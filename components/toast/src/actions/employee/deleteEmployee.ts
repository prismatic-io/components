import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { deleteEmployeeExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteEmployeeInputs as inputs } from "../../inputs/employee";

export const deleteEmployee = action({
  display: {
    label: "Delete Employee",
    description:
      "Deletes a restaurant employee record by marking the record as deleted.",
  },
  perform: async (
    context,
    { connection, restaurantExternalId, employeeId },
  ) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );

    const { data } = await client.delete(`/labor/v1/employees/${employeeId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
