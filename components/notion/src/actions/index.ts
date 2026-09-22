import databaseActions from "./databases";
import datasourceActions from "./datasources";
import miscActions from "./misc";
import oldDatabaseActions from "./oldDatabases";
import pageActions from "./pages";
import userActions from "./users";
export default {
  ...databaseActions,
  ...datasourceActions,
  ...oldDatabaseActions,
  ...pageActions,
  ...miscActions,
  ...userActions,
};
