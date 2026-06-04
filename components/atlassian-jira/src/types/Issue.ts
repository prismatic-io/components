export interface Issue {
  fields: IssueFields;
  id: string;
  key: string;
  self: string;
}

export interface IssueFields {
  watcher: Watcher;
  attachment: Attachment[];
  "sub-tasks": Issuelink[];
  description: Description;
  project: Project;
  comment: Comment[];
  issuelinks: Issuelink[];
  worklog: Worklog[];
  updated: number;
  timetracking: Timetracking;
}

export interface Attachment {
  author: AttachmentAuthor;
  content: string;
  created: string;
  filename: string;
  id: number;
  mimeType: string;
  self: string;
  size: number;
  thumbnail: string;
}

export interface AttachmentAuthor {
  accountId: string;
  accountType: string;
  active: boolean;
  avatarUrls: AvatarUrls;
  displayName: string;
  key: string;
  name: string;
  self: string;
}

export interface AvatarUrls {
  "16x16": string;
  "24x24": string;
  "32x32": string;
  "48x48": string;
}

export interface Comment {
  author: UpdateAuthorClass;
  body: Description;
  created: string;
  id: string;
  self: string;
  updateAuthor: UpdateAuthorClass;
  updated: string;
  visibility: Visibility;
}

export interface UpdateAuthorClass {
  accountId: string;
  active: boolean;
  displayName: string;
  self: string;
}

export interface Description {
  type: string;
  version: number;
  content: DescriptionContent[];
}

export interface DescriptionContent {
  type: string;
  content: ContentContent[];
}

export interface ContentContent {
  type: string;
  text: string;
}

export interface Visibility {
  identifier: string;
  type: string;
  value: string;
}

export interface Issuelink {
  id: string;
  outwardIssue?: WardIssue;
  type: Type;
  inwardIssue?: WardIssue;
}

export interface WardIssue {
  fields: InwardIssueFields;
  id: string;
  key: string;
  self: string;
}

export interface InwardIssueFields {
  status: Status;
}

export interface Status {
  iconUrl: string;
  name: string;
}

export interface Type {
  id: string;
  inward: string;
  name: string;
  outward: string;
}

export interface Project {
  avatarUrls: AvatarUrls;
  id: string;
  insight: Insight;
  key: string;
  name: string;
  projectCategory: ProjectCategory;
  self: string;
  simplified: boolean;
  style: string;
}

export interface Insight {
  lastIssueUpdateTime: string;
  totalIssueCount: number;
}

export interface ProjectCategory {
  description: string;
  id: string;
  name: string;
  self: string;
}

export interface Timetracking {
  originalEstimate: string;
  originalEstimateSeconds: number;
  remainingEstimate: string;
  remainingEstimateSeconds: number;
  timeSpent: string;
  timeSpentSeconds: number;
}

export interface Watcher {
  isWatching: boolean;
  self: string;
  watchCount: number;
}

export interface Worklog {
  author: UpdateAuthorClass;
  comment: Description;
  id: string;
  issueId: string;
  self: string;
  started: string;
  timeSpent: string;
  timeSpentSeconds: number;
  updateAuthor: UpdateAuthorClass;
  updated: string;
  visibility: Visibility;
}
