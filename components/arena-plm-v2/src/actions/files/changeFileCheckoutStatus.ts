import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createArenaClient } from "../../client";
import { changeFileCheckoutStatusExamplePayload } from "../../examplePayloads";
import { changeFileCheckoutStatusInputs } from "../../inputs";
import { changeFileCheckoutStatusOutputSchema } from "../../outputSchemas";
import { appendFilePart, appendFormFields, handleArenaError } from "../../util";
export const changeFileCheckoutStatus = action({
  display: {
    label: "Change File Checkout Status",
    description:
      "Check a file edition in or out by changing its checkout status.",
  },
  inputs: changeFileCheckoutStatusInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeFileCheckoutStatusOutputSchema,
  }),
  examplePayload: changeFileCheckoutStatusExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const formData = new FormData();
      appendFilePart(formData, "content", params.fileContent, "checkin_file");
      appendFormFields(formData, params.fileCheckoutData);
      const { data } = await client.post(
        "/files/checkoutstatuschanges",
        formData,
        {
          headers: { ...formData.getHeaders() },
        },
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Change File Checkout Status");
    }
  },
});
