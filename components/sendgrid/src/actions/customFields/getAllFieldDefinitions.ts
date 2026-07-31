import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { API_VERSION } from "../../constants";
import { getAllFieldDefinitionsExamplePayload } from "../../examplePayloads";
import { fetchPaginatedData } from "../../helpers";
import { getAllFieldDefinitionsInputs } from "../../inputs";
import { getAllFieldDefinitionsOutputSchema } from "../../outputSchemas";
export const getAllFieldDefinitions = action({
  display: {
    label: "Get All Field Definitions",
    description:
      "Retrieves all custom field definitions with pagination support.",
  },
  inputs: getAllFieldDefinitionsInputs,
  perform: async (
    _context,
    { sendGridConnection, page_size, page_token, fetchAll },
  ) => {
    const client = createAuthorizedClient(sendGridConnection);
    const data = await fetchPaginatedData(
      client,
      `/${API_VERSION}/marketing/field_definitions`,
      fetchAll,
      { page_size, page_token },
    );
    return { data };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAllFieldDefinitionsOutputSchema,
  }),
  examplePayload: getAllFieldDefinitionsExamplePayload,
});
