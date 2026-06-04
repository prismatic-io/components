import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { updateEmployeeExamplePayload as examplePayload } from "../../examplePayloads";
import { updateEmployeeInputs as inputs } from "../../inputs/employee";

export const updateEmployee = action({
  display: {
    label: "Update Employee",
    description: "Performs Update Employee",
  },
  perform: async (
    context,
    {
      connection,
      restaurantExternalId,
      employeeId,
      firstName,
      chosenName,
      lastName,
      externalEmployeeId,
      passcode,
      currentPasscode,
      additionalFields,
    },
  ) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );
    const payload = {
      firstName,
      chosenName,
      lastName,
      externalEmployeeId,
      passcode,
      currentPasscode,
      ...additionalFields,
    };
    const { data } = await client.patch(
      `/labor/v1/employees/${employeeId}`,
      payload,
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
