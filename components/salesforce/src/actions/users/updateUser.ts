import { action, outputSchema } from "@prismatic-io/spectral";
import { updateRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { updateUserInputs } from "../../inputs";
import { genericCreateUpdateExamplePayload } from "../../examplePayloads";
import { executeSFAction } from "../../util";
export const updateUser = action({
  display: {
    label: "Update User",
    description: "Update a Salesforce user.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { version, dynamicValues, fieldValues, userName, connection },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const userResponse = await salesforceClient
      .sobject("User")
      .findOne({ UserName: userName });
    if (!userResponse?.Id) {
      throw new Error(`Unable to find User matching "${userName}"`);
    }
    const recordId = userResponse.Id;
    const command = salesforceClient.sobject("User").update({
      Id: recordId,
      ...dynamicValues,
      ...fieldValues,
    });
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => genericCreateUpdateExamplePayload,
  inputs: updateUserInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateRecordOutputSchema,
  }),
  examplePayload: genericCreateUpdateExamplePayload,
});
