












import type { TriggerPayload } from "@prismatic-io/spectral";





const exampleUser = {
  login: "octocat",
  id: 1,
  node_id: "MDQ6VXNlcjE=",
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/octocat",
  html_url: "https://github.com/octocat",
  followers_url: "https://api.github.com/users/octocat/followers",
  following_url: "https://api.github.com/users/octocat/following{/other_user}",
  gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
  starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
  organizations_url: "https://api.github.com/users/octocat/orgs",
  repos_url: "https://api.github.com/users/octocat/repos",
  events_url: "https://api.github.com/users/octocat/events{/privacy}",
  received_events_url: "https://api.github.com/users/octocat/received_events",
  type: "User",
  site_admin: false,
};

const exampleRepository = {
  id: 1296269,
  node_id: "MDEwOlJlcG9zaXRvcnkxMjk2MjY5",
  name: "Hello-World",
  full_name: "octocat/Hello-World",
  owner: exampleUser,
  private: false,
  html_url: "https://github.com/octocat/Hello-World",
  description: "My first repository on GitHub!",
  fork: false,
  url: "https://api.github.com/repos/octocat/Hello-World",
  archive_url: "https://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
  assignees_url: "https://api.github.com/repos/octocat/Hello-World/assignees{/user}",
  blobs_url: "https://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
  branches_url: "https://api.github.com/repos/octocat/Hello-World/branches{/branch}",
  collaborators_url: "https://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
  comments_url: "https://api.github.com/repos/octocat/Hello-World/comments{/number}",
  commits_url: "https://api.github.com/repos/octocat/Hello-World/commits{/sha}",
  compare_url: "https://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
  contents_url: "https://api.github.com/repos/octocat/Hello-World/contents/{+path}",
  contributors_url: "https://api.github.com/repos/octocat/Hello-World/contributors",
  deployments_url: "https://api.github.com/repos/octocat/Hello-World/deployments",
  downloads_url: "https://api.github.com/repos/octocat/Hello-World/downloads",
  events_url: "https://api.github.com/repos/octocat/Hello-World/events",
  forks_url: "https://api.github.com/repos/octocat/Hello-World/forks",
  git_commits_url: "https://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
  git_refs_url: "https://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
  git_tags_url: "https://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
  hooks_url: "https://api.github.com/repos/octocat/Hello-World/hooks",
  issue_comment_url: "https://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
  issue_events_url: "https://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
  issues_url: "https://api.github.com/repos/octocat/Hello-World/issues{/number}",
  keys_url: "https://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
  labels_url: "https://api.github.com/repos/octocat/Hello-World/labels{/name}",
  languages_url: "https://api.github.com/repos/octocat/Hello-World/languages",
  merges_url: "https://api.github.com/repos/octocat/Hello-World/merges",
  milestones_url: "https://api.github.com/repos/octocat/Hello-World/milestones{/number}",
  notifications_url: "https://api.github.com/repos/octocat/Hello-World/notifications{?since,all,participating}",
  pulls_url: "https://api.github.com/repos/octocat/Hello-World/pulls{/number}",
  releases_url: "https://api.github.com/repos/octocat/Hello-World/releases{/id}",
  stargazers_url: "https://api.github.com/repos/octocat/Hello-World/stargazers",
  statuses_url: "https://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
  subscribers_url: "https://api.github.com/repos/octocat/Hello-World/subscribers",
  subscription_url: "https://api.github.com/repos/octocat/Hello-World/subscription",
  tags_url: "https://api.github.com/repos/octocat/Hello-World/tags",
  teams_url: "https://api.github.com/repos/octocat/Hello-World/teams",
  trees_url: "https://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
  created_at: "2011-01-26T19:01:12Z",
  updated_at: "2024-01-15T10:30:00Z",
  pushed_at: "2024-01-15T09:45:00Z",
  git_url: "git://github.com/octocat/Hello-World.git",
  ssh_url: "git@github.com:octocat/Hello-World.git",
  clone_url: "https://github.com/octocat/Hello-World.git",
  svn_url: "https://github.com/octocat/Hello-World",
  homepage: "https://github.com",
  size: 180,
  stargazers_count: 80,
  watchers_count: 80,
  language: "JavaScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: false,
  forks_count: 9,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 0,
  license: {
    key: "mit",
    name: "MIT License",
    spdx_id: "MIT",
    url: "https://api.github.com/licenses/mit",
    node_id: "MDc6TGljZW5zZTEz",
  },
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  topics: ["octocat", "api"],
  visibility: "public",
  forks: 9,
  open_issues: 0,
  watchers: 80,
  default_branch: "main",
};









