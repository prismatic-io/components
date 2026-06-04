import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { upsertLeadExamplePayload } from "../../examplePayloads";
import { upsertLeadInputs } from "../../inputs";

export const upsertLead = action({
  display: {
    label: "Upsert Lead",
    description:
      "Creates a new lead or updates an existing one based on a filter value or set of filters.",
  },
  perform: async (
    context,
    {
      connection,
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
        ...(sourceId.length && { source_id: util.types.toNumber(sourceId) }),
        ...(firstName.length && { first_name: firstName }),
        ...(lastName.length && { last_name: lastName }),
        ...(organizationName.length && { organization_name: organizationName }),
        ...(status.length && { status }),
        ...(email.length && { email }),
        ...(phone.length && { phone }),
        ...(mobile.length && { mobile }),
        ...(Object.keys(addressObject).length && { address: addressObject }),
        ...(Object.keys(customFieldsObject).length && {
          custom_fields: customFieldsObject,
        }),
        ...(inclusive.length && { inclusive: inclusive === "true" }),
      };
      const { data } = await client.post(
        `/leads/upsert`,
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
  inputs: upsertLeadInputs,
  examplePayload: upsertLeadExamplePayload,
});
export default { upsertLead };
