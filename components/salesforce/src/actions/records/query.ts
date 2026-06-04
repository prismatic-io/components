import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { queryInputs } from "../../inputs";
import { executeSFAction } from "../../util";

export const query = action({
  display: {
    label: "Query",
    description: "Run an SOQL query against Salesforce.",
  },
  inputs: queryInputs,
  perform: async (context, { version, queryString, connection }) => {
    if (context.debug.enabled) {
      context.logger.debug("Payload", {
        queryString,
      });
    }
    const salesforceClient = await createSalesforceClient(connection, version);
    const command = salesforceClient.query(queryString);
    const response = await executeSFAction(context, command);
    return {
      data: response,
    };
  },
});
