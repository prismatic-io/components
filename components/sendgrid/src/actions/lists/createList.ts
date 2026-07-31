import { action, outputSchema } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { API_VERSION } from "../../constants";
import { createListExamplePayload } from "../../examplePayloads";
import { createListInputs } from "../../inputs";
import { createListOutputSchema } from "../../outputSchemas";
export const createList = action({
  display: {
    label: "Create List",
    description: "Creates a new contact list.",
  },
  inputs: createListInputs,
  perform: async (_context, { sendGridConnection, name }) => {
    const client = createAuthorizedClient(sendGridConnection);
    const [_response, body] = await client.request({
      method: "POST",
      url: `/${API_VERSION}/marketing/lists`,
      body: { name },
    });
    return { data: body };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createListOutputSchema,
  }),
  examplePayload: createListExamplePayload,
});
