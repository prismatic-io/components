import { action, outputSchema } from "@prismatic-io/spectral";
import { validateConnectionOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { validateConnectionInputs } from "../../inputs";
import { validateConnectionExamplePayload } from "../../examplePayloads";

export const validateConnection = action({
  display: {
    label: "Validate Connection",
    description:
      "Validate the provided connection and return whether it is valid.",
  },
  inputs: validateConnectionInputs,
  performSafety: "safe",
  perform: async (_context, { version, connection }) => {
    try {
      const salesforceClient = await createSalesforceClient(
        connection,
        version,
      );

      await salesforceClient.identity();

      return {
        data: true,
      };
    } catch {
      return { data: false };
    }
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: validateConnectionOutputSchema,
  }),
  examplePayload: validateConnectionExamplePayload,
});
