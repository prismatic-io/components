import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getAllListsExamplePayload } from "../../examplePayloads";
import { fetchPaginatedData } from "../../helpers";
import { getAllListsInputs } from "../../inputs";
import { getAllListsOutputSchema } from "../../outputSchemas";
export const getAllLists = action({
  display: {
    label: "Get All Lists",
    description: "Retrieves all contact lists with pagination support.",
  },
  inputs: getAllListsInputs,
  perform: async (
    _context,
    { sendGridConnection, page_size, page_token, fetchAll },
  ) => {
    const client = createAuthorizedClient(sendGridConnection);
    const data = await fetchPaginatedData(
      client,
      `/${API_VERSION}/marketing/lists`,
      fetchAll,
      { page_size, page_token },
    );
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAllListsOutputSchema,
  }),
  examplePayload: getAllListsExamplePayload,
});
