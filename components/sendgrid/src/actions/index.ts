import {
  sendEmail,
  sendMultipleEmails,
  sendEmailWithDynamicTemplate,
  createList,
  getAllLists,
  getListById,
  addOrUpdateContact,
  getContactsByEmails,
  initiateContactsImport,
  getImportStatus,
  getAllFieldDefinitions,
} from "./emails";

import { rawRequest } from "./rawRequest";

import {
  createWebhook,
  updateWebhook,
  getWebhook,
  listWebhooks,
  deleteWebhook,
  testWebhook,
  toggleSignatureVerification,
} from "./webhooks";

export default {
  sendEmail,
  sendMultipleEmails,
  sendEmailWithDynamicTemplate,
  rawRequest,
  createList,
  getAllLists,
  getListById,
  addOrUpdateContact,
  getContactsByEmails,
  initiateContactsImport,
  getImportStatus,
  getAllFieldDefinitions,
  createWebhook,
  updateWebhook,
  getWebhook,
  listWebhooks,
  deleteWebhook,
  testWebhook,
  toggleSignatureVerification,
};
