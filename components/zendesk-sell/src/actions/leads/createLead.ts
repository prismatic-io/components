import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getZendeskClient } from "../../client";
import { createLeadExamplePayload } from "../../examplePayloads";
import { createLeadInputs } from "../../inputs";

export const createLead = action({
  display: {
    label: "Create Lead",
    description: "Creates a new lead.",
  },
  perform: async (
    context,
    {
      connection,
      lastName,
      organizationName,
      firstName,
      contactInfo,
      customFields,
      tags,
      address,
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
        ...(lastName.length && { last_name: lastName }),
        ...(organizationName.length && { organization_name: organizationName }),
        ...(firstName.length && { first_name: firstName }),
        ...(additionalFields.ownerId.length && {
          owner_id: util.types.toNumber(additionalFields.ownerId),
        }),
        ...(additionalFields.status.length && {
          status: additionalFields.status,
        }),
        ...(additionalFields.sourceId.length && {
          source_id: util.types.toNumber(additionalFields.sourceId),
        }),
        ...(additionalFields.unqualifiedReasonId.length && {
          unqualified_reason_id: util.types.toNumber(
            additionalFields.unqualifiedReasonId,
          ),
        }),
        ...(additionalFields.title.length && {
          title: additionalFields.title,
        }),
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
        ...(address.length && {
          address: JSON.parse(address),
        }),
        ...(tags.length && { tags }),
        ...(customFields.length && {
          custom_fields: customFieldsObject,
        }),
      };
      const { data } = await client.post(
        `/leads`,
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
  inputs: createLeadInputs,
  examplePayload: createLeadExamplePayload,
});
export default { createLead };