export const reposListForOrgExamplePayload = {
  data: [
    exampleRepository,
    {
      id: 1296270,
      node_id: "MDEwOlJlcG9zaXRvcnkxMjk2Mjcw",
      name: "Hello-World-2",
      full_name: "octocat/Hello-World-2",
      owner: exampleUser,
      private: true,
      html_url: "https://github.com/octocat/Hello-World-2",
      description: "A private repository for testing",
      fork: false,
      url: "https://api.github.com/repos/octocat/Hello-World-2",
      created_at: "2024-01-10T15:20:00Z",
      updated_at: "2024-01-16T08:00:00Z",
      pushed_at: "2024-01-16T07:50:00Z",
      size: 120,
      stargazers_count: 5,
      watchers_count: 5,
      language: "TypeScript",
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: false,
      has_pages: false,
      forks_count: 0,
      archived: false,
      disabled: false,
      open_issues_count: 3,
      visibility: "private",
      forks: 0,
      open_issues: 3,
      watchers: 5,
      default_branch: "main",
    },
  ],
};









export const reposCreateWebhookExamplePayload = {
  data: {
    type: "Repository",
    id: 12345678,
    name: "web",
    active: true,
    events: ["push", "pull_request"],
    config: {
      content_type: "json",
      insecure_ssl: "0",
      url: "https://example.com/webhook",
    },
    updated_at: "2024-01-15T10:30:00Z",
    created_at: "2024-01-15T10:30:00Z",
    url: "https://api.github.com/repos/octocat/Hello-World/hooks/12345678",
    test_url: "https://api.github.com/repos/octocat/Hello-World/hooks/12345678/test",
    ping_url: "https://api.github.com/repos/octocat/Hello-World/hooks/12345678/pings",
    deliveries_url: "https://api.github.com/repos/octocat/Hello-World/hooks/12345678/deliveries",
    last_response: {
      code: null,
      status: "unused",
      message: null,
    },
  },
};





export const reposListWebhooksExamplePayload = {
  data: [
    reposCreateWebhookExamplePayload.data,
    {
      type: "Repository",
      id: 12345679,
      name: "web",
      active: true,
      events: ["issues", "issue_comment"],
      config: {
        content_type: "json",
        insecure_ssl: "0",
        url: "https://example.com/issue-webhook",
      },
      updated_at: "2024-01-14T09:00:00Z",
      created_at: "2024-01-14T09:00:00Z",
      url: "https://api.github.com/repos/octocat/Hello-World/hooks/12345679",
      test_url: "https://api.github.com/repos/octocat/Hello-World/hooks/12345679/test",
      ping_url: "https://api.github.com/repos/octocat/Hello-World/hooks/12345679/pings",
      deliveries_url: "https://api.github.com/repos/octocat/Hello-World/hooks/12345679/deliveries",
      last_response: {
        code: 200,
        status: "active",
        message: "OK",
      },
    },
  ],
};






export const reposDeleteWebhookExamplePayload = {
  data: {},
};





export const reposDeleteInstanceWebhooksExamplePayload = {
  data: {
    message: "Successfully deleted 2 webhook(s)",
    deletedCount: 2,
    deletedHookIds: [12345678, 12345679],
  },
};









