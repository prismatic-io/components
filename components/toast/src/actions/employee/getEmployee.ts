import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { getEmployeeExamplePayload as examplePayload } from "../../examplePayloads";
import { getEmployeeInputs as inputs } from "../../inputs/employee";

export const getEmployee = action({
  display: {
    label: "Get Employee",
    description:
      "Returns an Employee object containing information about one restaurant employee.",
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

    const { data } = await client.get(`/labor/v1/employees/${employeeId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
