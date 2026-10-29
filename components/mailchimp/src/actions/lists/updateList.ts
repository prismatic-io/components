import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  listId,
  company,
  address1,
  address2,
  city,
  country,
  phone,
  name,
  state,
  fromEmail,
  fromName,
  subject,
  language,
  marketingPermissions,
  emailTypeOption,
  postalCode,
  permissionReminder,
  connectionInput,
} from "../../inputs";

export const updateList = action({
  display: {
    label: "Update List",
    description: "Update the information or metadata of a list",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.patch(`/lists/${params.listId}`, {
      name: params.name,
      contact: {
        company: params.company,
        address1: params.address1,
        ...(params.address2 && { address2: params.address2 }),
        city: params.city,
        country: params.country,
        ...(params.phone && { phone: params.phone }),
        ...(params.state && { state: params.state }),
        ...(params.postalCode && { zip: params.postalCode }),
      },
      permission_reminder: params.permissionReminder,
      campaign_defaults: {
        from_name: params.fromName,
        from_email: params.fromEmail,
        subject: params.subject,
        language: params.language,
      },
      email_type_option: params.emailTypeOption,
      marketing_permissions: params.marketingPermissions,
    });
    return { data };
  },
  inputs: {
    listId,
    company: { ...company, required: false },
    address1: { ...address1, required: true },
    address2,
    city: { ...city, required: true },
    state,
    postalCode,
    phone,
    country: { ...country, required: true },
    name,
    fromEmail,
    fromName,
    subject,
    language,
    marketingPermissions: { ...marketingPermissions, required: false },
    emailTypeOption,
    permissionReminder,
    connection: connectionInput,
  },
});

export default updateList;
