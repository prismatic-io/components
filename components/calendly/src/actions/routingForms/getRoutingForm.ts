import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, organization, uuid } from "../../inputs";
import { getRoutingFormExamplePayload } from "../../examplePayloads";

export const getRoutingForm = action({
  display: {
    label: "Get Routing Form",
    description: "Get a specified Routing Form.",
  },
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get(`/routing_forms/${uuid}`);
    return { data };
  },
  inputs: {
    connection,
    organization: { ...organization, dataSource: "organizations" },
    uuid: { ...uuid, dataSource: "routingForms" },
  },
  examplePayload: getRoutingFormExamplePayload,
});
