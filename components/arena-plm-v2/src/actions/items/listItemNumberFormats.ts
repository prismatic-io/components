import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemNumberFormatsExamplePayload } from "../../examplePayloads";
import { listItemNumberFormatsInputs } from "../../inputs";
import { listItemNumberFormatsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listItemNumberFormats = action({
  display: {
    label: "List Item Number Formats",
    description:
      "List all item number formats from Arena PLM system with optional filtering.",
  },
  inputs: listItemNumberFormatsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemNumberFormatsOutputSchema,
  }),
  examplePayload: listItemNumberFormatsExamplePayload,
  perform: async (
    context,
    { connection, name, active, pagination, fetchAll },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        name: name?.trim() || undefined,
        active,
        limit: pagination?.limit,
        offset: pagination?.offset,
      };
      context.logger.info("Fetching item number formats from Arena", {
        queryParamNames: Object.keys(queryParams),
      });
      const data = await fetchArenaList(
        client,
        "/settings/items/numberformats",
        queryParams,
        fetchAll,
      );
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} item number formats`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Item Number Formats");
    }
  },
});
