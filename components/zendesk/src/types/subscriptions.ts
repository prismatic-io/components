export interface Subscription {
  content_id?: number;
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
