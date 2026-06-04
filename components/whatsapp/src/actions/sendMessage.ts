import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { sendMessageInputs } from "../inputs/sendMessageInputs";
import { sendMessageExamplePayload } from "../examplePayloads";

export const sendMessage = action({
  display: {
    label: "Send Message",
    description: "Send a message to a user.",
  },
  perform: async (
    context,
    {
      connection,
      phoneNumberId,
      to,
      type,
      audio,
      bizOpaqueCallbackData,
      contacts,
      contextInput,
      document,

      image,
      reaction,
      interactive,
      location,
      previewUrl,

      status,
      sticker,
      template,
      text,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    const payload = {
      audio,
      document,
      bizOpaqueCallbackData,
      messaging_product: "whatsapp",
      context: contextInput,
      to,
      type,
      text,
      template,
      interactive,
      contacts,
      location,
      image,
      reaction,
      preview_url: previewUrl,
      recipient_type: "individual",
      status,
      sticker,
    };
    const { data } = await client.post(`/${phoneNumberId}/messages`, payload);
    return {
      data,
    };
  },
  inputs: sendMessageInputs,
  examplePayload: sendMessageExamplePayload,
});
