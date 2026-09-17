import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getAllFieldDefinitionsExamplePayload } from "../../examplePayloads";
import { getAllFieldDefinitionsInputs } from "../../inputs";
import { getAllFieldDefinitionsOutputSchema } from "../../outputSchemas";
import { fetchPaginatedData } from "../../util";
export const getAllFieldDefinitions = action({
  display: {
    label: "Get All Field Definitions",
    description:
      "Retrieves all custom field definitions with pagination support.",
  },
  inputs: getAllFieldDefinitionsInputs,
  performSafety: "notAllowed",
  perform: async (_context, { sendGridConnection, pagination, fetchAll }) => {
    const client = createAuthorizedClient(sendGridConnection);
    const data = await fetchPaginatedData(
      client,
      `/${API_VERSION}/marketing/field_definitions`,
      fetchAll,
      { page_size: pagination.page_size, page_token: pagination.page_token },
    );
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAllFieldDefinitionsOutputSchema,
  }),
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getAllFieldDefinitionsExamplePayload.data,
  }),
  examplePayload: getAllFieldDefinitionsExamplePayload,
});
