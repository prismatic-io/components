import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import {
  connection,
  encryptedEmail,
  transferEmail,
  userId,
  action as actionInput,
  transferMeeting,
  transferWebinar,
  transferRecording,
  transferWhiteboard,
} from "../../inputs";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description:
      "Disassociate (unlink) a user or permanently delete a user by ID.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      userId,
      encryptedEmail,
      action,
      transferEmail,
      transferMeeting,
      transferWebinar,
      transferRecording,
      transferWhiteboard,
    },
  ) => {
    const client = createZoomClient({ connection, debug });

    const { data } = await client.delete(`/users/${userId}`, {
      params: {
        encrypted_email: encryptedEmail,
        action,
        transfer_email: transferEmail,
        transfer_meeting: transferMeeting,
        transfer_webinar: transferWebinar,
        transfer_recording: transferRecording,
        transfer_whiteboard: transferWhiteboard,
      },
    });

    return {
      data,
    };
  },
  inputs: {
    connection,
    userId,
    encryptedEmail,
    action: actionInput,
    transferEmail,
    transferMeeting,
    transferWebinar,
    transferRecording,
    transferWhiteboard,
  },
  examplePayload: {
    data: {},
  },
});
