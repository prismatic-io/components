import account from "./account";
import customers from "./customers";
import events from "./events";
import files from "./files";
import { rawRequest } from "./rawRequest";
import search from "./search";
import ticketMessages from "./ticketMessages";
import tickets from "./tickets";

export default {
  ...account,
  ...customers,
  ...events,
  ...files,
  ...search,
  ...ticketMessages,
  ...tickets,
  rawRequest,
};
