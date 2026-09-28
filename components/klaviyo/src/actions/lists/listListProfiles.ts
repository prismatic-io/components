import { action, outputSchema } from "@prismatic-io/spectral";
import { listListProfilesOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { listListProfilesInputs as inputs } from "../../inputs";
import { fetchListProfiles } from "../../util";
import { listListProfilesExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { AdditionalFieldsProfile, FieldsProfile } from "../../types";
export const listListProfiles = action({
  display: {
    label: "List List Profiles",
    description: "Get all profiles within a list with the given list ID.",
  },
  performSafety: "notAllowed",
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
      listId,
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listListProfilesOutputSchema,
  }),
  examplePayload: listListProfilesExamplePayload,
});
