import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { geteTimeCardsResponse } from "../../examplePayloads";
import { $expand, $filter, $skip, $top, aoid, connection } from "../../inputs";

export const getTimeCards = action({
  display: {
    label: "Get Time Cards",
    description:
      "Get a worker's team's timecards. That is all the time cards for the worker's team members. The worker is identified by workers/[aoid]",
  },
  inputs: {
    aoid,
    $skip,
    $top,
    $filter,
    $expand,
    connection,
  },
  perform: async (
    context,
    { connection, aoid, $filter, $skip, $top, $expand },
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
          $skip,
          $top,
        },
      },
    );
    return { data };
  },
  examplePayload: {
    data: geteTimeCardsResponse,
  },
});
