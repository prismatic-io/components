import companies from "./companies";
import contacts from "./contacts";
import { rawRequest } from "./rawRequest";
import tags from "./tags";
import tickets from "./tickets";

export default {
  ...contacts,
  ...companies,
  ...tags,
  ...tickets,
  rawRequest,
};
