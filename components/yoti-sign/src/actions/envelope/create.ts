import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClient } from "../../client";
import { createEnvelopeResponse } from "../../examplePayloads";
import {
  autotagging,
  branding,
  connectionInput,
  emails,
  envelopName,
  fileList,
  fileName,
  hasEnvelopeOtps,
  notificationDestination,
  notificationsSubscriptions,
  parent_redirect_urls,
  recipients,
} from "../../inputs";
import { addNotificationsToObject, addPropertyToPayload } from "../../util";

export const createEnvelope = action({
  display: {
    label: `Create Envelope`,
    description: "Create an envelope for Yoti Sign",
  },
  inputs: {
    connection: connectionInput,
    file: fileList,
    fileName: fileName,
    envelopName,
    recipients,
    has_envelope_otps: hasEnvelopeOtps,
    emails,
    notificationDestination,
    notificationsSubscriptions,
    branding,
    parent_redirect_urls,
    autotagging,
  },
  perform: async (
    context,
    {
      connection,
      file,
      fileName,
      branding,
      emails,
      envelopName,
      has_envelope_otps,
      notificationDestination,
      notificationsSubscriptions,
      parent_redirect_urls,
      recipients,
      autotagging,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const form = new FormData();
    file.forEach((fileData, index) => {
      const { data, contentType } = fileData;
      form.append("file", data, {
        filename: fileName?.[index],
        contentType,
      });
    });

    const options = addPropertyToPayload({
      branding,
      emails,
      name: envelopName,
      has_envelope_otps,
      parent_redirect_urls,
      recipients,
      autotagging,
    });

    addNotificationsToObject(
      options,
      notificationDestination,
      notificationsSubscriptions,
    );

    options.sender = {
      event_notifications: ["envelope_completion"],
    };
    form.append("options", JSON.stringify(options));

    const { data } = await client.post("/envelopes", form.getBuffer(), {
      headers: form.getHeaders(),
    });

    return { data };
  },
  examplePayload: {
    data: createEnvelopeResponse,
  },
});
