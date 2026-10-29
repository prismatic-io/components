import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listCompanyListsExamplePayload } from "../../examplePayloads";
import { listCompanyListsInputs } from "../../inputs";

export const listCompanyLists = action({
  display: {
    label: "List Company Lists",
    description: "Retrieves all named lists in the company.",
  },
  perform: async (context, { connection, includeArchived }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.get("/company/named-lists", {
      params: {
        includeArchived,
      },
    });
    return {
      data,
    };
  },
  inputs: listCompanyListsInputs,
  examplePayload: listCompanyListsExamplePayload,
});
