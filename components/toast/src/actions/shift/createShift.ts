import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { createShiftExamplePayload as examplePayload } from "../../examplePayloads";
import { createShiftInputs as inputs } from "../../inputs/shift";

export const createShift = action({
  display: {
    label: "Create Shift",
    description: "Creates a schedule shift for a restaurant employee.",
  },
  perform: async (
    context,
    {
      connection,
      restaurantExternalId,
      externalId,
      jobReference,
      employeeReference,
      inDate,
      outDate,
      additionalFields,
    },
  ) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );
    const body = {
      externalId,
      entityType: "Shift",
      jobReference,
      employeeReference,
      inDate,
      outDate,
      ...additionalFields,
    };
    const { data } = await client.post(`/labor/v1/shifts`, body);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
