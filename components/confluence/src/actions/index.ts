import attachments from "./attachments";
import contentProperties from "./content-properties";
import misc from "./misc";
import pages from "./pages";
import spaces from "./spaces";
export default {
  ...attachments,
  ...contentProperties,
  ...pages,
  ...spaces,
  ...misc,
};
