import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listRequestTypesExamplePayload } from "../../examplePayloads";
import { listRequestTypesInputs } from "../../inputs";
import type { RequestType } from "../../types";
import { getPaginatedData } from "../../util";

export const listRequestTypes = action({
  display: {
    label: "List Request Types",
    description: "Returns all request types for a service desk.",
  },
  inputs: listRequestTypesInputs,
  perform: async (
    context,
    { connection, serviceDeskId, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData<RequestType>(
      client,
      `/servicedesk/${serviceDeskId}/requesttype`,
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listRequestTypesExamplePayload,
});
