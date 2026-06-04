import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { downloadMessageExamplePayload } from "../examplePayloads";
import { downloadMessageInputs } from "../inputs/actions";
import { simpleParser } from "mailparser";

export const downloadMessage = action({
  display: {
    label: "Download Message",
    description:
      "Download either full RFC-822 formatted message or a specific body structure part",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.connect();
    try {
      await client.getMailboxLock(util.types.toString(params.mailbox));

      const { content, meta } = await client.download(params.messageIndex, "", {
        uid: true,
      });

      const parsed = await simpleParser(content, {
        writableObjectMode: true,
        autoDestroy: true,
      });

      const message = {
        headers: Object.fromEntries(parsed.headers),
        attachments: parsed.attachments.map(({ contentType, content }) => ({
          file: {
            contentType,
            data: content,
          },
        })),
        attachmentsMetadata: parsed.attachments.map(
          ({ filename, size, checksum, headers, related }) => ({
            filename,
            size,
            checksum,
            headers,
            related,
          }),
        ),
        text: parsed.text,
        html: parsed.html,
      };

      return {
        data: {
          meta,
          message,
        },
      };
    } finally {
      client.close();
    }
  },
  inputs: downloadMessageInputs,
  examplePayload: downloadMessageExamplePayload,
});
