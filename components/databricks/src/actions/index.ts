import clusterActions from "./clusters";
import commandExecutionActions from "./commandExecution";
import rawRequest from "./rawRequest";
import sqlActions from "./sql";
import sqlWarehouseActions from "./sqlWarehouses";
import userActions from "./users";

export default {
  ...clusterActions,
  ...commandExecutionActions,
  ...sqlActions,
  ...sqlWarehouseActions,
  ...userActions,
  rawRequest,
};
