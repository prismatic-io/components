import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { updateContactExamplePayload } from "../../examplePayloads";
import { updateContactInputs } from "../../inputs";

export const updateContact = action({
  display: {
    label: "Update Contact",
    description:
      "Updates contact information. If the specified contact does not exist, the request will return an error.",
  },
  perform: async (
    context,
    {
      connection,
      id,
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
        ...(name.length && { name }),
        ...(firstName.length && { first_name: firstName }),
        ...(lastName.length && { last_name: lastName }),
        ...(additionalFields.contactId.length && {
          contact_id: util.types.toNumber(additionalFields.contactId),
        }),
        ...(additionalFields.parentOrganizationId.length && {
          parent_organization_id: util.types.toNumber(
            additionalFields.parentOrganizationId,
          ),
        }),
        ...(additionalFields.ownerId.length && {
          owner_id: util.types.toNumber(additionalFields.ownerId),
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
      const { data } = await client.put(
        `/contacts/${id}`,
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
  inputs: updateContactInputs,
  examplePayload: updateContactExamplePayload,
});
export default { updateContact };
