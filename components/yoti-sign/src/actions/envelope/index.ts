import { archiveEnvelope } from "./archive";
import { createEnvelope } from "./create";
import { createEmbeddedEnvelope } from "./create-embededd";
import { editRecipient } from "./editRecipient";
import { findEnvelopes } from "./find";
import { getEnvelope } from "./get";
import { getDocuments } from "./getDocuments";
import { getEnvelopeStatus } from "./getStatus";
import { listEnvelopes } from "./list";
import { sendEnvelopeReminder } from "./sendReminder";

export default {
  archiveEnvelope,
  createEmbeddedEnvelope,
  createEnvelope,
  editRecipient,
  findEnvelopes,
  getEnvelope,
  getDocuments,
  getEnvelopeStatus,
  listEnvelopes,
  sendEnvelopeReminder,
};
