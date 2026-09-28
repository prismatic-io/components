import { action, outputSchema } from "@prismatic-io/spectral";
import { getProfileOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { getProfileInputs as inputs } from "../../inputs";
import { getProfileExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { AdditionalFieldsProfile, FieldsProfile } from "../../types";
export const getProfile = action({
  display: {
    label: "Get Profile",
    description: "Get the profile with the given profile ID.",
  },
  performSafety: "safe",
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
    const { body } = await profilesApi.getProfile(profileId, {
      fieldsProfile: fieldsProfile as FieldsProfile[],
      additionalFieldsProfile:
        additionalFieldsProfile as AdditionalFieldsProfile[],
    });
    return {
      data: body,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getProfileExamplePayload.data,
  }),
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getProfileOutputSchema,
  }),
  examplePayload: getProfileExamplePayload,
});
