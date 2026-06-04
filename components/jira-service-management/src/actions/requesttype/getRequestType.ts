import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getRequestTypeExamplePayload } from "../../examplePayloads";
import { getRequestTypeInputs } from "../../inputs";

export const getRequestType = action({
  display: {
    label: "Get Request Type",
    description: "Returns a single request type for a service desk.",
  },
  inputs: getRequestTypeInputs,
  perform: async (context, { connection, serviceDeskId, requestTypeId }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/servicedesk/${serviceDeskId}/requesttype/${requestTypeId}`,
    );
    return { data };
  },
  examplePayload: getRequestTypeExamplePayload,
});
