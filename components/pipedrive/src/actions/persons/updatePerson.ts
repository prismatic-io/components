import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, personIdInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const updatePerson = action({
  display: {
    label: "Update Person",
    description: "Updates a person.",
  },
  perform: async (
    context,
    { connection, id, name, ownerId, orgId, emails, phones, visibleTo, marketingStatus },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.patch(`/persons/${id}`, {
      name,
      owner_id: ownerId,
      org_id: orgId,
      emails: emails
        ?.split(",")
        .filter(Boolean)
        .map((email) => ({ value: email })),
      phones: phones
        ?.split(",")
        .filter(Boolean)
        .map((phone) => ({ value: phone })),
      visible_to: visibleTo,
      marketing_status: marketingStatus,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
    name: input({
      label: "Name",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The name of the person",
      example: "John Doe",
      placeholder: "Enter person name",
    }),
    ownerId: input({
      label: "Owner ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the user who will be marked as the owner of this person",
      example: "123",
      placeholder: "Enter User ID",
    }),
    orgId: input({
      label: "Org ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the organization this person will belong to",
      example: "123",
      placeholder: "Enter Organization ID",
    }),
    emails: input({
      label: "Emails",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "List of email data related to the person",
      example: "email1@example.com,email2@example.com",
      placeholder: "email1@example.com,email2@example.com",
    }),
    phones: input({
      label: "Phones",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "List of phone data related to the person",
      example: "+1234567890,+1234567890",
      placeholder: "+1234567890,+1234567890",
    }),
    visibleTo: input({
      label: "Visible To",
      type: "string",
      required: false,
      model: [
        { label: "1", value: "1" },
        { label: "3", value: "3" },
        { label: "5", value: "5" },
        { label: "7", value: "7" },
      ],
      clean: cleanString,
      comments: "The visibility of the person",
    }),
    marketingStatus: input({
      label: "Marketing Status",
      type: "string",
      required: false,
      model: [
        { label: "No Consent", value: "no_consent" },
        { label: "Unsubscribed", value: "unsubscribed" },
        { label: "Subscribed", value: "subscribed" },
        { label: "Archived", value: "archived" },
      ],
      clean: cleanString,
      comments:
        'If the person does not have a valid email address, then the marketing status is **not set** and "no_consent" is returned for the "marketing_status" value when the new person is created',
    }),
  },
});
