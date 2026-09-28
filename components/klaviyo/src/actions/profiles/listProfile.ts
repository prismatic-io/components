import { action, outputSchema } from "@prismatic-io/spectral";
import { listProfileOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { listProfileInputs as inputs } from "../../inputs";
import { fetchProfile } from "../../util";
import { listProfileExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { AdditionalFieldsProfile, FieldsProfile } from "../../types";
export const listProfile = action({
  display: {
    label: "List Profiles",
    description: "Get all profiles in an account.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, fieldsProfile, additionalFieldsProfile },
  ) => {
    const profilesApi = getApi(connection, KlaviyoApi.Profiles);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        fieldsProfile,
        additionalFieldsProfile,
        debug,
      });
    }
    const data = await fetchProfile(
      profilesApi,
      fieldsProfile as FieldsProfile[],
      additionalFieldsProfile as AdditionalFieldsProfile[],
      [],
      undefined,
    );
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProfileOutputSchema,
  }),
  examplePayload: listProfileExamplePayload,
});
