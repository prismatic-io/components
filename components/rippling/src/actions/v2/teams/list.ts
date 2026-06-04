import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { listTeamsV2ExamplePayload } from "../../../examplePayloads";
import { listTeamsInputs } from "../../../inputs";
import { paginateV2Results } from "../../../utils/pagination";

export const listTeams = action({
  display: {
    label: "List Teams (V2)",
    description: "Retrieve a list of teams.",
  },
  inputs: listTeamsInputs,
  examplePayload: listTeamsV2ExamplePayload,
  perform: async (
    context,
    { connection, expand, orderBy, cursor, fetchAll },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    return paginateV2Results(client, "/teams", fetchAll, {
      expand,
      order_by: orderBy,
      cursor,
    });
  },
});
