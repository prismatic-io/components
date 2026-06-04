import { trigger } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { connectionInput, eventTypes, overwriteWebhookSettings } from "../inputs";
import type { WebhookSettings } from "../types/WebhookSettings";
import {
  appWebhookSettingsExists,
  appWebhookSubscriptionsExists,
  checkDeveloperApiKeyAndAppId,
  createAppWebhookConfiguration,
  deleteAllAppSubscriptions,
  deleteAppSettings,
  webhookPerformFunction,
} from "../util";

export const eventTypeSubscription = trigger({
  display: {
    label: "Event Type Subscription",
    description:
      "Receive CRM event notifications from HubSpot. Automatically creates and manages a webhook subscription for selected event types when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  allowsBranching: false,
  inputs: {
    hubspotConnection: connectionInput,
    eventTypes,
    overwriteWebhookSettings,
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: webhookPerformFunction,
  webhookLifecycleHandlers: {
    create: async (context, { hubspotConnection, eventTypes, overwriteWebhookSettings }) => {
      const webhookUrl = context.webhookUrls[context.flow.name];
      const client = getHubspotClient(
        {
          hubspotConnection,
          headers: { "Content-Type": "application/json" },
        },
        false,
      );
      const { developerApiKey, appId } = checkDeveloperApiKeyAndAppId(hubspotConnection);

      const getConfigurationResults = await Promise.all([
        appWebhookSettingsExists(client, appId, developerApiKey) as Promise<boolean>,
        appWebhookSubscriptionsExists(client, appId, developerApiKey),
      ]);

      const appWebhookConfigurationExists = getConfigurationResults.some(
        (configExists) => configExists === true,
      );

      if (appWebhookConfigurationExists && !overwriteWebhookSettings)
        throw new Error(
          `Webhook configuration already exists for App ID ${appId} and overwrite is set to false. No action will be taken.`,
        );

      if (
        !appWebhookConfigurationExists ||
        (appWebhookConfigurationExists && overwriteWebhookSettings)
      ) {
        context.logger.info(`Creating webhook configuration for App ID ${appId}.`);

        await createAppWebhookConfiguration(client, eventTypes, appId, developerApiKey, webhookUrl);
      }
    },
    delete: async (context, { hubspotConnection }): Promise<void> => {
      const webhookUrl = context.webhookUrls[context.flow.name];
      const { developerApiKey, appId } = checkDeveloperApiKeyAndAppId(hubspotConnection);
      const client = getHubspotClient(
        {
          hubspotConnection,
          headers: { "Content-Type": "application/json" },
        },
        false,
      );

      const currentAppWebhookSettings = await appWebhookSettingsExists(
        client,
        appId,
        developerApiKey,
        true,
      );

      
      if (
        currentAppWebhookSettings &&
        (currentAppWebhookSettings as WebhookSettings).targetUrl === webhookUrl
      ) {
        context.logger.info(`Deleting webhook configuration for App ID ${appId}.`);
        await Promise.all([
          deleteAllAppSubscriptions(client, appId, developerApiKey),
          deleteAppSettings(client, appId, developerApiKey),
        ]);
      }
    },
  },
});
