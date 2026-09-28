import { action, outputSchema } from "@prismatic-io/spectral";
import { unsubscribeProfilesOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { unsubscribeProfilesInputs as inputs } from "../../inputs";
import {
  ProfileSubscriptionBulkDeleteJobEnum,
  type ProfileSubscriptionDeleteQueryResourceObject,
  type SubscriptionDeleteJobCreateQuery,
} from "klaviyo-api";
import { unsubscribeProfilesExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
export const unsubscribeProfiles = action({
  display: {
    label: "Unsubscribe Profiles",
    description:
      "Unsubscribe one or more profiles to email marketing, SMS marketing, or both.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, unsubscribeProfiles }) => {
    const profilesApi = getApi(connection, KlaviyoApi.Profiles);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        unsubscribeProfiles,
        debug,
      });
    }
    const subscription: SubscriptionDeleteJobCreateQuery = {
      data: {
        type: ProfileSubscriptionBulkDeleteJobEnum.ProfileSubscriptionBulkDeleteJob,
        attributes: {
          profiles: {
            data: unsubscribeProfiles as ProfileSubscriptionDeleteQueryResourceObject[],
          },
        },
      },
    };
    await profilesApi.unsubscribeProfiles(subscription);
    return {
      data: "Profiles unsubscribed successfully.",
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: unsubscribeProfilesOutputSchema,
  }),
  examplePayload: unsubscribeProfilesExamplePayload,
});
