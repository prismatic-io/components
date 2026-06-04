import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, form, organization, sort } from "../../inputs";
import { listRoutingFormSubmissionsExamplePayload } from "../../examplePayloads";
import { paginator } from "../../util";

export const listRoutingFormSubmissions = action({
  display: {
    label: "List Routing Form Submissions",
    description:
      "Get a list of Routing Form Submissions for a specified Routing Form.",
  },
  perform: async (context, { connection, form, sort }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await paginator(client, "/routing_form_submissions", {
      form,
      sort: sort || undefined,
    });

    return { data };
  },
  inputs: {
    connection,
    organization: { ...organization, dataSource: "organizations" },
    form,
    sort: {
      ...sort,
      model: [
        {
          label: "",
          value: "",
        },
        {
          label: "Created At (Ascending)",
          value: "created_at:asc",
        },
        {
          label: "Created At (Descending)",
          value: "created_at:desc",
        },
      ],
      comments:
        "Order results by the specified field and direction. Supported fields are: created_at. Sort direction is specified as: asc, desc.",
    },
  },
  examplePayload: listRoutingFormSubmissionsExamplePayload,
});
