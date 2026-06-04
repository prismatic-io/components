import { dataSource } from "@prismatic-io/spectral";
import { connection, organization, sort, returnUuidOnly } from "../inputs";
import { getCalendlyClient } from "../client";
import { getRoutingForms, extractUuidFromUri } from "../util";

export const routingForms = dataSource({
  display: {
    label: "Select Routing Form",
    description: "Select a Routing Form from a specified Organization.",
  },
  inputs: {
    connection,
    organization: {
      ...organization,
      required: true,
      comments:
        "View organization routing forms associated with the organization's URI.",
    },
    sort: {
      ...sort,
      comments:
        "Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: created_at. Sort direction is specified as: asc, desc.",
      example: "created_at:desc",
    },
    returnUuidOnly,
  },
  perform: async (
    context,
    { connection, organization, sort, returnUuidOnly },
  ) => {
    const client = getCalendlyClient(connection, false);

    const data = await getRoutingForms(client, organization, sort);
    return {
      result: data.map((form: { uri: string; name: string }) => ({
        key: returnUuidOnly ? extractUuidFromUri(form.uri) : form.uri,
        label: form.name,
      })),
    };
  },
  dataSourceType: "picklist",
});
