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
      contactId,
      parentOrganizationId,
      ownerId,
      customerStatus,
      prospectStatus,
      title,
      description,
      industry,
      website,
      email,
      phone,
      mobile,
      fax,
      twitter,
      facebook,
      linkedin,
      skype,
      address,
      billingAddress,
      shippingAddress,
      tags,
      customFields,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const customFieldsObject: any = {};

      customFields.forEach((customField) => {
        customFieldsObject[customField.key] = customField.value;
      });
      const body = {
        ...(name.length && { name }),
        ...(firstName.length && { first_name: firstName }),
        ...(lastName.length && { last_name: lastName }),
        ...(contactId.length && { contact_id: util.types.toNumber(contactId) }),
        ...(parentOrganizationId.length && {
          parent_organization_id: util.types.toNumber(parentOrganizationId),
        }),
        ...(ownerId.length && { owner_id: util.types.toNumber(ownerId) }),
        ...(customerStatus.length && { customer_status: customerStatus }),
        ...(prospectStatus.length && { prospect_status: prospectStatus }),
        ...(title.length && { title }),
        ...(description.length && { description }),
        ...(industry.length && { industry }),
        ...(website.length && { website }),
        ...(email.length && { email }),
        ...(phone.length && { phone }),
        ...(mobile.length && { mobile }),
        ...(fax.length && { fax }),
        ...(twitter.length && { twitter }),
        ...(facebook.length && { facebook }),
        ...(linkedin.length && { linkedin }),
        ...(skype.length && { skype }),
        ...(address.length && { address: JSON.parse(address) }),
        ...(billingAddress.length && {
          billing_address: JSON.parse(billingAddress),
        }),
        ...(shippingAddress.length && {
          shipping_address: JSON.parse(shippingAddress),
        }),
        ...(tags.length && { tags }),
        ...(customFields.length && { custom_fields: customFieldsObject }),
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
