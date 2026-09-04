import { dataSource, type Element } from "@prismatic-io/spectral";
import { createOauthClient } from "../client";
import { selectChannelsInputs } from "../inputs";
import { getChannelDisplayName, getChannels, sortByAttribute } from "../util";
export const selectChannels = dataSource({
  display: {
    label: "Select Channel",
    description:
      "Select a Slack channel from a dropdown menu (up to 10,000 channels). Selecting Private Channels requires accessing the API as a User with the 'user_scope' configuration.",
  },
  inputs: selectChannelsInputs,
  perform: async (context, params) => {
    const client = await createOauthClient({
      slackConnection: params.connection,
    });
    const { channels } = await getChannels(client, params, true);
    if (!channels) {
      return { result: [] };
    }
    const objects = sortByAttribute(channels, "name").map<Element>(
      (channel) => ({
        key: channel.id,
        label: getChannelDisplayName(params.showIdInDropdown, channel),
      }),
    );
    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { key: "C123456", label: "#general (ID: C123456)" },
      { key: "C000000", label: "#other-channel (ID: C000000)" },
      { key: "C555555", label: "#random (ID: C555555)" },
    ],
  },
});
