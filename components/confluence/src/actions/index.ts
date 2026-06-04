import attachments from "./attachments";
import contentProperties from "./content-properties";
import pages from "./pages";
import graphqlRequest from "./rawGraphqlRequest";
import rawRequest from "./rawRequest";
import spaces from "./spaces";


export default {
  ...attachments,
  ...contentProperties,
  ...pages,
  ...spaces,
  
  graphqlRequest,
  rawRequest,
};
