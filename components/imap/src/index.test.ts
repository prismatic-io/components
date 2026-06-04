import { listMailboxes } from "./actions/listMailboxes";
import { getStatus } from "./actions/getStatus";
import { addFlags } from "./actions/addFlags";
import { appendMessage } from "./actions/appendMessage";
import { copyMessage } from "./actions/copyMessages";
import { createMailbox } from "./actions/createMailbox";
import { deleteMessage } from "./actions/deleteMessage";
import { downloadMessage } from "./actions/downloadMessage";
import { removeFlags } from "./actions/removeFlags";
import { renameMailbox } from "./actions/renameMailbox";
import { searchMailbox } from "./actions/searchMailbox";
import { setFlags } from "./actions/setFlags";

import { imapConnection } from "./connections";
import { invoke, createConnection } from "@prismatic-io/spectral/dist/testing";
import type { ConnectionDefinition } from "@prismatic-io/spectral";

const connection = createConnection(imapConnection as ConnectionDefinition, {
  host: "127.0.0.1",
  port: 993,
  secure: true,
  user: "debug@spacechimp.org",
  pass: "debug",
  minVersion: "TLSv1.1",
  maxVersion: "TLSv1.3",
  minDHSize: "512",
});

it("should list accessible Mailboxes", async () => {
  const result = await invoke(listMailboxes, { connection });
  expect(result).toBeDefined();
});

it("should get mailbox status", async () => {
  const result = await invoke(getStatus, {
    connection,
    mailbox: "INBOX",
  });

  expect(result).toBeDefined();
});

it("Add flags to message", async () => {
  const result = await invoke(addFlags, {
    connection,
    mailbox: "INBOX",
    flags: ["Hello World"],
    range: "*",
  });

  expect(result).toBeDefined();
});

it("Append Message To Mailbox", async () => {
  const result = await invoke(appendMessage, {
    connection,
    mailbox: "INBOX",
    content: "These are my message contents",
    path: "INDEX",
  });
  console.log(result.result?.data);
  expect(result).toBeDefined();
});

it("Copy Message", async () => {
  const result = await invoke(copyMessage, {
    connection,
    mailbox: "INBOX",
    path: "1",
    range: "*",
  });

  expect(result).toBeDefined();
});

it("Create Mailbox", async () => {
  const result = await invoke(createMailbox, {
    connection,
    path: "Decisions",
  });

  expect(result).toBeDefined();
});

it("Delete Mailbox", async () => {
  const result = await invoke(deleteMessage, {
    connection,
    mailbox: "INBOX",
    messageIndex: "*",
  });

  expect(result).toBeDefined();
});

it("Download Message", async () => {
  const result = await invoke(downloadMessage, {
    connection,
    mailbox: "INBOX",
    messageIndex: "2",
  });

  expect(result).toBeDefined();
});

it("Remove Flags", async () => {
  const result = await invoke(removeFlags, {
    connection,
    flags: [],
    mailbox: "INBOX",
    range: "*",
  });

  expect(result).toBeDefined();
});

it("Rename Mailbox", async () => {
  const result = await invoke(renameMailbox, {
    connection,
    newPath: "INBOX",
    path: "INBOX2",
  });

  expect(result).toBeDefined();
});

it("Search Mailbox", async () => {
  const result = await invoke(searchMailbox, {
    connection,
    from: "",
    mailbox: "INBOX",
    readUnread: "all",
    to: "",
    filterOptions: {},
  });
  expect(result).toBeDefined();
});

it("Set Flags", async () => {
  const result = await invoke(setFlags, {
    connection,
    flags: ["myFlag"],
    mailbox: "INBOX",
    range: "*",
  });
  expect(result).toBeDefined();
});
