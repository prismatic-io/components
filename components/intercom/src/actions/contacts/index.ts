import { archiveContact } from "./archive";
import { attachCompany } from "./attachCompanyToContact";
import { attachTag } from "./attachTagToContact";
import { createContact } from "./create";
import { deleteContact } from "./delete";
import { detachCompany } from "./detachCompanyFromContact";
import { detachTag } from "./detachTagFromContact";
import { getContact } from "./get";
import { listContacts } from "./list";
import { searchContacts } from "./search";
import { unarchiveContact } from "./unarchive";
import { updateContact } from "./update";

export default {
  listContacts,
  createContact,
  updateContact,
  deleteContact,
  archiveContact,
  unarchiveContact,
  searchContacts,
  attachTag,
  detachTag,
  attachCompany,
  detachCompany,
  getContact,
};
