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
      ownerId,
      status,
      sourceId,
      unqualifiedReasonId,
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
        ...(lastName.length && { last_name: lastName }),
        ...(organizationName.length && { organization_name: organizationName }),
        ...(firstName.length && { first_name: firstName }),
        ...(ownerId.length && { owner_id: util.types.toNumber(ownerId) }),
        ...(status.length && { status }),
        ...(sourceId.length && { source_id: util.types.toNumber(sourceId) }),
        ...(unqualifiedReasonId.length && {
          unqualified_reason_id: util.types.toNumber(unqualifiedReasonId),
        }),
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
        ...(tags.length && { tags }),
        ...(customFields.length && { custom_fields: customFieldsObject }),
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
