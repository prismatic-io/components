import type {
  ISSUE_STATES,
  MERGE_REQUEST_STATES,
  MILESTONE_STATES,
  PIPELINE_STATUSES,
} from "../constants";

type IssueState = (typeof ISSUE_STATES)[number];
type MergeRequestState = (typeof MERGE_REQUEST_STATES)[number];
type MilestoneState = (typeof MILESTONE_STATES)[number];
type PipelineStatus = (typeof PIPELINE_STATUSES)[number];

export interface GitlabRecord {
  id: number;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface Commit {
  id: string;
  short_id: string;
  title: string;
  message: string;
  [key: string]: unknown;
}

export interface User {
  id: number;
  username: string;
  name: string;
  state: string;
  avatar_url: string | null;
  web_url: string;
}

export interface Branch {
  name: string;
  commit: Commit;
  [key: string]: unknown;
}

export interface Group extends GitlabRecord {
  name: string;
  full_path: string;
}

export interface Issue extends GitlabRecord {
  iid: number;
  project_id: number;
  title: string;
  state: IssueState;
}

export interface Label {
  id: number;
  name: string;
  color: string;
  description: string | null;
}

export interface Member extends User {
  access_level: number;
}

export interface MergeRequest extends GitlabRecord {
  iid: number;
  project_id: number;
  title: string;
  state: MergeRequestState;
  source_branch: string;
  target_branch: string;
}

export interface Milestone extends GitlabRecord {
  iid: number;
  title: string;
  state: MilestoneState;
}

export interface Note extends GitlabRecord {
  body: string;
}

export interface Pipeline extends GitlabRecord {
  status: PipelineStatus;
  ref: string;
}

export interface Project extends GitlabRecord {
  name: string;
  path_with_namespace: string;
  default_branch: string | null;
  web_url: string;
}

export interface ProjectHook {
  id: number;
  url: string;
  project_id: number;
  [key: string]: unknown;
}
