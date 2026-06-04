import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../../auth";
import type { SubscriptionResponse } from "../../../types";
import {
  connectionInput,
  includeComments,
  locale,
  sectionId,
  userId,
} from "../../../inputs";
import { subscriptionPayload } from "../../../examplePayloads";

export const createSectionSubscription = action({
  display: {
    label: "Create Section Subscription",
    description: "Create a section subscription in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, sectionId, locale, includeComments, userId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const url = locale
      ? `/help_center/${locale}/sections/${sectionId}/subscriptions`
      : `/help_center/sections/${sectionId}/subscriptions`;

    const payload = {
      user_id: userId || undefined,
      source_locale: locale,
      include_comments: includeComments,
    };

    const { data } = await client.post<SubscriptionResponse>(url, payload);

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    sectionId,
    userId: {
      ...userId,
      comments:
        "The ID of the user to subscribe to the section. If none provided, the API assumes the current user.",
      required: false,
    },
    locale: {
      ...locale,
      required: false,
      model: undefined,
      default: undefined,
      comments:
        "The locale of the section. If not provided, the default locale is used.",
    },
    includeComments,
  },
  examplePayload: { data: subscriptionPayload },
});
