import { action, outputSchema } from "@prismatic-io/spectral";
import { searchExamplePayload } from "../../examplePayloads";
import { searchInputs } from "../../inputs";
import { searchResponseSchema } from "../../outputSchemas";
import { searchPerform } from "../../util";
export const search = action({
  display: {
    label: "Search Records",
    description:
      "Filter, sort, and search objects, records, and engagements across the CRM.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      timeout,
      hubspotConnection,
      searchEndpoint,
      searchProperties,
      objectType,
      fetchAll,
      searchLimit,
    },
  ) => {
    return searchPerform(context, {
      timeout,
      hubspotConnection,
      searchEndpoint,
      searchProperties,
      objectType,
      fetchAll,
      searchLimit,
    });
  },
  inputs: searchInputs,
  examplePerform: async () => ({
    data: searchExamplePayload.data,
  }),
  examplePayload: searchExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: searchResponseSchema,
  }),
});
