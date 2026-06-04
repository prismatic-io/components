import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { sheetSendExamplePayload } from "../../examplePayloads";
import { sheetSendInputs } from "../../inputs";

export const sheetSend = action({
  display: {
    label: "Send Sheet",
    description: "Sends a sheet via email to specified recipients.",
  },
  perform: async (
    { debug: { enabled: debug } },
    {
      connection,
      sheetId,
      format,
      paperSize,
      emails,
      groups,
      ccMe,
      message,
      subject,
    },
  ) => {
    const client = createClient(connection, debug);
    const sendTo = [
      ...(emails || []).map((email) => ({ email })),
      ...(groups || []).map((groupId) => ({ groupId })),
    ];
    const { data } = await client.post(`/sheets/${sheetId}/emails`, {
      format,
      formatDetails: { paperSize },
      ccMe,
      message,
      sendTo,
      subject,
    });
    return { data };
  },
  inputs: sheetSendInputs,
  examplePayload: sheetSendExamplePayload,
});
