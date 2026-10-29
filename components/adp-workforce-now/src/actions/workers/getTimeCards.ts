import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTimeCardsExamplePayload } from "../../examplePayloads";
import { getTimeCardsInputs } from "../../inputs";
import { getTimeCardsOutputSchema } from "../../outputSchemas";

export const getTimeCards = action({
  display: {
    label: "Get Time Cards",
    description:
      "Get a worker's team's timecards. That is all the time cards for the worker's team members. The worker is identified by workers/[aoid]",
  },
  inputs: getTimeCardsInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, aoid, $filter, pagination, $expand },
  ) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/time/v2/workers/${aoid}/team-time-cards`,
      {
        params: {
          $filter,
          $expand,
          $skip: pagination.$skip,
          $top: pagination.$top,
        },
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    getTimeCardsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTimeCardsOutputSchema,
  }),
  examplePayload: getTimeCardsExamplePayload,
});
