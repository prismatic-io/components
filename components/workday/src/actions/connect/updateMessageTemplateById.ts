import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { updateMessageTemplateByIdExamplePayload } from "../../examplePayloads";
import { updateMessageTemplateByIdInputs } from "../../inputs";
import { compactObject, getIdObject } from "../../util";
import { updateMessageTemplateByIdOutputSchema } from "../../outputSchemas";

export const updateMessageTemplateById = action({
  display: {
    label: "Update Message Template by ID",
    description: "Updates a message template by ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      messageTemplateId,
      createdById,
      emailDetail = {},
      pushDetail = {},
      messageTemplateName,
      notificationTypeId,
      referenceId,
      templateInactive,
      templateDescriptor,
      templateId,
      extraBody,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      createdBy: getIdObject(createdById),
      emailDetail: compactObject(emailDetail),
      pushDetail: compactObject(pushDetail),
      name: messageTemplateName,
      notificationType: getIdObject(notificationTypeId),
      referenceID: referenceId,
      inactive: templateInactive,
      descriptor: templateDescriptor,
      id: templateId,
      ...(extraBody || {}),
    };
    const { data } = await client.put(
      `${SERVICES.connect}/messageTemplates/${messageTemplateId}`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => updateMessageTemplateByIdExamplePayload,
  inputs: updateMessageTemplateByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateMessageTemplateByIdOutputSchema,
  }),
  examplePayload: updateMessageTemplateByIdExamplePayload,
});
