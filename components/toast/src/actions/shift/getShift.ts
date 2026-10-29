import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { getShiftExamplePayload as examplePayload } from "../../examplePayloads";
import { getShiftInputs as inputs } from "../../inputs/shift";

export const getShift = action({
  display: {
    label: "Get Shift",
    description: "Performs Get Shift",
  },
  perform: async (context, { connection, restaurantExternalId, shiftId }) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );

    const { data } = await client.get(`/labor/v1/shifts/${shiftId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
