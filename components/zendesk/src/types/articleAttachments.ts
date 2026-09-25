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
