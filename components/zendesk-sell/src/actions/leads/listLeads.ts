import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { listLeadsExamplePayload } from "../../examplePayloads";
import { listLeadsInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listLeads = action({
  display: {
    label: "List Leads",
    description: "Returns all leads available to the user.",
  },
  perform: async (
    context,
    {
      connection,
      fetchAll,
      ids,
      firstName,
      lastName,
      organizationName,
      status,
      contactInfo,
      address,
      customFields,
      pagination,
      additionalFields,
      creatorId,
      ownerId,
      sourceId,
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
        ...(ids.length && { ids }),
        ...(creatorId.length && {
          creator_id: creatorId,
        }),
        ...(ownerId.length && {
          owner_id: ownerId,
        }),
        ...(sourceId.length && {
          source_id: sourceId,
        }),
        ...(firstName.length && {
          first_name: firstName,
        }),
        ...(lastName.length && {
          last_name: lastName,
        }),
        ...(organizationName.length && {
          organization_name: organizationName,
        }),
        ...(status.length && {
          status: status,
        }),
        ...(contactInfo.email.length && { email: contactInfo.email }),
        ...(contactInfo.phone.length && { phone: contactInfo.phone }),
        ...(contactInfo.mobile.length && { mobile: contactInfo.mobile }),
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
        ...customFieldsObject,
        ...(additionalFields.inclusive.length && {
          inclusive: additionalFields.inclusive,
        }),
      };

      const data: unknown = await fetchAllPages(
        client,
        "/leads",
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
  inputs: listLeadsInputs,
  examplePayload: listLeadsExamplePayload,
});
export default { listLeads };
