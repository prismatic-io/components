import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { updateShiftExamplePayload as examplePayload } from "../../examplePayloads";
import { updateShiftInputs as inputs } from "../../inputs/shift";

export const updateShift = action({
  display: {
    label: "Update Shift",
    description:
      "Updates an existing schedule shift record for a restaurant employee.",
  },
  perform: async (
    context,
    {
      connection,
      restaurantExternalId,
      shiftId,
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
      entityType: "Shift",
      jobReference,
      employeeReference,
      inDate,
      outDate,
      ...additionalFields,
    };
    const { data } = await client.put(`/labor/v1/shifts/${shiftId}`, body);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
