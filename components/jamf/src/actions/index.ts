import * as categories from "./categories";
import * as computers from "./computers";
import * as departments from "./departments";
import * as misc from "./misc";
import * as mobileDevices from "./mobileDevices";
import * as packages from "./packages";
import * as scripts from "./scripts";
import * as users from "./users";
import * as webhooks from "./webhooks";

export default {
  ...computers,
  ...mobileDevices,
  ...users,
  ...departments,
  ...categories,
  ...scripts,
  ...packages,
  ...webhooks,
  ...misc,
};
