import { action, outputSchema } from "@prismatic-io/spectral";
import { createProfileOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { createProfileInputs as inputs } from "../../inputs";
import { type ProfileCreateQuery, ProfileEnum } from "klaviyo-api";
import { createProfileExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const createProfile = action({
  display: {
    label: "Create Profile",
    description: "Create a new profile.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, contactInfo, profileFields }) => {
    const profilesApi = getApi(connection, KlaviyoApi.Profiles);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        contactInfo,
        profileFields,
        debug,
      });
    }
    const profile: ProfileCreateQuery = {
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
      },
    };
    const { body } = await profilesApi.createProfile(profile);
    return {
      data: body,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createProfileOutputSchema,
  }),
  examplePayload: createProfileExamplePayload,
});
