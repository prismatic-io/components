import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createItemNumberReservationExamplePayload } from "../../examplePayloads";
import { createItemNumberReservationInputs } from "../../inputs";
import { numberReservationSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createItemNumberReservation = action({
  display: {
    label: "Create Item Number Reservation",
    description: "Create a new item number reservation in Arena PLM system.",
  },
  inputs: createItemNumberReservationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: numberReservationSchema,
  }),
  examplePayload: createItemNumberReservationExamplePayload,
  perform: async (context, { connection, reservationData }) => {
    try {
      context.logger.info("Creating item number reservation", {
        reservationDataKeys: Object.keys(reservationData),
      });
      const client = await createArenaClient(context, connection);
      const { data } = await client.post(
        "/settings/items/numberreservations",
        reservationData,
      );
      context.logger.info("Created item number reservation", {
        reservationGuid: data?.guid,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create Item Number Reservation");
    }
  },
});
