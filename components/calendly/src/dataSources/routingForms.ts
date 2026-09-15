import { dataSource } from "@prismatic-io/spectral";
import { routingFormsInputs } from "../inputs";
import { getCalendlyClient } from "../client";
import { getRoutingForms, extractUuidFromUri } from "../util";
export const routingForms = dataSource({
  display: {
    label: "Select Routing Form",
    description: "Select a Routing Form from a specified Organization.",
  },
  inputs: routingFormsInputs,
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
