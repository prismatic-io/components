import boardsActions from "./boards";
import categoriesActions from "./categories";
import commentsActions from "./comments";
import companiesActions from "./companies";
import entriesActions from "./entries";
import miscActions from "./misc";
import postsActions from "./posts";
import statusChangesActions from "./statusChanges";
import tagsActions from "./tags";
import usersActions from "./users";
import votesActions from "./votes";

export default {
  ...boardsActions,
  ...postsActions,
  ...commentsActions,
  ...votesActions,
  ...categoriesActions,
  ...tagsActions,
  ...usersActions,
  ...companiesActions,
  ...statusChangesActions,
  ...entriesActions,
  ...miscActions,
};
