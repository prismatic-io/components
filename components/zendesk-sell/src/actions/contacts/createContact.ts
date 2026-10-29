import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { createContactExamplePayload } from "../../examplePayloads";
import { createContactInputs } from "../../inputs";

export const createContact = action({
  display: {
    label: "Create Contact",
    description:
      "Creates a new contact. A contact may represent a single individual or an organization.",
  },
  perform: async (
    context,
    {
      connection,
      isOrganization,
      name,
      firstName,
      lastName,
      contactInfo,
      addresses,
      customFields,
      tags,
      additionalFields,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const customFieldsObject: Record<string, unknown> = {};
      customFields.forEach((pair) => {
        customFieldsObject[pair.key] = pair.value;
      });
      const body = {
        name,
        ...(firstName.length && { first_name: firstName }),
        last_name: lastName,
        ...(isOrganization.length && {
          is_organization: isOrganization === "true",
        }),
        ...(additionalFields.ownerId.length && {
          owner_id: util.types.toNumber(additionalFields.ownerId),
        }),
        ...(additionalFields.contactId.length && {
          contact_id: util.types.toNumber(additionalFields.contactId),
        }),
        ...(additionalFields.parentOrganizationId.length && {
          parent_organization_id: util.types.toNumber(
            additionalFields.parentOrganizationId,
          ),
        }),
        ...(additionalFields.customerStatus.length && {
          customer_status: additionalFields.customerStatus,
        }),
        ...(additionalFields.prospectStatus.length && {
          prospect_status: additionalFields.prospectStatus,
        }),
        ...(additionalFields.title.length && { title: additionalFields.title }),
        ...(additionalFields.description.length && {
          description: additionalFields.description,
        }),
        ...(additionalFields.industry.length && {
          industry: additionalFields.industry,
        }),
        ...(contactInfo.website.length && {
          website: contactInfo.website,
        }),
        ...(contactInfo.email.length && { email: contactInfo.email }),
        ...(contactInfo.phone.length && { phone: contactInfo.phone }),
        ...(contactInfo.mobile.length && { mobile: contactInfo.mobile }),
        ...(contactInfo.fax.length && { fax: contactInfo.fax }),
        ...(contactInfo.twitter.length && { twitter: contactInfo.twitter }),
        ...(contactInfo.facebook.length && {
          facebook: contactInfo.facebook,
        }),
        ...(contactInfo.linkedin.length && {
          linkedin: contactInfo.linkedin,
        }),
        ...(contactInfo.skype.length && { skype: contactInfo.skype }),
        ...(addresses.address.length && {
          address: JSON.parse(addresses.address),
        }),
        ...(addresses.billingAddress.length && {
          billing_address: JSON.parse(addresses.billingAddress),
        }),
        ...(addresses.shippingAddress.length && {
          shipping_address: JSON.parse(addresses.shippingAddress),
        }),
        ...(tags.length && { tags: tags }),
        ...(customFields.length && {
          custom_fields: customFieldsObject,
        }),
      };

      const { data } = await client.post(
        "/contacts",
        { data: body },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      );

      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: createContactInputs,
  examplePayload: createContactExamplePayload,
});
export default { createContact };
