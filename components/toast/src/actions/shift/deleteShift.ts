import { action } from "@prismatic-io/spectral";
import { createToastClient } from "../../client";
import { deleteShiftExamplePayload as examplePayload } from "../../examplePayloads";
import { deleteShiftInputs as inputs } from "../../inputs/shift";

export const deleteShift = action({
  display: {
    label: "Delete Shift",
    description:
      "Marks an existing schedule shift record for a restaurant employee as deleted.",
  },
  perform: async (context, { connection, restaurantExternalId, shiftId }) => {
    const client = await createToastClient(
      connection,
      context.debug.enabled,
      restaurantExternalId,
    );

    const { data } = await client.delete(`/labor/v1/shifts/${shiftId}`);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
