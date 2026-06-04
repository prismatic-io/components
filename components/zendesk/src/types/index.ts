import type { Connection } from "@prismatic-io/spectral";

export interface CreateClientProps {
  zendeskConnection: Connection;
  username?: string;
  debug?: boolean | undefined;
}

export interface User {
  id: string;
  name: string;
}

export interface Ticket {
  assignee_id: number;
  collaborator_ids: number[];
  created_at: string;
  custom_fields: CustomField[];
  custom_status_id: number;
  description: string;
  due_at: null;
  external_id: string;
  follower_ids: number[];
  from_messaging_channel: boolean;
  group_id: number;
  has_incidents: boolean;
  id: number;
  organization_id: number;
  priority: string;
  problem_id: number;
  raw_subject: string;
  recipient: string;
  requester_id: number;
  satisfaction_rating: SatisfactionRating;
  sharing_agreement_ids: number[];
  status: string;
  subject: string;
  submitter_id: number;
  tags: string[];
  type: string;
  updated_at: string;
  url: string;
  via: Via;
}

export interface CustomField {
  id: number;
  value: string;
}

export interface SatisfactionRating {
  comment: string;
  id: number;
  score: string;
}

export interface Via {
  channel: string;
}

export interface Article {
  author_id: number;
  body: string;
  comments_disabled: boolean;
  content_tag_ids?: number[];
  created_at: string;
  draft: boolean;
  edited_at: string;
  html_url?: string;
  id: number;
  label_names?: string[];
  locale: string;
  outdated_locales?: string[];
  permission_group_id?: number;
  position?: number;
  promoted: boolean;
  section_id?: number;
  source_locale: string;
  title: string;
  updated_at: string;
  url: string;
  user_segment_id?: number;
  vote_count?: number;
  vote_sum?: number;
}

interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

interface Meta {
  has_more: boolean;
  after_cursor: string;
  before_cursor: string;
}

export type PaginatedResponse<T> = Record<string, T[]> & { meta: Meta } & {
  links: Links;
};

export interface ArticleAttachments {
  article_attachments: ArticleAttachment[];
}

export interface ArticleAttachment {
  article_id: number;
  content_type: string;
  content_url: string;
  file_name: string;
  id: number;
  inline: boolean;
  size: number;
}

export interface Section {
  id: number;
  description: string;
  locale: string;
  name: string;
  position?: number;
  category_id?: number;
}

export interface Category {
  description: string;
  id: number;
  locale: string;
  name: string;
}

export interface Tag {
  count: number;
  name: string;
}

export interface Topic {
  id: number;
  manageable_by?: string;
  position?: number;
  user_segment_id?: number;
  description?: string;
  name: string;
  html_url?: string;
  url?: string;
}

export interface Post {
  author_id?: number;
  closed?: boolean;
  comment_count?: number;
  content_tag_ids?: number[];
  created_at?: string;
  details?: string;
  featured?: boolean;
  follower_count?: number;
  html_url?: string;
  id: number;
  non_author_editor_id?: number;
  non_author_updated_at?: string;
  pinned?: boolean;
  status?: string;
  title: string;
  topic_id?: number;
  updated_at?: string;
  url?: string;
  vote_count?: number;
  vote_sum?: number;
}

export interface Subscription {
  contet_id?: number;
  content_type?: string;
  created_at?: string;
  id: number;
  locale: string;
  updated_at?: string;
  user_id?: number;
  include_comments?: boolean;
  source_locale?: string;
  url?: string;
}

export interface SubscriptionResponse {
  subscription: Subscription;
}

export interface ZendeskConnectionProps {
  username: string;
  token: string;
  remoteUri: string;
  subdomain: string;
  oauth: boolean;
}

export interface UserSegment {
  id: string;
  name: string;
  built_in: boolean;
  created_at: string;
  group_ids: number[];
  or_tags: unknown[];
  organization_ids: number[];
  tags: string[];
  updated_at: string;
  user_type: string;
}

export interface PermissionGroup {
  id: number;
  name: string;
  built_in: boolean;
  publish: number[];
  edit: unknown[];
  created_at: string;
  updated_at: string;
}

export interface PollingState extends Record<string, unknown> {
  afterCursor?: string;
  lastPolledAt?: string;
}

export interface IncrementalTicketsResponse {
  tickets: Ticket[];
  after_cursor: string;
  after_url: string;
  end_of_stream: boolean;
  before_cursor?: string;
  before_url?: string;
  count?: number;
}
