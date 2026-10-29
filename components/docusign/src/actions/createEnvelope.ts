import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import {
  connection,
  jsonInput,
  changeRoutingOrder,
  mergeRolesOnDraft,
} from "../inputs";
import { envelopeJson } from "../json/envelopeJson";
import { createEnvelopePayload } from "../examplePayloads";

export const createEnvelope = action({
  display: {
    label: "Create Envelope",
    description: "Creates and sends an envelope or creates a draft envelope.",
  },
  perform: async (
    context,
    { connection, jsonInput, changeRoutingOrder, mergeRolesOnDraft },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.post(`/envelopes`, jsonInput, {
      params: {
        change_routing_order: changeRoutingOrder,
        merge_roles_on_draft: mergeRolesOnDraft,
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
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/envelopes/envelopes/create/",
    },
    changeRoutingOrder,
    mergeRolesOnDraft,
  },
  examplePayload: createEnvelopePayload,
});
