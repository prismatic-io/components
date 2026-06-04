import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import allActions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";



const usedActions = [
  "actionsCreateWorkflowDispatch",
  "gitCreateBlob",
  "gitCreateRef",
  "gitCreateTree",
  "gitGetRef",
  "issuesCreateComment",
  "issuesListComments",
  "pullsCreate",
  "rawRequest",
  "reposCreateWebhook",
  "reposDeleteInstanceWebhooks",
  "reposDeleteWebhook",
  "reposDeleteWebhook",
  "reposListForOrg",
  "reposListWebhooks",
  "usersGetByUsername",
  "orgsListForAuthenticatedUser",
  "issuesListForRepo",
  "pullsList",
  "usersGetAuthenticated",
];

const actions = Object.fromEntries(
  Object.entries(allActions).filter(([key]) => usedActions.includes(key))
);

export default component({
  key: "github",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/github/",
  display: {
    label: "GitHub",
    description:
      "Manage repositories, issues, pull requests, and workflows in GitHub.",
    category: "Application Connectors",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  actions,
  connections,
  dataSources,
  triggers,
});