export const issuesListForRepoExamplePayload = {
  data: [
    {
      id: 1,
      node_id: "MDU6SXNzdWUx",
      url: "https://api.github.com/repos/octocat/Hello-World/issues/1347",
      repository_url: "https://api.github.com/repos/octocat/Hello-World",
      labels_url: "https://api.github.com/repos/octocat/Hello-World/issues/1347/labels{/name}",
      comments_url: "https://api.github.com/repos/octocat/Hello-World/issues/1347/comments",
      events_url: "https://api.github.com/repos/octocat/Hello-World/issues/1347/events",
      html_url: "https://github.com/octocat/Hello-World/issues/1347",
      number: 1347,
      state: "open",
      title: "Found a bug",
      body: "I'm having a problem with this.",
      user: exampleUser,
      labels: [
        {
          id: 208045946,
          node_id: "MDU6TGFiZWwyMDgwNDU5NDY=",
          url: "https://api.github.com/repos/octocat/Hello-World/labels/bug",
          name: "bug",
          description: "Something isn't working",
          color: "d73a4a",
          default: true,
        },
      ],
      assignee: null,
      assignees: [],
      milestone: null,
      locked: false,
      active_lock_reason: null,
      comments: 0,
      closed_at: null,
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z",
      author_association: "COLLABORATOR",
    },
    {
      id: 2,
      node_id: "MDU6SXNzdWUy",
      url: "https://api.github.com/repos/octocat/Hello-World/issues/1348",
      repository_url: "https://api.github.com/repos/octocat/Hello-World",
      labels_url: "https://api.github.com/repos/octocat/Hello-World/issues/1348/labels{/name}",
      comments_url: "https://api.github.com/repos/octocat/Hello-World/issues/1348/comments",
      events_url: "https://api.github.com/repos/octocat/Hello-World/issues/1348/events",
      html_url: "https://github.com/octocat/Hello-World/issues/1348",
      number: 1348,
      state: "closed",
      title: "Feature request: add dark mode",
      body: "It would be great to have a dark mode option.",
      user: exampleUser,
      labels: [
        {
          id: 208045947,
          node_id: "MDU6TGFiZWwyMDgwNDU5NDc=",
          url: "https://api.github.com/repos/octocat/Hello-World/labels/enhancement",
          name: "enhancement",
          description: "New feature or request",
          color: "a2eeef",
          default: true,
        },
      ],
      assignee: exampleUser,
      assignees: [exampleUser],
      milestone: null,
      locked: false,
      active_lock_reason: null,
      comments: 5,
      closed_at: "2024-01-14T16:00:00Z",
      created_at: "2024-01-10T09:00:00Z",
      updated_at: "2024-01-14T16:00:00Z",
      author_association: "CONTRIBUTOR",
    },
  ],
};





export const issuesCreateCommentExamplePayload = {
  data: {
    id: 1,
    node_id: "MDEyOklzc3VlQ29tbWVudDE=",
    url: "https://api.github.com/repos/octocat/Hello-World/issues/comments/1",
    html_url: "https://github.com/octocat/Hello-World/issues/1347#issuecomment-1",
    body: "This is a comment",
    user: exampleUser,
    created_at: "2024-01-15T11:00:00Z",
    updated_at: "2024-01-15T11:00:00Z",
    author_association: "COLLABORATOR",
  },
};





export const issuesListCommentsExamplePayload = {
  data: [
    issuesCreateCommentExamplePayload.data,
    {
      id: 2,
      node_id: "MDEyOklzc3VlQ29tbWVudDI=",
      url: "https://api.github.com/repos/octocat/Hello-World/issues/comments/2",
      html_url: "https://github.com/octocat/Hello-World/issues/1347#issuecomment-2",
      body: "Thanks for reporting this issue!",
      user: exampleUser,
      created_at: "2024-01-15T12:30:00Z",
      updated_at: "2024-01-15T12:30:00Z",
      author_association: "OWNER",
    },
  ],
};









