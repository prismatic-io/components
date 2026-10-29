import { action } from "@prismatic-io/spectral";
import { createZoomClient } from "../../client";
import { connection, userId } from "../../inputs";
import { getAllPaginationResults } from "../../util";
import type { UserChannel } from "../../interfaces/UserChannel";
import { listUserChannelsExamplePayload } from "../../examplePayloads";

export const listUsersChannels = action({
  display: {
    label: "List User's Channels",
    description: "List all channels of a given user",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, userId }) => {
    const client = createZoomClient({ connection, debug });

    const data: { channels: UserChannel[] } =
      await getAllPaginationResults<UserChannel>(
        client,
        `/chat/users/${userId}/channels`,
        "channels",
      );

    return {
      data,
    };
  },
  inputs: { connection, userId },
  examplePayload: listUserChannelsExamplePayload,
});
