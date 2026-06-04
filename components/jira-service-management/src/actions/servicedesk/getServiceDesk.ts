import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getServiceDeskExamplePayload } from "../../examplePayloads";
import { getServiceDeskInputs } from "../../inputs";

export const getServiceDesk = action({
  display: {
    label: "Get Service Desk",
    description: "Returns a single service desk by ID.",
  },
  inputs: getServiceDeskInputs,
  perform: async (context, { connection, serviceDeskId }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/servicedesk/${serviceDeskId}`);
    return { data };
  },
  examplePayload: getServiceDeskExamplePayload,
});