export const pullsCreateExamplePayload = {
  data: {
    id: 1,
    node_id: "MDExOlB1bGxSZXF1ZXN0MQ==",
    url: "https://api.github.com/repos/octocat/Hello-World/pulls/1347",
    html_url: "https://github.com/octocat/Hello-World/pull/1347",
    diff_url: "https://github.com/octocat/Hello-World/pull/1347.diff",
    patch_url: "https://github.com/octocat/Hello-World/pull/1347.patch",
    issue_url: "https://api.github.com/repos/octocat/Hello-World/issues/1347",
    commits_url: "https://api.github.com/repos/octocat/Hello-World/pulls/1347/commits",
    review_comments_url: "https://api.github.com/repos/octocat/Hello-World/pulls/1347/comments",
    review_comment_url: "https://api.github.com/repos/octocat/Hello-World/pulls/comments{/number}",
    comments_url: "https://api.github.com/repos/octocat/Hello-World/issues/1347/comments",
    statuses_url: "https://api.github.com/repos/octocat/Hello-World/statuses/6dcb09b5b57875f334f61aebed695e2e4193db5e",
    number: 1347,
    state: "open",
    locked: false,
    title: "Amazing new feature",
    user: exampleUser,
    body: "Please pull these awesome changes in!",
    labels: [],
    milestone: null,
    active_lock_reason: null,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:30:00Z",
    closed_at: null,
    merged_at: null,
    merge_commit_sha: null,
    assignee: null,
    assignees: [],
    requested_reviewers: [],
    requested_teams: [],
    head: {
      label: "octocat:new-feature",
      ref: "new-feature",
      sha: "6dcb09b5b57875f334f61aebed695e2e4193db5e",
      user: exampleUser,
      repo: exampleRepository,
    },
    base: {
      label: "octocat:main",
      ref: "main",
      sha: "6dcb09b5b57875f334f61aebed695e2e4193db5f",
      user: exampleUser,
      repo: exampleRepository,
    },
    _links: {
      self: {
        href: "https://api.github.com/repos/octocat/Hello-World/pulls/1347",
      },
      html: {
        href: "https://github.com/octocat/Hello-World/pull/1347",
      },
      issue: {
        href: "https://api.github.com/repos/octocat/Hello-World/issues/1347",
      },
      comments: {
        href: "https://api.github.com/repos/octocat/Hello-World/issues/1347/comments",
      },
      review_comments: {
        href: "https://api.github.com/repos/octocat/Hello-World/pulls/1347/comments",
      },
      review_comment: {
        href: "https://api.github.com/repos/octocat/Hello-World/pulls/comments{/number}",
      },
      commits: {
        href: "https://api.github.com/repos/octocat/Hello-World/pulls/1347/commits",
      },
      statuses: {
        href: "https://api.github.com/repos/octocat/Hello-World/statuses/6dcb09b5b57875f334f61aebed695e2e4193db5e",
      },
    },
    author_association: "OWNER",
    auto_merge: null,
    draft: false,
    merged: false,
    mergeable: true,
    rebaseable: true,
    mergeable_state: "clean",
    merged_by: null,
    comments: 10,
    review_comments: 0,
    maintainer_can_modify: false,
    commits: 3,
    additions: 100,
    deletions: 3,
    changed_files: 5,
  },
};





export const pullsListExamplePayload = {
  data: [
    pullsCreateExamplePayload.data,
    {
      id: 2,
      node_id: "MDExOlB1bGxSZXF1ZXN0Mg==",
      url: "https://api.github.com/repos/octocat/Hello-World/pulls/1348",
      html_url: "https://github.com/octocat/Hello-World/pull/1348",
      number: 1348,
      state: "closed",
      locked: false,
      title: "Fix bug in authentication",
      user: exampleUser,
      body: "This fixes the authentication issue reported in #1347",
      created_at: "2024-01-10T09:00:00Z",
      updated_at: "2024-01-14T15:30:00Z",
      closed_at: "2024-01-14T15:30:00Z",
      merged_at: "2024-01-14T15:30:00Z",
      head: {
        label: "octocat:fix-auth",
        ref: "fix-auth",
        sha: "6dcb09b5b57875f334f61aebed695e2e4193db5g",
      },
      base: {
        label: "octocat:main",
        ref: "main",
        sha: "6dcb09b5b57875f334f61aebed695e2e4193db5f",
      },
      draft: false,
      merged: true,
      mergeable: null,
      mergeable_state: "unknown",
      comments: 3,
      commits: 2,
      additions: 45,
      deletions: 12,
      changed_files: 3,
    },
  ],
};









