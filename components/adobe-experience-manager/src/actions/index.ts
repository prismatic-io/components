import assetsActions from "./assets";
import contentFragmentsActions from "./contentFragments";
import foldersActions from "./folders";
import miscActions from "./misc";
import pagesActions from "./pages";

export default {
  ...contentFragmentsActions,
  ...foldersActions,
  ...assetsActions,
  ...pagesActions,
  ...miscActions,
};
