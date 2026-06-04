import databaseActions from "./databases";
import datasourceActions from "./datasources";
import oldDatabaseActions from "./oldDatabases";
import pageActions from "./pages";
import rawRequest from "./rawRequest";
import userActions from "./users";

export default {
  ...databaseActions,
  ...datasourceActions,
  ...oldDatabaseActions,
  ...pageActions,
  rawRequest,
  ...userActions,
};
