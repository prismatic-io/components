import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { createEmployeeExamplePayload as examplePayload } from "../../examplePayloads";
import { createEmployeeInputs as inputs } from "../../inputs/employee";

export const createEmployee = action({
  display: {
    label: "Create Employee",
    description: "Creates a restaurant employee record.",
  },
  perform: async (
    context,
    {
      connection,
      restaurantExternalId,
      email,
      firstName,
      chosenName,
      lastName,
      externalId,
      externalEmployeeId,
      jobReferences,
      wageOverrides,
      additionalFields,
    },
  ) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );
    const payload = {
      entityType: "RestaurantUser",
      email,
      firstName,
      chosenName,
      lastName,
      externalId,
      externalEmployeeId,
      jobReferences,
      wageOverrides,
      ...additionalFields,
    };
    const { data } = await client.post(`/labor/v1/employees`, payload);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
