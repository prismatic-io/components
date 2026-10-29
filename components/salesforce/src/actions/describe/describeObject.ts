import { action, outputSchema } from "@prismatic-io/spectral";
import { describeObjectOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { describeObjectInputs } from "../../inputs";
import { executeSFAction } from "../../util";
import { describeObjectExamplePayload } from "../../examplePayloads";

export const describeObject = action({
  display: {
    label: "Describe Object",
    description: "Describe attributes of a Salesforce record type.",
  },
  inputs: describeObjectInputs,
  performSafety: "safe",
  perform: async (context, { version, recordType, connection }) => {
    const client = await createSalesforceClient(connection, version);

    const command = client.describeSObject(recordType);
    const response = await executeSFAction(context, command);

    return { data: response };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: describeObjectOutputSchema,
  }),
  examplePayload: describeObjectExamplePayload,
});
