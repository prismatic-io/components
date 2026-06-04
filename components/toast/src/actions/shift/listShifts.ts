import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { listShiftsExamplePayload as examplePayload } from "../../examplePayloads";
import { listShiftsInputs as inputs } from "../../inputs/shift";
import { serializeRepeatedParam } from "../../utils";

export const listShifts = action({
  display: {
    label: "List Shifts",
    description:
      "Returns an array of Shift objects that contain information about schedule shifts for restaurant employees.",
  },
  perform: async (
    context,
    { connection, restaurantExternalId, endDate, shiftIds, startDate },
  ) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );

    const serializedshiftIds = serializeRepeatedParam(
      shiftIds || [],
      "shiftIds",
    );

    const { data } = await client.get(
      `/labor/v1/shifts?${serializedshiftIds}`,
      {
        params: {
          endDate,
          startDate,
        },
      },
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
