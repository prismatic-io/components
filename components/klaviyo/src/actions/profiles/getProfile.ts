import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { getProfileInputs as inputs } from "../../inputs/profiles";
import type { AdditionalFieldsProfile } from "../../types/AdditionalFieldsProfile";
import type { FieldsProfile } from "../../types/FieldsProfile";
import { getProfileExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const getProfile = action({
  display: {
    label: "Get Profile",
    description: "Get the profile with the given profile ID.",
  },
  perform: async (
    context,
    { connection, profileId, fieldsProfile, additionalFieldsProfile },
  ) => {
    const profilesApi = getApi(connection, KlaviyoApi.Profiles);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        profileId,
        fieldsProfile,
        additionalFieldsProfile,
        debug,
      });
    }
    const { body } = await profilesApi.getProfile(profileId!, {
      fieldsProfile: fieldsProfile as FieldsProfile[],
      additionalFieldsProfile:
        additionalFieldsProfile as AdditionalFieldsProfile[],
    });
    return {
      data: body,
    };
  },
  inputs,
  examplePayload: getProfileExamplePayload,
});
