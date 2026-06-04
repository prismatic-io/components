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
      page,
      perPage,
      sortBy,
      ids,
      creatorId,
      ownerId,
      isOrganization,
      contactId,
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
      addressState,
      billingAddress,
      shippingAddress,
      customFields,
      inclusive,
      fetchAll,
    },
  ) => {
    try {
      const client = getZendeskClient(connection, context.debug.enabled);
      const customFieldsObject: any = {};
      customFields.forEach((customField) => {
        customFieldsObject[`custom_fields[${customField.key}]`] =
          customField.value;
      });

      const params = {
        ...(page.length && { page }),
        ...(perPage.length && { per_page: perPage }),
        ...(sortBy.length && { sort_by: sortBy }),
        ...(ids.length && { ids }),
        ...(creatorId.length && { creator_id: creatorId }),
        ...(ownerId.length && { owner_id: ownerId }),
        ...(isOrganization.length && { is_organization: isOrganization }),
        ...(contactId.length && { contact_id: contactId }),
        ...(name.length && { name }),
        ...(firstName.length && { first_name: firstName }),
        ...(lastName.length && { last_name: lastName }),
        ...(email.length && { email }),
        ...(phone.length && { phone }),
        ...(mobile.length && { mobile }),
        ...(customerStatus.length && { customer_status: customerStatus }),
        ...(prospectStatus.length && { prospect_status: prospectStatus }),
        ...(addressCity.length && { "address[city]": addressCity }),
        ...(addressPostalCode.length && {
          "address[postal_code]": addressPostalCode,
        }),
        ...(addressCountry.length && { "address[country]": addressCountry }),
        ...(addressState.length && { "address[state]": addressState }),
        ...(billingAddress.length && { billing_address: billingAddress }),
        ...(shippingAddress.length && { shipping_address: shippingAddress }),
        ...customFieldsObject,
        ...(inclusive.length && { inclusive }),
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
