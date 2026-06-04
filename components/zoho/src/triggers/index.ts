import { bookContactsPollingTrigger } from "./polling/booksContacts";
import { contactsPollingTrigger } from "./polling/crmContacts";
import { leadsPollingTrigger } from "./polling/crmLeads";
import { notificationsTrigger } from "./trigger";

export default {
  contactsPollingTrigger,
  leadsPollingTrigger,
  bookContactsPollingTrigger,
  notificationsTrigger,
};
