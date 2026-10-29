import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { getCompanyListExamplePayload } from "../../examplePayloads";
import { getCompanyListInputs } from "../../inputs";

export const getCompanyList = action({
  display: {
    label: "Get Company List",
    description: "Retrieves a specific named list from the company.",
  },
  perform: async (context, { connection, listName, includeArchived }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.get(`/company/named-lists/${listName}`, {
      params: {
        includeArchived,
      },
    });
    return {
      data,
    };
  },
  inputs: getCompanyListInputs,
  examplePayload: getCompanyListExamplePayload,
});
