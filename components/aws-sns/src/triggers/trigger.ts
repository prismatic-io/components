import { trigger } from "@prismatic-io/spectral";
import { connectionInput, parseMessage, topicArn } from "../inputs";
import { snsExamplePayload } from "./exampleNotification";
import {
  clearSubscriptionState,
  resolveSubscriptionState,
  webhookPerformFn,
} from "../utils";
import { awsRegion } from "aws-utils/src/inputs/awsRegion";
import { createSNSClient } from "../client";
import { SubscribeCommand, UnsubscribeCommand } from "@aws-sdk/client-sns";

export const subscriptionTrigger = trigger({
  display: {
    label: "Manual Subscription",
    description:
      "Receive and validate webhook requests from SNS for manually configured webhook subscriptions.",
  },
  inputs: { parseMessage },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  staticBranchNames: ["Notification", "Subscribe", "Unsubscribe"],
  examplePayload: {
    payload: snsExamplePayload,
    branch: "Notification",
  },
  perform: webhookPerformFn,
});

export const webhookLifecycleTrigger = trigger({
  display: {
    label: "Topic Webhook",
    description:
      "Receive notifications from an SNS topic. Automatically creates and manages a topic subscription when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  inputs: {
    parseMessage,
    awsConnection: connectionInput,
    awsRegion,
    topicArn,
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  staticBranchNames: ["Notification", "Subscribe", "Unsubscribe"],
  examplePayload: {
    payload: snsExamplePayload,
    branch: "Notification",
  },
  perform: webhookPerformFn,
  webhookLifecycleHandlers: {
    create: async (context, { awsConnection, awsRegion, topicArn }) => {
      const sns = await createSNSClient({
        awsConnection,
        awsRegion,
        debug: context.debug.enabled,
        logger: context.logger,
      });

      const { subscriptionArn: existingSubscriptionArn, isLegacy } =
        resolveSubscriptionState(context);

      let legacyStateCleanup: Record<string, null> = {};

      if (existingSubscriptionArn) {
        context.logger.info(
          `Existing SNS subscription found for flow ${context.flow.id}, deleting before recreating`,
          { subscriptionArn: existingSubscriptionArn, legacyState: isLegacy },
        );
        await sns.send(
          new UnsubscribeCommand({ SubscriptionArn: existingSubscriptionArn }),
        );
        legacyStateCleanup = clearSubscriptionState(context, isLegacy);
      }

      context.logger.info(
        `Creating SNS subscription for flow ${context.flow.id} in region ${awsRegion} and topic ${topicArn}.`,
      );
      const response = await sns.send(
        new SubscribeCommand({
          TopicArn: topicArn,
          Protocol: "https",
          Endpoint: context.webhookUrls[context.flow.name],
          Attributes: {
            RawMessageDelivery: "false",
          },
          ReturnSubscriptionArn: true,
        }),
      );
      context.logger.info(
        `Created SNS subscription for topic ${topicArn}. ` +
          `SubscriptionArn: ${response.SubscriptionArn} (pending confirmation)`,
      );

      return {
        crossFlowState: {
          ...legacyStateCleanup,
          [context.flow.stableId]: {
            subscriptionArn: response.SubscriptionArn,
          },
        },
      };
    },
    delete: async (context, { awsConnection, awsRegion }) => {
      const { subscriptionArn: existingSubscriptionArn, isLegacy } =
        resolveSubscriptionState(context);

      if (!existingSubscriptionArn) {
        context.logger.warn(
          `No subscription ARN found for flow ${context.flow.name}. Skipping deletion.`,
        );
        return;
      }

      const sns = await createSNSClient({
        awsConnection,
        awsRegion,
        debug: context.debug.enabled,
        logger: context.logger,
      });

      await sns.send(
        new UnsubscribeCommand({ SubscriptionArn: existingSubscriptionArn }),
      );
      context.logger.info(
        `Deleted SNS subscription for flow ${context.flow.id}. ` +
          `SubscriptionArn: ${existingSubscriptionArn}`,
      );

      return {
        crossFlowState: clearSubscriptionState(context, isLegacy),
      };
    },
  },
});

export default { subscriptionTrigger, webhookLifecycleTrigger };
