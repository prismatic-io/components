import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { CREATE_CONTACT_EXAMPLE_PAYLOAD } from "../../examplePayloads/contacts";
import { connectionInput, externalIdInput } from "../../inputs";
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

export const createContact = action({
  display: {
    label: "Create Contact",
    description: "Create a new Contact",
  },
  inputs: {
    connection: connectionInput,
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
  perform: async (context, { connection, ...payload }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/contacts", payload);
    return { data };
  },
  examplePayload: { data: CREATE_CONTACT_EXAMPLE_PAYLOAD },
});
