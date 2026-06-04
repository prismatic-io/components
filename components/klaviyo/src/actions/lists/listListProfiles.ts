import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { listListProfilesInputs as inputs } from "../../inputs/lists";
import type { AdditionalFieldsProfile } from "../../types/AdditionalFieldsProfile";
import type { FieldsProfile } from "../../types/FieldsProfile";
import { fetchListProfiles } from "../../utils";
import { listListProfilesExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";
export const listListProfiles = action({
  display: {
    label: "List List Profiles",
    description: "Get all profiles within a list with the given list ID.",
  },
  perform: async (
    context,
    { connection, listId, additionalFieldsProfile, fieldsProfile },
  ) => {
    const listsApi = getApi(connection, KlaviyoApi.Lists);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        listId,
        additionalFieldsProfile,
        fieldsProfile,
        debug,
      });
    }
    const data = await fetchListProfiles(
      listsApi,
      listId!,
      additionalFieldsProfile as AdditionalFieldsProfile[],
      fieldsProfile as FieldsProfile[],
      [],
      undefined,
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload: listListProfilesExamplePayload,
});
