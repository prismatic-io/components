

import configurationActions from "./configuration";
import employeeActions from "./employees";
import importToolActions from "./importTool";
import miscActions from "./misc";



export default {
  ...employeeActions,
  
  
  ...importToolActions,
  ...configurationActions,
  ...miscActions,
};
