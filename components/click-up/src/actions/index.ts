import attachmentsActions from "./attachments";
import commentsActions from "./comments";
import customFieldsActions from "./custom-fields";
import foldersActions from "./folders";
import guestsActions from "./guests";
import listsActions from "./lists";
import membersActions from "./members";
import miscActions from "./misc";
import spacesActions from "./spaces";
import tasksActions from "./tasks";
import teamsUserGroupsActions from "./teams-user-groups";
import teamsWorkspacesActions from "./teams-workspaces";
import timeTrackingActions from "./time-tracking";
import usersActions from "./users";
import webhooksActions from "./webhooks";
export default {
  ...attachmentsActions,
  ...commentsActions,
  ...customFieldsActions,
  ...foldersActions,
  ...guestsActions,
  ...listsActions,
  ...membersActions,
  ...miscActions,
  ...spacesActions,
  ...tasksActions,
  ...teamsUserGroupsActions,
  ...teamsWorkspacesActions,
  ...timeTrackingActions,
  ...usersActions,
  ...webhooksActions,
};
