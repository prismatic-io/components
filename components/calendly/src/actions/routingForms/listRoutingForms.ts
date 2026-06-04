import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, organization, sort } from "../../inputs";
import { listRoutingFormsExamplePayload } from "../../examplePayloads";
import { getRoutingForms } from "../../util";

export const listRoutingForms = action({
  display: {
    label: "List Routing Forms",
    description: "Get a list of Routing Forms for a specified Organization.",
  },
  perform: async (context, { connection, organization, sort }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await getRoutingForms(client, organization, sort);

    return { data };
  },
  inputs: {
    connection,
    organization: {
      ...organization,
      required: true,
      dataSource: "organizations",
      comments:
        "View organization routing forms associated with the organization's URI.",
    },
    sort: {
      ...sort,
      comments:
        "Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: created_at. Sort direction is specified as: asc, desc.",
      example: "created_at:desc",
    },
  },
  examplePayload: listRoutingFormsExamplePayload,
});
