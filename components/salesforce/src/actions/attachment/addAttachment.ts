import { action, outputSchema } from "@prismatic-io/spectral";
import { createRecordOutputSchema } from "../../outputSchemas";
import { createSalesforceClient } from "../../client";
import { addAttachmentInputs } from "../../inputs";
import { addAttachmentExamplePayload } from "../../examplePayloads";
export const addAttachment = action({
  display: {
    label: "Add Attachment",
    description:
      "Attach a file to a parent record object (Account, Opportunity, etc.).",
  },
  inputs: addAttachmentInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, version, recordId, fileName, file },
  ) => {
    const salesforceClient = await createSalesforceClient(connection, version);
    const payload = {
      ParentId: recordId,
      Name: fileName,
      Body: file.data.toString("base64"),
      ContentType: file.contentType,
    };
    if (context.debug.enabled) context.logger.debug("Payload: ", payload);
    const result = await salesforceClient.sobject("Attachment").create(payload);
    return { data: result };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => addAttachmentExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createRecordOutputSchema,
  }),
  examplePayload: addAttachmentExamplePayload,
});
