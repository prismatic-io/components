import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getAllListsExamplePayload } from "../../examplePayloads";
import { getAllListsInputs } from "../../inputs";
import { getAllListsOutputSchema } from "../../outputSchemas";
import { fetchPaginatedData } from "../../util";
export const getAllLists = action({
  display: {
    label: "Get All Lists",
    description: "Retrieves all contact lists with pagination support.",
  },
  inputs: getAllListsInputs,
  performSafety: "notAllowed",
  perform: async (_context, { sendGridConnection, pagination, fetchAll }) => {
    const client = createAuthorizedClient(sendGridConnection);
    const data = await fetchPaginatedData(
      client,
      `/${API_VERSION}/marketing/lists`,
      fetchAll,
      { page_size: pagination.page_size, page_token: pagination.page_token },
    );
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAllListsOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getAllListsExamplePayload.data,
  }),
  examplePayload: getAllListsExamplePayload,
});
