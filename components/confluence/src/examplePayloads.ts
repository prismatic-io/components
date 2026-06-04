




export const getAttachmentExamplePayload = {
  id: "att456712389",
  status: "current",
  title: "architecture-diagram.png",
  createdAt: "2024-11-15T09:23:45.000Z",
  pageId: "98765432",
  blogPostId: "67891234",
  customContentId: "cc-112233",
  mediaType: "image/png",
  mediaTypeDescription: "PNG Image",
  comment: "Updated architecture diagram for Q4 review",
  fileId: "fid-a1b2c3d4e5f6",
  fileSize: 28,
  webuiLink: "/spaces/ENG/pages/98765432/architecture-diagram.png",
  downloadLink: "/download/attachments/98765432/architecture-diagram.png",
  version: {
    createdAt: "2024-11-15T09:23:45.000Z",
    message: "Updated with latest service boundaries",
    number: 19,
    minorEdit: true,
    authorId: "5b10a2844c20165700ede21g",
  },
  _links: {
    webui: "/spaces/ENG/pages/98765432/architecture-diagram.png",
    download: "/download/attachments/98765432/architecture-diagram.png",
  },
};






export const listAttachmentsExamplePayload = {
  results: [getAttachmentExamplePayload, getAttachmentExamplePayload],
  _links: {
    next: "/api/v2/attachments?cursor=eyJpZCI6IjEyMzQ1Njc4OTAiLCJjb250ZW50T3JkZXIiOiJpZCJ9",
  },
};






export const getPageExamplePayload = {
  id: "98765432",
  status: "current",
  title: "Engineering Onboarding Guide",
  spaceId: "65789012",
  parentId: "11223344",
  parentType: "page",
  position: 57,
  authorId: "5b10a2844c20165700ede21g",
  ownerId: "5b10a2844c20165700ede21g",
  lastOwnerId: "5b10ac8d82e05b22cc7d4ef5",
  createdAt: "2024-08-20T14:30:00.000Z",
  version: {
    createdAt: "2024-11-15T09:23:45.000Z",
    message: "Added new section on CI/CD pipeline setup",
    number: 19,
    minorEdit: true,
    authorId: "5b10a2844c20165700ede21g",
  },
  body: {
    storage: {
      representation: "storage",
      value: "<p>Welcome to the Engineering team! This guide covers...</p>",
    },
    atlas_doc_format: {
      representation: "atlas_doc_format",
      value:
        '{"version":1,"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Welcome to the Engineering team!"}]}]}',
    },
    view: {
      representation: "view",
      value: "<p>Welcome to the Engineering team! This guide covers...</p>",
    },
  },
  _links: {
    webui: "/spaces/ENG/pages/98765432/Engineering+Onboarding+Guide",
    editui: "/pages/resumedraft.action?draftId=98765432",
    tinyui: "/x/ABCDEF",
  },
};






export const listPagesExamplePayload = {
  results: [getPageExamplePayload, getPageExamplePayload],
  _links: {
    next: "/api/v2/pages?cursor=eyJpZCI6Ijk4NzY1NDMyIiwiY29udGVudE9yZGVyIjoiaWQifQ",
  },
};






export const getSpaceExamplePayload = {
  id: "65789012",
  key: "ENG",
  name: "Engineering",
  type: "global",
  status: "current",
  authorId: "5b10a2844c20165700ede21g",
  createdAt: "2023-01-10T08:00:00.000Z",
  homepageId: "11223344",
  description: {
    plain: {
      representation: "plain",
      value: "Engineering team documentation and knowledge base",
    },
    view: {
      representation: "view",
      value: "<p>Engineering team documentation and knowledge base</p>",
    },
  },
  icon: {
    path: "/wiki/images/logo/default-space-logo-256.png",
    apiDownloadLink: "/wiki/download/attachments/65789012/space-logo.png",
  },
  _links: { webui: "/spaces/ENG" },
};






export const listSpacesExamplePayload = {
  results: [getSpaceExamplePayload, getSpaceExamplePayload],
  _links: {
    next: "/api/v2/spaces?cursor=eyJpZCI6IjY1Nzg5MDEyIiwiY29udGVudE9yZGVyIjoiaWQifQ",
  },
};






export const getContentPropertyExamplePayload = {
  id: "prop-998877",
  key: "metadata.source",
  version: {
    createdAt: "2024-11-15T09:23:45.000Z",
    message: "Updated metadata source property",
    number: 19,
    minorEdit: true,
    authorId: "5b10a2844c20165700ede21g",
  },
};






export const listContentPropertiesExamplePayload = {
  results: [getContentPropertyExamplePayload, getContentPropertyExamplePayload],
  _links: {
    next: "/api/v2/attachments/att456712389/properties?cursor=eyJpZCI6InByb3AtOTk4ODc3In0",
  },
};
