import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClient } from "../../client";
import { createEmbeddedEnvelopeResponse } from "../../examplePayloads";
import {
  autotagging,
  branding,
  connectionInput,
  emails,
  envelopName,
  fileList,
  fileName,
  notificationDestination,
  notificationsSubscriptions,
  parent_redirect_urls,
  recipients,
} from "../../inputs";
import { addNotificationsToObject, addPropertyToPayload } from "../../util";

export const createEmbeddedEnvelope = action({
  display: {
    label: `Create Embedded Envelope`,
    description: "Create an envelope for Yoti Sign",
  },
  inputs: {
    connection: connectionInput,
    file: fileList,
    fileName: fileName,
    recipients,
    envelopName,
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
      parent_redirect_urls,
      recipients,
      autotagging,
    });

    addNotificationsToObject(
      options,
      notificationDestination,
      notificationsSubscriptions,
    );
    form.append("options", JSON.stringify(options));

    const { data } = await client.post(
      "/embedded-envelopes",
      form.getBuffer(),
      {
        headers: form.getHeaders(),
      },
    );

    return { data };
  },
  examplePayload: {
    data: createEmbeddedEnvelopeResponse,
  },
});
