import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { unsubscribeProfilesInputs as inputs } from "../../inputs/profiles";
import {
  ProfileSubscriptionBulkDeleteJobEnum,
  type ProfileSubscriptionDeleteQueryResourceObject,
  type SubscriptionDeleteJobCreateQuery,
} from "klaviyo-api";
import { unsubscribeProfilesExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const unsubscribeProfiles = action({
  display: {
    label: "Unsubscribe Profiles",
    description:
      "Unsubscribe one or more profiles to email marketing, SMS marketing, or both.",
  },
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
  examplePayload: unsubscribeProfilesExamplePayload,
});
