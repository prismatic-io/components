import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { updateMessageTemplateByIdExamplePayload } from "../../examplePayloads";
import { updateMessageTemplateByIdInputs } from "../../inputs";
import { getIdObject } from "../../util";

export const updateMessageTemplateById = action({
  display: {
    label: "Update Message Template by ID",
    description: "Updates a message template by ID.",
  },
  perform: async (
    context,
    {
      connection,
      messageTemplateId,
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
    const { data } = await client.put(
      `${SERVICES.connect}/messageTemplates/${messageTemplateId}`,
      body,
    );
    return {
      data,
    };
  },
  inputs: updateMessageTemplateByIdInputs,
  examplePayload: updateMessageTemplateByIdExamplePayload,
});
