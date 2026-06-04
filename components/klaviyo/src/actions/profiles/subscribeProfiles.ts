import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { subscribeProfilesInputs as inputs } from "../../inputs/profiles";
import {
  ProfileSubscriptionBulkCreateJobEnum,
  type ProfileSubscriptionCreateQueryResourceObject,
  type SubscriptionCreateJobCreateQuery,
} from "klaviyo-api";
import { subscribeProfilesExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const subscribeProfiles = action({
  display: {
    label: "Subscribe Profiles",
    description:
      "Subscribe one or more profiles to email marketing, SMS marketing, or both.",
  },
  perform: async (context, { connection, subscribeProfiles }) => {
    const profilesApi = getApi(connection, KlaviyoApi.Profiles);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({
        connection,
        subscribeProfiles,
        debug,
      });
    }

    const subscription: SubscriptionCreateJobCreateQuery = {
      data: {
        type: ProfileSubscriptionBulkCreateJobEnum.ProfileSubscriptionBulkCreateJob,
        attributes: {
          profiles: {
            data: subscribeProfiles as ProfileSubscriptionCreateQueryResourceObject[],
          },
        },
      },
    };
    await profilesApi.subscribeProfiles(subscription);
    return {
      data: "Profiles subscribed successfully.",
    };
  },
  inputs,
  examplePayload: subscribeProfilesExamplePayload,
});
