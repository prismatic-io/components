import type { Attachment } from "@microsoft/microsoft-graph-types";
import type { AttachmentDownload, ODataAttrs, PaginatedResponse } from "../types";

export const listMessageAttachmentsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users('bb8775a4-4d8c-42cf-a1d4-4d58c2bb668f')/messages('AAMkAGUAAAwTW09AAA%3D')/attachments(id,name,contentType,size,isInline,lastModifiedDateTime)",
    value: [
      {
        "@odata.type": "#microsoft.graph.fileAttachment",
        id: "AAMkADI5MAAIT3drCAAABEgAQANAqbAe7qaROhYdTnUQwXm0=",
        name: "quarterly-report.pdf",
        contentType: "application/pdf",
        size: 48213,
        isInline: false,
        lastModifiedDateTime: "2026-10-19T14:32:10Z",
      },
      {
        "@odata.type": "#microsoft.graph.itemAttachment",
        id: "AAMkADI5MAAIT3drCAAABEgAQAMkpJI_X-LBFgvrv1PlZYd8=",
        name: "Re: Kickoff agenda",
        contentType: null,
        size: 12804,
        isInline: false,
        lastModifiedDateTime: "2026-10-19T14:30:02Z",
      },
    ],
  } as PaginatedResponse<Attachment & ODataAttrs>,
};

export const downloadMessageAttachmentExamplePayload: AttachmentDownload = {
  data: Buffer.from("example file content"),
  contentType: "application/pdf",
};

export const listEventAttachmentsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users('bb8775a4-4d8c-42cf-a1d4-4d58c2bb668f')/events('AAMkAGIAAAoZDOFAAA%3D')/attachments(id,name,contentType,size,isInline,lastModifiedDateTime)",
    value: [
      {
        "@odata.type": "#microsoft.graph.fileAttachment",
        id: "AAMkAGI1AAAoZDOFAAABEgAQAMkpJI_X-LBFgvrv1PlZYd8=",
        name: "agenda.docx",
        contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        size: 17406,
        isInline: false,
        lastModifiedDateTime: "2026-10-20T09:15:44Z",
      },
    ],
  } as PaginatedResponse<Attachment & ODataAttrs>,
};

export const downloadEventAttachmentExamplePayload: AttachmentDownload = {
  data: Buffer.from("example file content"),
  contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export const selectMessageAttachmentExamplePayload = {
  result: [
    { label: "quarterly-report.pdf", key: "AAMkADI5MAAIT3drCAAABEgAQANAqbAe7qaROhYdTnUQwXm0=" },
  ],
};

export const selectEventAttachmentExamplePayload = {
  result: [{ label: "agenda.docx", key: "AAMkAGI1AAAoZDOFAAABEgAQAMkpJI_X-LBFgvrv1PlZYd8=" }],
};
