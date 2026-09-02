import { createContact } from "./createContact";
import { archiveBatchContacts } from "./archiveBatchContacts";
import { createBatchContacts } from "./createBatchContacts";
import { deleteContact } from "./deleteContact";
import { getBatchContacts } from "./getBatchContacts";
import { getContact } from "./getContact";
import { listContacts } from "./listContacts";
import { updateBatchContacts } from "./updateBatchContacts";
import { updateContact } from "./updateContact";
export default {
  listContacts,
  getContact,
  deleteContact,
  CreateContact: createContact,
  updateContact,
  archiveBatchContacts,
  createBatchContacts,
  getBatchContacts,
  updateBatchContacts,
};
