import { createAccount } from "./createAccount";
import { createAccountSignature } from "./createAccountSignature";
import { createBulkSendList } from "./createBulkSendList";
import { createContact } from "./createContact";
import { createEnvelope } from "./createEnvelope";
import { createTemplate } from "./createTemplate";
import { deleteAccount } from "./deleteAccount";
import { deleteAccountSignature } from "./deleteAccountSignature";
import { deleteBulkSendList } from "./deleteBulkSendList";
import { deleteContact } from "./deleteContact";
import { deleteEnvelopeDocument } from "./deleteEnvelopeDocument";
import { deleteTemplateDocument } from "./deleteTemplateDocument";
import { deleteUser } from "./deleteUser";
import { getAccount } from "./getAccount";
import { getAccountSignature } from "./getAccountSignature";
import { getAccountSignatureImage } from "./getAccountSignatureImage";
import { getBulkSendBatchStatus } from "./getBulkSendBatchStatus";
import { getBulkSendBatches } from "./getBulkSendBatches";
import { getBulkSendList } from "./getBulkSendList";
import { getBulkSendLists } from "./getBulkSendLists";
import { getContact } from "./getContact";
import { getEnvelope } from "./getEnvelope";
import { getEnvelopeDocument } from "./getEnvelopeDocument";
import { getRecipientSignature } from "./getRecipientSignature";
import { getRecipientSignatureImage } from "./getRecipientSignatureImage";
import { getTemplate } from "./getTemplate";
import { getTemplateDocument } from "./getTemplateDocument";
import { getUser } from "./getUser";
import { getWebhook } from "./getWebhook";
import { listAccountSettings } from "./listAccountSettings";
import { listEnvelopeDocuments } from "./listEnvelopeDocuments";
import { listFolderItems } from "./listFolderItems";
import { listFolders } from "./listFolders";
import { listTemplateDocuments } from "./listTemplateDocuments";
import { listTemplates } from "./listTemplates";
import { listWebhooks } from "./listWebhooks";
import { createWebhook } from "./createWebhook";
import { updateAccountSignature } from "./updateAccountSignature";
import { updateAccountSignatureImage } from "./updateAccountSignatureImage";
import { updateBulkSendList } from "./updateBulkSendList";
import { updateContact } from "./updateContact";
import { updateEnvelope } from "./updateEnvelope";
import { updateEnvelopeDocument } from "./updateEnvelopeDocument";
import { updateTemplate } from "./updateTemplate";
import { updateTemplateDocument } from "./updateTemplateDocument";
import { updateUser } from "./updateUser";
import { updateWebhook } from "./updateWebhook";
import { deleteWebhook } from "./deleteWebhook";
import { deleteAllInstancedWebhooks } from "./deleteAllInstancedWebhooks";
import { rawRequest } from "./rawRequest";

export default {
  getAccount,
  deleteAccount,
  createAccount,
  listAccountSettings,
  createAccountSignature,
  deleteAccountSignature,
  getAccountSignature,
  getAccountSignatureImage,
  updateAccountSignature,
  updateAccountSignatureImage,
  createBulkSendList,
  deleteBulkSendList,
  getBulkSendList,
  getBulkSendLists,
  updateBulkSendList,
  getBulkSendBatchStatus,
  getBulkSendBatches,
  createTemplate,
  getTemplate,
  listTemplates,
  updateTemplate,
  listFolders,
  listFolderItems,
  listEnvelopeDocuments,
  getEnvelopeDocument,
  updateEnvelopeDocument,
  deleteEnvelopeDocument,
  listTemplateDocuments,
  getTemplateDocument,
  updateTemplateDocument,
  deleteTemplateDocument,
  getEnvelope,
  createEnvelope,
  updateEnvelope,
  getUser,
  updateUser,
  deleteUser,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getRecipientSignature,
  getRecipientSignatureImage,
  createWebhook,
  listWebhooks,
  getWebhook,
  updateWebhook,
  deleteWebhook,
  deleteAllInstancedWebhooks,
  rawRequest,
};
