import type { V3Attachment } from "../../types/v3";

const sampleAttachment: V3Attachment = {
  id: 4949394,
  application_id: 1003961,
  candidate_id: 53883394,
  type: "resume",
  filename: "jane_doe_resume.pdf",
  url: "https://prod-heroku.s3.amazonaws.com/files/4949394/jane_doe_resume.pdf?X-Amz-Expires=604800",
  created_at: "2026-05-21T08:00:00.000Z",
  updated_at: "2026-05-21T08:00:00.000Z",
};

export const listAttachmentsV3ExamplePayload = {
  data: [sampleAttachment],
};

export const createAttachmentV3ExamplePayload = {
  data: sampleAttachment,
};

export const deleteAttachmentV3ExamplePayload = {
  data: { success: true },
};
