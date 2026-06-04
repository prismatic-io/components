import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";

export interface Board {
  id: string;
  created: string;
  isPrivate: boolean;
  name: string;
  postCount: number;
  privateComments: boolean;
  token: string;
  url: string;
}

export interface Post {
  id: string;
  author: User | null;
  board: Board;
  by: User | null;
  category: Category | null;
  commentCount: number;
  created: string;
  customFields: Record<string, unknown>;
  details: string;
  eta: string;
  etaPublic: boolean;
  imageURLs: string[];
  jira: { linkedIssues: unknown[] };
  mergeHistory: unknown[];
  owner: User | null;
  score: number;
  status: string;
  statusChangedAt: string;
  tags: Tag[];
  title: string;
  url: string;
}

export interface Comment {
  id: string;
  author: User;
  board: Board;
  created: string;
  imageURLs: string[];
  internal: boolean;
  likeCount: number;
  mentions: User[];
  parentID: string | null;
  post: Post;
  private: boolean;
  value: string;
}

export interface Vote {
  id: string;
  board: Board;
  by: User | null;
  created: string;
  post: Post;
  voter: User;
}

export interface Category {
  id: string;
  board: Board;
  created: string;
  name: string;
  parentID: string | null;
  postCount: number;
  url: string;
}

export interface Tag {
  id: string;
  board: Board;
  created: string;
  name: string;
  postCount: number;
  url: string;
}

export interface User {
  id: string;
  created: string;
  email: string;
  isAdmin: boolean;
  name: string;
  url: string;
  userID: string;
}

export interface Company {
  id: string;
  created: string;
  customFields: Record<string, unknown>;
  domain: string;
  memberCount: number;
  monthlySpend: number;
  name: string;
  urlName: string;
}

export interface StatusChange {
  id: string;
  changeComment: { imageURLs: string[]; value: string } | null;
  changer: User;
  created: string;
  newStatus: string;
  oldStatus: string;
  post: Post;
}

export interface Entry {
  id: string;
  created: string;
  labels: unknown[];
  lastSaved: string;
  markdownDetails: string;
  plaintextDetails: string;
  posts: unknown[];
  publishedAt: string | null;
  scheduledFor: string | null;
  status: string;
  title: string;
  types: string[];
  url: string;
}

export interface CannyClient {
  post: <T = unknown>(
    path: string,
    body?: Record<string, unknown>,
  ) => Promise<T>;
  postV2: <T = unknown>(
    path: string,
    body?: Record<string, unknown>,
  ) => Promise<T>;
  apiKey: string;
  httpClient: HttpClient;
}

export type OffsetResult<K extends string, T> = { [P in K]: T[] } & {
  hasMore: boolean;
};

export type CursorResult<K extends string, T> = { [P in K]: T[] } & {
  hasNextPage: boolean;
  cursor: string;
};
