import { action } from "@prismatic-io/spectral";
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
  perform: async (context, { version, connection }) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.identity();
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePayload: getCurrentUserExamplePayload as unknown,
});
