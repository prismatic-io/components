import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import {
  connection,
  jsonInput,
  envelopeId,
  advancedUpdate,
  resendEnvelope,
} from "../inputs";
import { envelopeJson } from "../json/envelopeJson";
import { updateEnvelopePayload } from "../examplePayloads";

export const updateEnvelope = action({
  display: {
    label: "Update Envelope",
    description: "This method enables you to make changes to an envelope.",
  },
  perform: async (
    context,
    { connection, jsonInput, envelopeId, advancedUpdate, resendEnvelope },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.put(`/envelopes/${envelopeId}`, jsonInput, {
      params: {
        advanced_update: advancedUpdate,
        resend_envelope: resendEnvelope,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    jsonInput: {
      ...jsonInput,
      required: true,
      default: JSON.stringify(envelopeJson, null, 2),
      comments:
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/envelopes/envelopes/update/",
    },
    envelopeId,
    advancedUpdate: {
      ...advancedUpdate,
      comments:
        "When true, allows the caller to update recipients, tabs, custom fields, notification, email settings and other envelope attributes.",
    },
    resendEnvelope,
  },
  examplePayload: updateEnvelopePayload,
});
