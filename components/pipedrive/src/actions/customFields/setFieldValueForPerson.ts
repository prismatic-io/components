import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { WebhookVersion } from "../../constants";

export const setFieldValueForPerson = action({
  display: {
    label: "Set Person Field Value",
    description: "Sets the value of a specific field for a person.",
  },
  perform: async (context, { connection, personId, customFieldKey, value }) => {
    if (!customFieldKey) {
      throw new Error("Invalid or missing customFieldKey");
    }
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const payload = {
      [customFieldKey]: value,
    };
    const { data } = await client.patch(`/persons/${personId}`, payload);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    personId: input({
      label: "Person ID",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The ID of the person to set the field value for",
    }),
    customFieldKey: input({
      label: "Field Key",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The key of the field to set",
    }),
    value: input({
      label: "Value",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The new value for the field",
    }),
  },
});
