import { action, outputSchema } from "@prismatic-io/spectral";
import { updateProfileOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { updateProfileInputs as inputs } from "../../inputs";
import { ProfileEnum, type ProfilePartialUpdateQuery } from "klaviyo-api";
import { updateProfileExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const updateProfile = action({
  display: {
    label: "Update Profile",
    description: "Update the profile with the given profile ID.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, profileId, contactInfo, profileFields },
  ) => {
    const profilesApi = getApi(connection, KlaviyoApi.Profiles);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        profileId,
        contactInfo,
        profileFields,
        debug,
      });
    }
    const profile: ProfilePartialUpdateQuery = {
      data: {
        type: ProfileEnum.Profile,
        attributes: {
          email: contactInfo.email,
          phoneNumber: contactInfo.phoneNumber,
          externalId: profileFields.externalId,
          firstName: contactInfo.firstName,
          lastName: contactInfo.lastName,
          organization: profileFields.organization,
          title: profileFields.title,
          image: profileFields.image,
          location: profileFields.location,
          properties: profileFields.properties,
        },
        id: profileId,
      },
    };
    const { body } = await profilesApi.updateProfile(profileId, profile);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateProfileOutputSchema,
  }),
  examplePayload: updateProfileExamplePayload,
});
