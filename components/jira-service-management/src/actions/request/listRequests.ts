import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listRequestsExamplePayload } from "../../examplePayloads";
import { listRequestsInputs } from "../../inputs";
import type { ServiceRequest } from "../../types";
import { getPaginatedData } from "../../util";

export const listRequests = action({
  display: {
    label: "List Requests",
    description: "Returns service requests for the given service desk.",
  },
  inputs: listRequestsInputs,
  perform: async (
    context,
    { connection, serviceDeskId, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData<ServiceRequest>(
      client,
      "/request",
      fetchAll,
      { params: { start, limit, serviceDeskId } },
    );
    return { data };
  },
  examplePayload: listRequestsExamplePayload,
});
