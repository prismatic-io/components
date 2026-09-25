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
