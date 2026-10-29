import attachments from "./attachments";
import cmdb from "./cmdb";
import incidents from "./incidents";
import knowledge from "./knowledge";
import misc from "./misc";
import tables from "./tables";
import users from "./users";

export default {
  ...attachments,
  ...incidents,
  ...knowledge,
  ...misc,
  ...tables,
  ...users,
  ...cmdb,
};
