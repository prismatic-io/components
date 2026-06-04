import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSlaExamplePayload } from "../../examplePayloads";
import { listSlaInputs } from "../../inputs";
import type { SlaInformation } from "../../types";
import { getPaginatedData } from "../../util";

export const listSla = action({
  display: {
    label: "List SLA Information",
    description: "Returns SLA information for a service request.",
  },
  inputs: listSlaInputs,
  perform: async (
    context,
    { connection, issueIdOrKey, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData<SlaInformation>(
      client,
      `/request/${issueIdOrKey}/sla`,
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listSlaExamplePayload,
});
