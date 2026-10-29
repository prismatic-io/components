import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postMessageTemplatesExamplePayload } from "../../examplePayloads";
import { postMessageTemplatesInputs } from "../../inputs";
import { compactObject, getIdObject } from "../../util";
import { postMessageTemplatesOutputSchema } from "../../outputSchemas";

export const postMessageTemplates = action({
  display: {
    label: "Create Message Template",
    description: "Creates a new message template.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
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
    const { data } = await client.post(
      `${SERVICES.connect}/messageTemplates`,
      body,
    );
    return {
      data,
    };
  },
  examplePerform: async () => postMessageTemplatesExamplePayload,
  inputs: postMessageTemplatesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postMessageTemplatesOutputSchema,
  }),
  examplePayload: postMessageTemplatesExamplePayload,
});
