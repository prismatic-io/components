import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, userIdInput, topicNameInput, labelIdsInput } from "../inputs";
import { createPushNotificationExamplePayload } from "../examplePayloads";

const createPushNotification = action({
  display: {
    label: "Create Push Notification (Watch Request)",
    description: "Enables the ability to send update notifications like new messages received.",
  },
  inputs: {
    connection: connectionInput,
    userIdInput,
    topicNameInput,
    labelIdsInput,
  },
  perform: async (context, { connection, userIdInput, topicNameInput, labelIdsInput }) => {
    const client = await createClient(connection);
    const { data } = await client.users.watch({
      userId: userIdInput,
      requestBody: {
        labelIds: labelIdsInput,
        topicName: topicNameInput,
      },
    });
    return { data };
  },
  examplePayload: createPushNotificationExamplePayload,
});

export default createPushNotification;
