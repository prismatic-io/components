import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { updateProfileInputs as inputs } from "../../inputs/profiles";
import { ProfileEnum, type ProfilePartialUpdateQuery } from "klaviyo-api";
import { updateProfileExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const updateProfile = action({
  display: {
    label: "Update Profile",
    description: "Update the profile with the given profile ID.",
  },
  perform: async (
    context,
    {
      connection,
      profileId,
      email,
      phoneNumber,
      externalId,
      firstName,
      lastName,
      organization,
      title,
      image,
      location,
      properties,
    },
  ) => {
    const profilesApi = getApi(connection, KlaviyoApi.Profiles);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        profileId,
        email,
        phoneNumber,
        externalId,
        firstName,
        lastName,
        organization,
        title,
        image,
        location,
        properties,
        debug,
      });
    }

    const profile: ProfilePartialUpdateQuery = {
      data: {
        type: ProfileEnum.Profile,
        attributes: {
          email,
          phoneNumber,
          externalId,
          firstName,
          lastName,
          organization,
          title,
          image,
          location,
          properties,
        },
        id: profileId!,
      },
    };
    const { body } = await profilesApi.updateProfile(profileId!, profile);
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: updateProfileExamplePayload,
});
