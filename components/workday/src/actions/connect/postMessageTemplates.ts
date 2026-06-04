import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postMessageTemplatesExamplePayload } from "../../examplePayloads";
import { postMessageTemplatesInputs } from "../../inputs";
import { getIdObject } from "../../util";

export const postMessageTemplates = action({
  display: {
    label: "Create Message Template",
    description: "Creates a new message template.",
  },
  perform: async (
    context,
    {
      connection,
      createdById,
      emailDetail,
      pushDetail,
      messageTemplateName,
      referenceId,
      templateInactive,
      temaplateDescriptor,
      templateId,
      additionalFields,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      createdBy: getIdObject(createdById),
      emailDetail,
      pushDetail,
      name: messageTemplateName,
      referenceID: referenceId,
      inactive: templateInactive,
      descriptor: temaplateDescriptor,
      id: templateId,
      ...(additionalFields || {}),
    };
    const { data } = await client.post(
      `${SERVICES.connect}/messageTemplates`,
      body,
    );
    return {
      data,
    };
  },
  inputs: postMessageTemplatesInputs,
  examplePayload: postMessageTemplatesExamplePayload,
});
