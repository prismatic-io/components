import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectMessageInputs } from "../inputs";

export const selectMessage = dataSource({
  display: {
    label: "Select Message",
    description: "A picklist of recent Twilio SMS messages.",
  },
  inputs: selectMessageInputs,
  perform: async (_context, { connection }) => {
    const twilioClient = createAuthorizedClient(connection, false);
    const messages = await twilioClient.messages.list();

    const result = messages
      .map<Element>((message) => {
        const json = message.toJSON();
        const bodyPreview =
          json.body && json.body.length > 40
            ? `${json.body.substring(0, 40)}...`
            : json.body || "No body";
        return {
          label: `${bodyPreview} (${json.to})`,
          key: json.sid,
        };
      })
      .sort((a, b) => ((a.label || "") < (b.label || "") ? -1 : 1));

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Hello from Acme! (+15551234567)", key: "SMbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" },
    ],
  },
});
