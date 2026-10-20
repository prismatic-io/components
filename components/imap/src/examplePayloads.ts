export const addFlagsExamplePayload = {
  data: true,
};
export const appendMessageExamplePayload = {
  data: {
    destination: "INBOX",
    uid: 456,
    uidValidity: "596391842",
    seq: 61,
  },
};
export const copyMessageExamplePayload = {
  data: {
    path: "My-Source-Mailbox",
    destination: "My-Destination-Mailbox",
    uidValidity: "596391920",
    uidMap: new Map([[1, 2]]),
  },
};
export const createMailboxExamplePayload = {
  data: {
    path: "New-Mailbox",
    created: true,
  },
};
export const deleteMessageExamplePayload = {
  data: true,
};
export const downloadMessageExamplePayload = {
  data: {
    meta: {
      expectedSize: 12345,
      contentType: "message/rfc822",
    },
    message: {
      headers: {
        from: { value: [{ address: "sender@example.com", name: "Sender" }] },
        to: {
          value: [{ address: "recipient@example.com", name: "Recipient" }],
        },
        subject: "Example Subject",
        date: "2025-07-21T12:00:00.000Z",
      } as Record<string, unknown>,
      attachments: [] as {
        file: {
          contentType: string;
          data: Buffer;
        };
      }[],
      attachmentsMetadata: [] as {
        filename: string | undefined;
        size: number;
        checksum: string;
        headers: unknown;
        related: boolean;
      }[],
      text: "This is the plain text body of the email." as string | undefined,
      html: "<p>This is the HTML body of the email.</p>" as string | false,
    },
  },
};
export const getStatusExamplePayload = {
  data: {
    path: "INBOX",
    highestModseq: "10914782",
    messages: 61,
    recent: 0,
    uidNext: 76791,
    uidValidity: "596391842",
    unseen: 41,
  },
};
export const listMailboxesExamplePayload = {
  data: [
    {
      path: "Drafts",
      flags: new Set<string>(),
      delimiter: "/",
      listed: true,
      name: "Drafts",
      subscribed: true,
    },
    {
      path: "INBOX",
      flags: new Set<string>(),
      delimiter: "/",
      listed: true,
      specialUse: "\\Inbox",
      name: "INBOX",
      subscribed: true,
    },
    {
      path: "Sent",
      flags: new Set<string>(),
      delimiter: "/",
      listed: true,
      name: "Sent",
      subscribed: true,
    },
  ],
};
export const removeFlagsExamplePayload = {
  data: true,
};
export const renameMailboxExamplePayload = {
  data: {
    path: "Old-Mailbox",
    newPath: "New-Mailbox",
  },
};
export const searchMailboxExamplePayload = {
  data: [1, 5, 12, 45, 78],
};
export const setFlagsExamplePayload = {
  data: true,
};
export const newEmailsPollingTriggerExamplePayload = {
  data: [
    {
      uid: 1066,
      envelope: {
        date: "2026-02-18T23:02:20.000Z",
        subject: "Weekly Team Update",
        from: [{ name: "Jane Doe", address: "jane@example.com" }],
        sender: [{ name: "Jane Doe", address: "jane@example.com" }],
        replyTo: [{ name: "Jane Doe", address: "jane@example.com" }],
        to: [{ name: "", address: "inbox@example.com" }],
        messageId: "<abc123-def456@mail.example.com>",
      },
      flags: [],
      internalDate: "2026-02-18T23:02:20.000Z",
      size: 33932,
    },
    {
      uid: 1067,
      envelope: {
        date: "2026-02-19T16:20:01.000Z",
        subject: "Your monthly report is ready",
        from: [{ name: "Acme Reports", address: "reports@acme.example.com" }],
        sender: [{ name: "Acme Reports", address: "reports@acme.example.com" }],
        replyTo: [
          { name: "Acme Reports", address: "reports@acme.example.com" },
        ],
        to: [{ name: "", address: "inbox@example.com" }],
        messageId: "<ghi789-jkl012@mail.acme.example.com>",
      },
      flags: ["\\Seen"],
      internalDate: "2026-02-19T16:20:01.000Z",
      size: 89372,
    },
  ],
};
