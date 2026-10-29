import accounts from "./accounts";
import campaigns from "./campaigns";
import events from "./events";
import images from "./images";
import lists from "./lists";
import misc from "./misc";
import profiles from "./profiles";
import segments from "./segments";
import templates from "./templates";

export default {
  ...accounts,
  ...images,
  ...lists,
  ...templates,
  ...profiles,
  ...campaigns,
  ...events,
  ...segments,
  ...misc,
};
