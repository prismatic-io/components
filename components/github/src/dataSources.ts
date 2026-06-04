import {
  Connection,
  dataSource,
  type Element,
  input,
  util,
} from "@prismatic-io/spectral";
import { createClient } from "./client";
import { Organization } from "./interfaces/Organization";
import { Issue } from "./interfaces/Issue";
import {
  assignee,
  base,
  connectionInput,
  direction,
  head,
  labels,
  organization,
  owner,
  repo,
  since,
  sort,
  state,
} from "./inputs";
import { PullRequest } from "./interfaces/PullRequest";
import { paginateResults, sortBy } from "./utils";
import { Repository } from "./interfaces/Respository";
import { User } from "./interfaces/User";

const listReposForAuthenticatedUser = dataSource({
  display: {
    label: "List Repos",
    description: "List all of the authenticated user's repositories",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, false);
    const repos = await paginateResults<Repository>(
      client,
      `/user/repos`,
      true
    );

    const objects = repos.sort(sortBy("name")).map<Element>((repo) => ({
      key: util.types.toString(repo.name),
      label: util.types.toString(repo.name),
    }));

    return { result: objects };
  },
  inputs: {
    connection: connectionInput,
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { key: "exampleuser/examplerepo", label: "exampleuser/examplerepo" },
      {
        key: "exampleorg/special-project",
        label: "exampleorg/special-project",
      },
    ],
  },
});

const selectOrganizationsForAuthenticatedUser = dataSource({
  display: {
    label: "Select Organization",
    description:
      "Select an organization from a list of organizations for the authenticated user",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, false);
    const orgs = await paginateResults<Organization>(
      client,
      `/user/orgs`,
      true
    );

    const result = orgs.sort(sortBy("url")).map<Element>(({ id, url }) => ({
      key: util.types.toString(id),
      label: url,
    }));

    return { result };
  },
  inputs: {
    connection: connectionInput,
  },
  dataSourceType: "picklist",
});

const selectIssueForAuthenticatedUser = dataSource({
  display: {
    label: "Select Issue",
    description: "Select an issue from the given owner/repo pair",
  },
  perform: async (
    context,
    { connection, assignee, state, labels, sort, direction, since, owner, repo }
  ) => {
    const client = createClient(connection as Connection, false);
    const issues = await paginateResults<Issue>(
      client,
      `/repos/${owner}/${repo}/issues`,
      true,
      { assignee, state, labels, sort, direction, since }
    );

    const result = issues
      .sort(sortBy("title"))
      .map<Element>(({ id, title }) => ({
        key: util.types.toString(id),
        label: title,
      }));

    return { result };
  },
  inputs: {
    connection: connectionInput,
    owner: {
      ...owner,
      dataSource: undefined,
    },
    repo: {
      ...repo,
      dataSource: undefined,
    },
    state: state("issues"),
    assignee,
    labels,
    sort: sort(
      [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
        { label: "Comments", value: "comments" },
      ],

      "created"
    ),
    direction,
    since,
  },
  dataSourceType: "picklist",
});

export const selectPullRequestFromRepo = dataSource({
  display: {
    label: "Select Pull Request from Repo",
    description:
      "Select a pull request from a list of pull requests given the provided owner/repo pair",
  },
  perform: async (
    context,
    { connection, owner, repo, state, head, base, sort, direction }
  ) => {
    const client = createClient(connection as Connection, false);
    const pulls = await paginateResults<PullRequest>(
      client,
      `/repos/${owner}/${repo}/pulls`,
      true,
      { state, head, base, sort, direction }
    );

    const result = pulls
      .sort(sortBy("title"))
      .map<Element>(({ id, title }) => ({
        key: util.types.toString(id),
        label: title,
      }));

    return { result };
  },
  inputs: {
    connection: connectionInput,
    owner: {
      ...owner,
      dataSource: undefined,
    },
    repo: {
      ...repo,
      dataSource: undefined,
    },
    state: state("pull requests"),
    head,
    base,
    sort: sort(
      [
        { label: "Created", value: "created" },
        { label: "Updated", value: "updated" },
        { label: "Popularity", value: "popularity" },
        { label: "Long Running", value: "long-running" },
      ],
      "created"
    ),
    direction,
  },
  dataSourceType: "picklist",
});

export const selectUserFromOrganization = dataSource({
  display: {
    label: "Select User from Organization",
    description: "Select a user from a list of github users in an organization",
  },
  perform: async (context, { connection, organization }) => {
    const client = createClient(connection as Connection, false);
    const users = await paginateResults<User>(
      client,
      `/orgs/${organization}/members`,
      true
    );

    const result = users
      .sort(sortBy("login"))
      .map<Element>(({ login: label }) => ({
        key: label, 
        label,
      }));
    return { result };
  },
  inputs: {
    connection: connectionInput,
    organization,
  },
  dataSourceType: "picklist",
});
export default {
  listReposForAuthenticatedUser,
  selectOrganizationsForAuthenticatedUser,
  selectIssueForAuthenticatedUser,
  selectPullRequestFromRepo,
  selectUserFromOrganization,
};
