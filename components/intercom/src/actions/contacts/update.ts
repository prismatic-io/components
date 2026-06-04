import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CREATE_CONTACT_EXAMPLE_PAYLOAD } from "../../examplePayloads/contacts";
import { connectionInput, externalIdInput, idInput } from "../../inputs";
import {
  avatarInput,
  emailInput,
  lastSeenAtInput,
  nameInput,
  phoneInput,
  roleInput,
  signedUpAtInput,
  unsubscribedFromEmailsInput,
} from "../../inputs/contacts";

export const updateContact = action({
  display: {
    label: "Update Contact",
    description: "Update an existing Contact",
  },
  inputs: {
    connection: connectionInput,
    id: {
      ...idInput,
      required: true,
      label: "Contact ID",
      dataSource: "selectContact",
    },
    role: roleInput,
    external_id: externalIdInput,
    email: emailInput,
    phone: phoneInput,
    name: nameInput,
    avatar: avatarInput,
    signed_up_at: signedUpAtInput,
    last_seen_at: lastSeenAtInput,
    unsubscribed_from_emails: unsubscribedFromEmailsInput,
  },
  perform: async (context, { connection, id, ...payload }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/contacts/${id}`, payload);
    return { data };
  },
  examplePayload: { data: CREATE_CONTACT_EXAMPLE_PAYLOAD },
});
