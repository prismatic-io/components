import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTransitionsExamplePayload } from "../../examplePayloads";
import { listTransitionsInputs } from "../../inputs";
import type { Transition } from "../../types";
import { getPaginatedData } from "../../util";

export const listTransitions = action({
  display: {
    label: "List Transitions",
    description: "Returns available status transitions for a service request.",
  },
  inputs: listTransitionsInputs,
  perform: async (
    context,
    { connection, issueIdOrKey, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData<Transition>(
      client,
      `/request/${issueIdOrKey}/transition`,
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listTransitionsExamplePayload,
});
