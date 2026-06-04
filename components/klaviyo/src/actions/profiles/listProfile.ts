import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { listProfileInputs as inputs } from "../../inputs/profiles";
import type { FieldsProfile } from "../../types/FieldsProfile";
import type { AdditionalFieldsProfile } from "../../types/AdditionalFieldsProfile";
import { fetchProfile } from "../../utils";
import { listProfileExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const listProfile = action({
  display: {
    label: "List Profile",
    description: "Get all profiles in an account.",
  },
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
  examplePayload: listProfileExamplePayload,
});
