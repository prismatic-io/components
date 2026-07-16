import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { sendMessageExamplePayload } from "../../examplePayloads";
import { sendMessageInputs } from "../../inputs";
import { getIdObject } from "../../util";
export const sendMessage = action({
  display: {
    label: "Send Message",
    description: "Sends a message.",
  },
  perform: async (
    context,
    {
      connection,
      senderOverrideId,
      commId,
      messageDetails,
      messageTemplateId,
      notificationTypeId,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const body = {
      senderOverride: getIdObject(senderOverrideId),
      commID: getIdObject(commId),
      emailDetail: messageDetails.emailDetail,
      recipients: messageDetails.contacts,
      messageTemplate: getIdObject(messageTemplateId),
      notificationType: getIdObject(notificationTypeId),
      pushDetail: messageDetails.pushDetail,
    };
    const { data } = await client.post(`${SERVICES.connect}/sendMessage`, body);
    return {
      data,
    };
  },
  inputs: sendMessageInputs,
  examplePayload: sendMessageExamplePayload,
});
