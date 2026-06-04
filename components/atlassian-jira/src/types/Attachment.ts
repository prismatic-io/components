export interface Attachment {
  id: number;
  mimeType: string;
}

export interface AttachmentResponse {
  data: Buffer;
  contentType: string;
}
