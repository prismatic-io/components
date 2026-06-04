import app from "./app";
import applications from "./applications";
import appManifests from "./appManifests";
import apps from "./apps";
import authorizations from "./authorizations";
import codesOfConduct from "./codesOfConduct";
import emojis from "./emojis";
import enterpriseInstallation from "./enterpriseInstallation";
import enterprises from "./enterprises";
import events from "./events";
import feeds from "./feeds";
import gists from "./gists";
import gitignore from "./gitignore";
import installation from "./installation";
import issues from "./issues";
import licenses from "./licenses";
import markdown from "./markdown";
import marketplaceListing from "./marketplaceListing";
import meta from "./meta";
import networks from "./networks";
import notifications from "./notifications";
import octocat from "./octocat";
import organizations from "./organizations";
import orgs from "./orgs";
import projects from "./projects";
import rateLimit from "./rateLimit";
import rawRequest from "./rawRequest";
import repos from "./repos";
import repositories from "./repositories";
import reposWebhooks from "./reposWebhooks";
import root from "./root";
import scim from "./scim";
import search from "./search";
import teams from "./teams";
import user from "./user";
import users from "./users";
import zen from "./zen";

export default {
  ...root,
  ...app,
  ...appManifests,
  ...applications,
  ...apps,
  ...authorizations,
  ...codesOfConduct,
  ...emojis,
  ...enterpriseInstallation,
  ...enterprises,
  ...events,
  ...feeds,
  ...gists,
  ...gitignore,
  ...installation,
  ...issues,
  ...licenses,
  ...markdown,
  ...marketplaceListing,
  ...meta,
  ...networks,
  ...notifications,
  ...octocat,
  ...organizations,
  ...orgs,
  ...projects,
  ...rateLimit,
  ...repos,
  ...repositories,
  ...reposWebhooks,
  ...scim,
  ...search,
  ...teams,
  ...user,
  ...users,
  ...zen,
  ...rawRequest,
};
