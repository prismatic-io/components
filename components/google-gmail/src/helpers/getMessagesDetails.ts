import type { gmail_v1 } from "@googleapis/gmail";
import type { ActionLogger } from "@prismatic-io/spectral";
import { simpleParser } from "mailparser";

export const getMessagesDetails = async (
  client: gmail_v1.Gmail,
  messages: gmail_v1.Schema$Message[],
  userId: string,
  debug: boolean,
  logger: ActionLogger,
) => {
  const messagesPromises = messages.map(
    (historyMessage) =>
      new Promise(async (resolve, reject) => {
        try {
          const {
            data: { raw },
          } = await client.users.messages.get({
            userId: userId,
            id: historyMessage.id,
            format: "raw",
          });

          
          const parsed = await simpleParser(Buffer.from(raw, "base64"), {
            writableObjectMode: true,
            autoDestroy: true,
          });
          const message = {
            headers: Object.fromEntries(parsed.headers),
            attachments: parsed.attachments.map((attachment) => ({
              contentType: attachment.contentType,
              data: attachment.content,
            })),
            text: parsed.text,
            html: parsed.html,
          };

          resolve(message);
        } catch (e) {
          const error = e as { code: number; message: string };
          
          if (error.code === 404) {
            if (debug) {
              logger.error(error.message);
              logger.warn(
                `Not able to retrieve details for message ${historyMessage.id} which was deleted. Skipping.`,
              );
            }
            resolve(null);
          } else {
            reject(error);
          }
        }
      }),
  );

  const detailedMessages = await Promise.all(messagesPromises);
  return detailedMessages;
};