export const usersGetByUsernameExamplePayload = {
  data: {
    login: "octocat",
    id: 1,
    node_id: "MDQ6VXNlcjE=",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/octocat",
    html_url: "https://github.com/octocat",
    followers_url: "https://api.github.com/users/octocat/followers",
    following_url: "https://api.github.com/users/octocat/following{/other_user}",
    gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
    starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
    organizations_url: "https://api.github.com/users/octocat/orgs",
    repos_url: "https://api.github.com/users/octocat/repos",
    events_url: "https://api.github.com/users/octocat/events{/privacy}",
    received_events_url: "https://api.github.com/users/octocat/received_events",
    type: "User",
    site_admin: false,
    name: "The Octocat",
    company: "@github",
    blog: "https://github.blog",
    location: "San Francisco",
    email: null,
    hireable: null,
    bio: "There once was...",
    twitter_username: null,
    public_repos: 8,
    public_gists: 8,
    followers: 5901,
    following: 9,
    created_at: "2008-01-14T04:33:35Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
};





export const orgsListForAuthenticatedUserExamplePayload = {
  data: [
    {
      login: "github",
      id: 1,
      node_id: "MDEyOk9yZ2FuaXphdGlvbjE=",
      url: "https://api.github.com/orgs/github",
      repos_url: "https://api.github.com/orgs/github/repos",
      events_url: "https://api.github.com/orgs/github/events",
      hooks_url: "https://api.github.com/orgs/github/hooks",
      issues_url: "https://api.github.com/orgs/github/issues",
      members_url: "https://api.github.com/orgs/github/members{/member}",
      public_members_url: "https://api.github.com/orgs/github/public_members{/member}",
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      description: "How people build software",
    },
    {
      login: "octocat-org",
      id: 2,
      node_id: "MDEyOk9yZ2FuaXphdGlvbjI=",
      url: "https://api.github.com/orgs/octocat-org",
      repos_url: "https://api.github.com/orgs/octocat-org/repos",
      events_url: "https://api.github.com/orgs/octocat-org/events",
      hooks_url: "https://api.github.com/orgs/octocat-org/hooks",
      issues_url: "https://api.github.com/orgs/octocat-org/issues",
      members_url: "https://api.github.com/orgs/octocat-org/members{/member}",
      public_members_url: "https://api.github.com/orgs/octocat-org/public_members{/member}",
      avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
      description: "Octocat's projects",
    },
  ],
};









export const gitCreateBlobExamplePayload = {
  data: {
    sha: "3a0f86fb8db8eea7ccbb9a95f325ddbedfb25e15",
    url: "https://api.github.com/repos/octocat/Hello-World/git/blobs/3a0f86fb8db8eea7ccbb9a95f325ddbedfb25e15",
  },
};





export const gitCreateRefExamplePayload = {
  data: {
    ref: "refs/heads/feature-branch",
    node_id: "MDM6UmVmcmVmcy9oZWFkcy9mZWF0dXJlLWJyYW5jaA==",
    url: "https://api.github.com/repos/octocat/Hello-World/git/refs/heads/feature-branch",
    object: {
      type: "commit",
      sha: "aa218f56b14c9653891f9e74264a383fa43fefbd",
      url: "https://api.github.com/repos/octocat/Hello-World/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd",
    },
  },
};





export const gitGetRefExamplePayload = {
  data: {
    ref: "refs/heads/main",
    node_id: "MDM6UmVmcmVmcy9oZWFkcy9tYWlu",
    url: "https://api.github.com/repos/octocat/Hello-World/git/refs/heads/main",
    object: {
      type: "commit",
      sha: "aa218f56b14c9653891f9e74264a383fa43fefbd",
      url: "https://api.github.com/repos/octocat/Hello-World/git/commits/aa218f56b14c9653891f9e74264a383fa43fefbd",
    },
  },
};





export const gitCreateTreeExamplePayload = {
  data: {
    sha: "cd8274d15fa3ae2ab983129fb037999f264ba9a7",
    url: "https://api.github.com/repos/octocat/Hello-World/git/trees/cd8274d15fa3ae2ab983129fb037999f264ba9a7",
    tree: [
      {
        path: "file.rb",
        mode: "100644",
        type: "blob",
        size: 132,
        sha: "7c258a9869f33c1e1e1f74fbb32f07c86cb5a75b",
        url: "https://api.github.com/repos/octocat/Hello-World/git/blobs/7c258a9869f33c1e1e1f74fbb32f07c86cb5a75b",
      },
    ],
    truncated: false,
  },
};










export const actionsCreateWorkflowDispatchExamplePayload = {
  data: {},
};









export const rawRequestExamplePayload = {
  data: {
    message: "Example response from custom API endpoint",
  },
};
















export const pollChangesTriggerExamplePayload: { payload: TriggerPayload } = {
  payload: {
    headers: {},
    queryParameters: {},
    rawBody: { data: null },
    body: {
      data: {
        created: [
          {
            id: 2147483647,
            number: 142,
            title: "Add dark mode toggle",
            state: "open",
            html_url: "https://github.com/octocat/Hello-World/issues/142",
            created_at: "2026-05-26T14:30:00Z",
            updated_at: "2026-05-26T14:30:00Z",
          },
        ],
        updated: [
          {
            id: 2147480000,
            number: 87,
            title: "Fix pagination off-by-one",
            state: "closed",
            html_url: "https://github.com/octocat/Hello-World/pull/87",
            created_at: "2026-04-12T09:00:00Z",
            updated_at: "2026-05-26T15:45:00Z",
            pull_request: {
              url: "https://api.github.com/repos/octocat/Hello-World/pulls/87",
              merged_at: "2026-05-26T15:45:00Z",
            },
          },
        ],
      },
    },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
  },
};
