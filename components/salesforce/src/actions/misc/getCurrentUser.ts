import { action, outputSchema } from "@prismatic-io/spectral";
import { getCurrentUserOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { getCurrentUserInputs } from "../../inputs";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Retrieve information about the currently authenticated user.",
  },
  inputs: getCurrentUserInputs,
  performSafety: "safe",
  perform: async (context, { version, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.identity();
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCurrentUserOutputSchema,
  }),
  examplePayload: getCurrentUserExamplePayload as unknown,
});
