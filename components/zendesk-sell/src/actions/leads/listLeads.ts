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
      page,
      perPage,
      sortBy,
      ids,
      creatorId,
      ownerId,
      sourceId,
      firstName,
      lastName,
      organizationName,
      status,
      email,
      phone,
      mobile,
      addressCity,
      addressPostalCode,
      addressCountry,
      addressState,
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
        ...(sourceId.length && { source_id: sourceId }),
        ...(firstName.length && { first_name: firstName }),
        ...(lastName.length && { last_name: lastName }),
        ...(organizationName.length && { organization_name: organizationName }),
        ...(status.length && { status }),
        ...(email.length && { email }),
        ...(phone.length && { phone }),
        ...(mobile.length && { mobile }),
        ...(addressCity.length && { "address[city]": addressCity }),
        ...(addressPostalCode.length && {
          "address[postal_code]": addressPostalCode,
        }),
        ...(addressCountry.length && { "address[country]": addressCountry }),
        ...(addressState.length && { "address[state]": addressState }),
        ...customFieldsObject,
        ...(inclusive.length && { inclusive }),
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
