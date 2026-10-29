import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { listContactsExamplePayload } from "../../examplePayloads";
import { listContactsInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listContacts = action({
  display: {
    label: "List Contacts",
    description:
      "Returns all contacts available to the user according to the parameters provided.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      isOrganization,
      name,
      firstName,
      lastName,
      contactInfo,
      address,
      otherAddresses,
      customFields,
      pagination,
      additionalFields,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const customFieldsObject: Record<string, unknown> = {};
      customFields.forEach((pair) => {
        customFieldsObject[`custom_fields[${pair.key}]`] = pair.value;
      });

      const params = {
        ...(pagination.page.length && { page: pagination.page }),
        ...(pagination.perPage.length && { per_page: pagination.perPage }),
        ...(additionalFields.sortBy.length && {
          sort_by: additionalFields.sortBy,
        }),
        ...(additionalFields.ids.length && { ids: additionalFields.ids }),
        ...(additionalFields.creatorId.length && {
          creator_id: additionalFields.creatorId,
        }),
        ...(additionalFields.ownerId.length && {
          owner_id: additionalFields.ownerId,
        }),
        ...(isOrganization.length && {
          is_organization: isOrganization,
        }),
        ...(additionalFields.contactId.length && {
          contact_id: additionalFields.contactId,
        }),
        ...(name.length && { name: name }),
        ...(firstName.length && {
          first_name: firstName,
        }),
        ...(lastName.length && {
          last_name: lastName,
        }),
        ...(contactInfo.email.length && { email: contactInfo.email }),
        ...(contactInfo.phone.length && { phone: contactInfo.phone }),
        ...(contactInfo.mobile.length && { mobile: contactInfo.mobile }),
        ...(additionalFields.customerStatus.length && {
          customer_status: additionalFields.customerStatus,
        }),
        ...(additionalFields.prospectStatus.length && {
          prospect_status: additionalFields.prospectStatus,
        }),
        ...(address.addressCity.length && {
          "address[city]": address.addressCity,
        }),
        ...(address.addressPostalCode.length && {
          "address[postal_code]": address.addressPostalCode,
        }),
        ...(address.addressCountry.length && {
          "address[country]": address.addressCountry,
        }),
        ...(address.addressState.length && {
          "address[state]": address.addressState,
        }),
        ...(otherAddresses.billingAddress.length && {
          billing_address: otherAddresses.billingAddress,
        }),
        ...(otherAddresses.shippingAddress.length && {
          shipping_address: otherAddresses.shippingAddress,
        }),
        ...customFieldsObject,
        ...(additionalFields.inclusive.length && {
          inclusive: additionalFields.inclusive,
        }),
      };

      const data: unknown = await fetchAllPages(
        client,
        "/contacts",
        fetchAll,
        params,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: listContactsInputs,
  examplePayload: listContactsExamplePayload,
});
export default { listContacts };
