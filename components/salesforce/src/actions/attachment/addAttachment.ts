import { action } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { addAttachmentInputs } from "../../inputs";
import { addAttachmentExamplePayload } from "../../examplePayloads";

export const addAttachment = action({
  display: {
    label: "Add Attachment",
    description: "Attach a file to a parent record object (Account, Opportunity, etc.).",
  },
  inputs: addAttachmentInputs,
  perform: async (context, { connection, version, recordId, fileName, file }) => {
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
  examplePayload: addAttachmentExamplePayload,
});
