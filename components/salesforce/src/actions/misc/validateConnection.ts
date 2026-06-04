import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { validateConnectionInputs } from "../../inputs";

export const validateConnection = action({
  display: {
    label: "Validate Connection",
    description: "Validate the provided connection and return whether it is valid.",
  },
  inputs: validateConnectionInputs,
  perform: async (_context, { version, connection }) => {
    try {
      
      const salesforceClient = await createSalesforceClient(connection, version);

      
      await salesforceClient.identity();

      
      return {
        data: true,
      };
    } catch {
      
      return { data: false };
    }
  },
});
