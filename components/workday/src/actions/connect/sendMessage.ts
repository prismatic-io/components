import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { sendMessageExamplePayload } from "../../examplePayloads";
import { sendMessageInputs } from "../../inputs";
import { compactObject, getIdObject } from "../../util";
import { sendMessageOutputSchema } from "../../outputSchemas";
export const sendMessage = action({
  display: {
    label: "Send Message",
    description: "Sends a message.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      senderOverrideId,
      commId,
      messageDetails = {},
      messageTemplateId,
      notificationTypeId,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      senderOverride: getIdObject(senderOverrideId),
      commID: getIdObject(commId),
      emailDetail: compactObject({
        name: messageDetails.emailDetailName,
        subject: messageDetails.emailDetailSubject,
        body: messageDetails.emailDetailBody,
        replyTo: messageDetails.emailDetailReplyTo,
      }),
      recipients: messageDetails.contacts,
      messageTemplate: getIdObject(messageTemplateId),
      notificationType: getIdObject(notificationTypeId),
      pushDetail: compactObject({
        message: messageDetails.pushDetailMessage,
        redirectURL: messageDetails.pushDetailRedirectURL,
        id: messageDetails.pushDetailId,
      }),
    };
    const { data } = await client.post(`${SERVICES.connect}/sendMessage`, body);
    return {
      data,
    };
  },
  examplePerform: async () => sendMessageExamplePayload,
  inputs: sendMessageInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: sendMessageOutputSchema,
  }),
  examplePayload: sendMessageExamplePayload,
});
