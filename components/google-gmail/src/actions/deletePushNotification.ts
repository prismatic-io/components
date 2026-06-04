import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, userIdInput } from "../inputs";
import { deletePushNotificationExamplePayload } from "../examplePayloads";

const deletePushNotification = action({
  display: {
    label: "Delete Push Notification (Stop Mailbox Updates)",
    description: "Calls a stop notification.",
  },
  inputs: {
    connection: connectionInput,
    userIdInput,
  },
  perform: async (context, { connection, userIdInput }) => {
    const client = await createClient(connection);
    const { data } = await client.users.stop({
      userId: userIdInput,
    });
    return { data };
  },
  examplePayload: deletePushNotificationExamplePayload,
});

export default deletePushNotification;
