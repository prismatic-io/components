import filesActions from "./files";
import foldersActions from "./folders";
import linksActions from "./links";
import miscActions from "./misc";
import sharingActions from "./sharing";
import teamActions from "./team";
export default {
  ...filesActions,
  ...foldersActions,
  ...linksActions,
  ...miscActions,
  ...sharingActions,
  ...teamActions,
};
