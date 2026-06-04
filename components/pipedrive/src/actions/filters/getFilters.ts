import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { cleanString } from "../../util";

export const getFilters = action({
  display: {
    label: "Get Filters",
    description: "Gets all filters.",
  },
  perform: async (context, { connection, type }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/filters", { params: { type } });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    type: input({
      label: "Type",
      type: "string",
      model: [
        { label: "Deals", value: "deals" },
        { label: "Leads", value: "leads" },
        { label: "Org", value: "org" },
        { label: "People", value: "people" },
        { label: "Products", value: "products" },
        { label: "Activity", value: "activity" },
      ],
      clean: cleanString,
      comments: "The types of filters to fetch",
    }),
  },
});
