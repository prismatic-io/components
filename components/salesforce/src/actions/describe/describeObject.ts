import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { describeObjectInputs } from "../../inputs";
import { executeSFAction } from "../../util";

export const describeObject = action({
  display: {
    label: "Describe Object",
    description: "Describe attributes of a Salesforce record type.",
  },
  inputs: describeObjectInputs,
  perform: async (context, { version, recordType, connection }) => {
    const client = await createSalesforceClient(connection, version);

    const command = client.describeSObject(recordType);
    const response = await executeSFAction(context, command);

    return { data: response };
  },
});
