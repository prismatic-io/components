import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { upsertContactExamplePayload } from "../../examplePayloads";
import { upsertContactInputs } from "../../inputs";

export const upsertContact = action({
  display: {
    label: "Upsert Contact",
    description:
      "Creates a new contact or updates an existing one based on a filter value or set of filters. At least one filter query parameter is required.",
  },
  perform: async (
    context,
    {
      connection,
      creatorId,
      ownerId,
      isOrganization,
      contactId,
      parentOrganizationId,
      name,
      firstName,
      lastName,
      email,
      phone,
      mobile,
      customerStatus,
      prospectStatus,
      addressCity,
      addressPostalCode,
      addressCountry,
      billingAddress,
      shippingAddress,
      customFields,
      filterableCustomFields,
      inclusive,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const addressObject = {
        ...(addressCity.length && { city: addressCity }),
        ...(addressPostalCode.length && { postal_code: addressPostalCode }),
        ...(addressCountry.length && { country: addressCountry }),
      };
      const customFieldsObject: any = {};
      customFields.forEach((customField) => {
        customFieldsObject[customField.key] = customField.value;
      });

      const filterableCustomFieldsObject: any = {};
      filterableCustomFields.forEach((customField) => {
        filterableCustomFieldsObject[customField.key] = customField.value;
      });

      const body = {
        ...(creatorId.length && { creator_id: util.types.toNumber(creatorId) }),
        ...(ownerId.length && { owner_id: util.types.toNumber(ownerId) }),
        ...(isOrganization.length && {
          is_organization: isOrganization === "true",
        }),
        ...(contactId.length && { contact_id: util.types.toNumber(contactId) }),
        ...(parentOrganizationId.length && {
          parent_organization_id: util.types.toNumber(parentOrganizationId),
        }),
        ...(name.length && { name }),
        ...(firstName.length && { first_name: firstName }),
        ...(lastName.length && { last_name: lastName }),
        ...(email.length && { email }),
        ...(phone.length && { phone }),
        ...(mobile.length && { mobile }),
        ...(customerStatus.length && { customer_status: customerStatus }),
        ...(prospectStatus.length && { prospect_status: prospectStatus }),
        ...(Object.keys(addressObject).length && { address: addressObject }),
        ...(billingAddress.length && {
          billing_address: JSON.parse(billingAddress),
        }),
        ...(shippingAddress.length && {
          shipping_address: JSON.parse(shippingAddress),
        }),
        ...(Object.keys(customFieldsObject).length && {
          custom_fields: customFieldsObject,
        }),
        ...(inclusive.length && { inclusive: inclusive === "true" }),
      };
      const { data } = await client.post(
        `/contacts/upsert`,
        { data: body },
        {
          params: filterableCustomFieldsObject,
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
  inputs: upsertContactInputs,
  examplePayload: upsertContactExamplePayload,
});
export default { upsertContact };
