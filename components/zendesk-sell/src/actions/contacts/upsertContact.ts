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
      isOrganization,
      name,
      firstName,
      lastName,
      contactInfo,
      addresses,
      customFields,
      filterableCustomFields,
      additionalFields,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const addressObject = {
        ...(addresses.addressCity.length && { city: addresses.addressCity }),
        ...(addresses.addressPostalCode.length && {
          postal_code: addresses.addressPostalCode,
        }),
        ...(addresses.addressCountry.length && {
          country: addresses.addressCountry,
        }),
      };
      const customFieldsObject: Record<string, unknown> = {};
      customFields.forEach((pair) => {
        customFieldsObject[pair.key] = pair.value;
      });

      const filterableCustomFieldsObject: Record<string, unknown> = {};
      filterableCustomFields.forEach((pair) => {
        filterableCustomFieldsObject[pair.key] = pair.value;
      });

      const body = {
        ...(additionalFields.creatorId.length && {
          creator_id: util.types.toNumber(additionalFields.creatorId),
        }),
        ...(additionalFields.ownerId.length && {
          owner_id: util.types.toNumber(additionalFields.ownerId),
        }),
        ...(isOrganization.length && {
          is_organization: isOrganization === "true",
        }),
        ...(additionalFields.contactId.length && {
          contact_id: util.types.toNumber(additionalFields.contactId),
        }),
        ...(additionalFields.parentOrganizationId.length && {
          parent_organization_id: util.types.toNumber(
            additionalFields.parentOrganizationId,
          ),
        }),
        ...(name.length && { name }),
        ...(firstName.length && { first_name: firstName }),
        ...(lastName.length && { last_name: lastName }),
        ...(contactInfo.email.length && { email: contactInfo.email }),
        ...(contactInfo.phone.length && { phone: contactInfo.phone }),
        ...(contactInfo.mobile.length && { mobile: contactInfo.mobile }),
        ...(additionalFields.customerStatus.length && {
          customer_status: additionalFields.customerStatus,
        }),
        ...(additionalFields.prospectStatus.length && {
          prospect_status: additionalFields.prospectStatus,
        }),
        ...(Object.keys(addressObject).length && { address: addressObject }),
        ...(addresses.billingAddress.length && {
          billing_address: JSON.parse(addresses.billingAddress),
        }),
        ...(addresses.shippingAddress.length && {
          shipping_address: JSON.parse(addresses.shippingAddress),
        }),
        ...(Object.keys(customFieldsObject).length && {
          custom_fields: customFieldsObject,
        }),
        ...(additionalFields.inclusive.length && {
          inclusive: additionalFields.inclusive === "true",
        }),
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
