import type { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";











export const messagePayload: ReturnType<MessageInstance["toJSON"]> = {
  body: "Your appointment is confirmed for tomorrow at 2:00 PM.",
  numSegments: "1",
  direction: "outbound-api",
  from: "+15558675309",
  to: "+15551234567",
  dateUpdated: new Date("2026-03-15T14:32:10.000Z"),
  price: "-0.00750",
  errorMessage: null,
  uri: "/2010-04-01/Accounts/ACa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6/Messages/SM1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d.json",
  accountSid: "ACa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
  numMedia: "0",
  status: "queued",
  messagingServiceSid: null,
  sid: "SM1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
  dateSent: null,
  dateCreated: new Date("2026-03-15T14:32:10.000Z"),
  errorCode: null,
  priceUnit: "USD",
  apiVersion: "2010-04-01",
  subresourceUris: {
    media:
      "/2010-04-01/Accounts/ACa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6/Messages/SM1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d/Media.json",
  },
};

export const sendSMSExamplePayload = { data: messagePayload };

export const getSMSExamplePayload = { data: messagePayload };










export const listMessagesExamplePayload = {
  data: [messagePayload],
};
