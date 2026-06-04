import companies from "./companies";
import documents from "./documents";
import earnings from "./earnings";
import employees from "./employees";
import { getNewClientSecret } from "./getNewClientSecret";
import { listCustomFields } from "./listCustomFields";
import paymententry from "./paymententry";

import rawRequest from "./rawRequest";


export default {
  ...companies,
  ...documents,
  ...earnings,
  ...paymententry,
  
  
  ...employees,
  rawRequest,
  getNewClientSecret,
  listCustomFields,
};
