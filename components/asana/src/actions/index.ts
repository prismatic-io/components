import attachmentActions from "./attachments";
import customFieldActions from "./customFields";
import itemActions from "./items";
import miscActions from "./misc";
import portfolioActions from "./portfolio";
import projectActions from "./projects";
import sectionActions from "./sections";
import statusUpdateActions from "./statusUpdate";
import subtaskActions from "./subtasks";
import tagActions from "./tags";
import taskActions from "./tasks";
import teamActions from "./teams";
import userActions from "./users";
import webhookActions from "./webhooks";
import workspaceActions from "./workspaces";
export default {
  ...attachmentActions,
  ...customFieldActions,
  ...itemActions,
  ...miscActions,
  ...portfolioActions,
  ...projectActions,
  ...sectionActions,
  ...statusUpdateActions,
  ...subtaskActions,
  ...tagActions,
  ...taskActions,
  ...teamActions,
  ...userActions,
  ...webhookActions,
  ...workspaceActions,
};
