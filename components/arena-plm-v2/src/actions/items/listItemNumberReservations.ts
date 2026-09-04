import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemNumberReservationsExamplePayload } from "../../examplePayloads";
import { listItemNumberReservationsInputs } from "../../inputs";
import { listItemNumberReservationsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listItemNumberReservations = action({
  display: {
    label: "List Item Number Reservations",
    description:
      "Search for item number reservations from Arena PLM system with optional filtering.",
  },
  inputs: listItemNumberReservationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemNumberReservationsOutputSchema,
  }),
  examplePayload: listItemNumberReservationsExamplePayload,
  perform: async (
    context,
    {
      connection,
      name,
      categoryGuid,
      includeItemNumbers,
      pagination,
      fetchAll,
    },
  ) => {
    try {
      context.logger.info("Getting item number reservations", {
        name,
        categoryGuid,
        includeItemNumbers,
        offset: pagination?.offset,
        limit: pagination?.limit,
      });
      const client = await createArenaClient(context, connection);
      const queryParams = {
        name,
        "category.guid": categoryGuid,
        includeitemnumbers: includeItemNumbers,
        offset: pagination?.offset,
        limit: pagination?.limit,
      };
      const data = await fetchArenaList(
        client,
        "/settings/items/numberreservations",
        queryParams,
        fetchAll,
      );
      context.logger.info(
        `Retrieved ${data?.count || 0} item number reservations`,
        {
          count: data?.count,
        },
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Item Number Reservations");
    }
  },
});
