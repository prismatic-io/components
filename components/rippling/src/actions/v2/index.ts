import businessPartnerGroups from "./businessPartnerGroups";
import businessPartners from "./businessPartners";
import companies from "./companies";
import customFields from "./customFields";
import customObjects from "./customObjects";
import departments from "./departments";
import employmentTypes from "./employmentTypes";
import entitlements from "./entitlements";
import jobFunctions from "./jobFunctions";
import misc from "./misc";
import objectCategories from "./objectCategories";
import supergroups from "./supergroups";
import teams from "./teams";
import users from "./users";
import workers from "./workers";
import workLocations from "./workLocations";

export default {
  ...businessPartnerGroups,
  ...businessPartners,
  ...companies,
  ...customFields,
  ...customObjects,
  ...departments,
  ...employmentTypes,
  ...entitlements,
  ...jobFunctions,
  ...misc,
  ...objectCategories,
  ...supergroups,
  ...teams,
  ...users,
  ...workers,
  ...workLocations,
};
