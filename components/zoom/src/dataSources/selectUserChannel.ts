import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectUserChannelInputs } from "../inputs";
import { createZoomClient } from "../client";
import { getAllPaginationResults } from "../util";
import type { UserChannel } from "../interfaces/UserChannel";

export const selectUserChannel = dataSource({
  display: {
    label: "Select User Channel",
    description: "A Picklist of channels for a specific user.",
  },
  dataSourceType: "picklist",
  inputs: selectUserChannelInputs,
  perform: async (_context, { connection, userId }) => {
    const client = createZoomClient({ connection });
    const data: { channels: UserChannel[] } =
      await getAllPaginationResults<UserChannel>(
        client,
        `/chat/users/${userId}/channels`,
        "channels",
      );

    const result = data.channels.map(({ id, name }): Element => {
      return {
        label: name,
        key: id,
      };
    });

    return {
      result,
    };
  },
});
