import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { setFieldValueForPersonInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { setFieldValueForPersonExamplePayload } from "../../examplePayloads";
import { setFieldValueForPersonOutputSchema } from "../../outputSchemas";
export const setFieldValueForPerson = action({
  display: {
    label: "Set Person Field Value",
    description: "Sets the value of a specific field for a person.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, personId, customFieldKey, value }) => {
    if (!customFieldKey) {
      throw new Error("Invalid or missing customFieldKey");
    }
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const payload = {
      [customFieldKey]: value,
    };
    const { data } = await client.patch(`/persons/${personId}`, payload);
    return { data };
  },
  inputs: setFieldValueForPersonInputs,
  examplePayload: setFieldValueForPersonExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: setFieldValueForPersonOutputSchema,
  }),
});
