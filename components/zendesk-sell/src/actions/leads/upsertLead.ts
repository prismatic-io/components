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
      firstName,
      lastName,
      organizationName,
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
        ...(additionalFields.sourceId.length && {
          source_id: util.types.toNumber(additionalFields.sourceId),
        }),
        ...(firstName.length && { first_name: firstName }),
        ...(lastName.length && { last_name: lastName }),
        ...(organizationName.length && { organization_name: organizationName }),
        ...(additionalFields.status.length && {
          status: additionalFields.status,
        }),
        ...(contactInfo.email.length && { email: contactInfo.email }),
        ...(contactInfo.phone.length && { phone: contactInfo.phone }),
        ...(contactInfo.mobile.length && { mobile: contactInfo.mobile }),
        ...(Object.keys(addressObject).length && { address: addressObject }),
        ...(Object.keys(customFieldsObject).length && {
          custom_fields: customFieldsObject,
        }),
        ...(additionalFields.inclusive.length && {
          inclusive: additionalFields.inclusive === "true",
        }),
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
