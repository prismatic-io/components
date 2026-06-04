export const API_BASE_URL = "https://api.contentful.com";

export const API_UPLOAD_URL = "https://upload.contentful.com";

export const FIELDS_DEFAULT = [
  {
    id: "title",
    name: "Title",
    required: true,
    localized: true,
    type: "Text",
  },
  {
    id: "body",
    name: "Body",
    required: true,
    localized: true,
    type: "Text",
  },
];

export const ENTRY_TITLE_DEFAULT = { "en-US": "Hello, World!" };
export const ENTRY_BODY_DEFAULT = { "en-US": "Bacon is healthy!" };

export const ENTRY_DEFAULT = {
  fields: {
    title: ENTRY_TITLE_DEFAULT,
    body: ENTRY_BODY_DEFAULT,
  },
  metadata: {
    tags: [
      {
        sys: {
          type: "Link",
          linkType: "Tag",
          id: "nyCampaign",
        },
      },
    ],
  },
};

export const ASSET_TITLE_DEFAULT = { "en-US": "Example Asset" };

export const ASSET_DESCRIPTION_DEFAULT = {
  "en-US": "Streamliner description",
};

export const ASSET_FILE_DEFAULT = {
  "en-US": {
    contentType: "image/jpeg",
    fileName: "example.jpeg",
    upload: "https://example.com/example.jpg",
  },
};

export const BULK_ACTION_ITEMS_DEFAULT = [
  {
    sys: {
      linkType: "Entry",
      type: "Link",
      id: "<entry_id>",
      version: 2,
    },
  },
  {
    sys: {
      linkType: "Asset",
      type: "Link",
      id: "<asset_id>",
      version: 1,
    },
  },
];

export const BULK_ACTION_UNPUBLISH_ITEMS_DEFAULT = [
  { sys: { linkType: "Entry", type: "Link", id: "<entry_id>" } },
  { sys: { linkType: "Asset", type: "Link", id: "<asset_id>" } },
];

export const CONTENT_TYPE_TEMPLATES_DEFAULT = [
  {
    name: "Blogpost",
    description: "A blogpost content type",
    displayField: "title",
    fields: [
      {
        id: "title",
        name: "title",
        type: "Text",
      },
    ],
    id: "blogpost",
  },
];

export const EDITOR_INTERFACE_TEMPLATES_DEFAULT = [
  {
    contentTypeTemplate: {
      sys: {
        id: "blogpost",
        linkType: "ContentTypeTemplate",
        type: "Link",
      },
    },
    controls: [
      {
        fieldId: "title",
        widgetId: "urlEditor",
        widgetNamespace: "builtin",
        settings: {
          helpText: "help text",
        },
      },
    ],
  },
];

export const PAGINATION_LIMIT = 100;




export const MAX_POLL_PAGES = 50;

export const WEBHOOK_EVENTS = [
  { label: "Content Type Created", value: "ContentType.create" },
  { label: "Content Type Saved", value: "ContentType.save" },
  { label: "Content Type Published", value: "ContentType.publish" },
  { label: "Content Type Unpublished", value: "ContentType.unpublish" },
  { label: "Content Type Deleted", value: "ContentType.delete" },
  { label: "Content Type All", value: "ContentType.*" },
  { label: "Entry Created", value: "Entry.create" },
  { label: "Entry Saved", value: "Entry.save" },
  { label: "Entry Auto-Saved", value: "Entry.auto_save" },
  { label: "Entry Archived", value: "Entry.archive" },
  { label: "Entry Unarchived", value: "Entry.unarchive" },
  { label: "Entry Published", value: "Entry.publish" },
  { label: "Entry Unpublished", value: "Entry.unpublish" },
  { label: "Entry Deleted", value: "Entry.delete" },
  { label: "Entry All", value: "Entry.*" },
  { label: "Asset Created", value: "Asset.create" },
  { label: "Asset Saved", value: "Asset.save" },
  { label: "Asset Auto-Saved", value: "Asset.auto_save" },
  { label: "Asset Archived", value: "Asset.archive" },
  { label: "Asset Unarchived", value: "Asset.unarchive" },
  { label: "Asset Published", value: "Asset.publish" },
  { label: "Asset Unpublished", value: "Asset.unpublish" },
  { label: "Asset Deleted", value: "Asset.delete" },
  { label: "Asset All", value: "Asset.*" },
  { label: "Task Created", value: "Task.create" },
  { label: "Task Saved", value: "Task.save" },
  { label: "Task Deleted", value: "Task.delete" },
  { label: "Task All", value: "Task.*" },
  { label: "Comment Created", value: "Comment.create" },
  { label: "Comment Deleted", value: "Comment.delete" },
  { label: "Comment All", value: "Comment.*" },
  { label: "Release Created", value: "Release.create" },
  { label: "Release Saved", value: "Release.save" },
  { label: "Release Archived", value: "Release.archive" },
  { label: "Release Unarchived", value: "Release.unarchive" },
  { label: "Release Deleted", value: "Release.delete" },
  { label: "Release All", value: "Release.*" },
  { label: "Workflow Created", value: "Workflow.create" },
  { label: "Workflow Saved", value: "Workflow.save" },
  { label: "Workflow Completed", value: "Workflow.complete" },
  { label: "Workflow All", value: "Workflow.*" },
  {
    label: "Template Installation Completed",
    value: "TemplateInstallation.complete",
  },
  { label: "Template Installation All", value: "TemplateInstallation.*" },
  { label: "Bulk Action Created", value: "BulkAction.create" },
  { label: "Bulk Action Executed", value: "BulkAction.execute" },
  { label: "Bulk Action All", value: "BulkAction.*" },
  { label: "Release Action Created", value: "ReleaseAction.create" },
  { label: "Release Action Executed", value: "ReleaseAction.execute" },
  { label: "Release Action All", value: "ReleaseAction.*" },
  { label: "Scheduled Action Created", value: "ScheduledAction.create" },
  { label: "Scheduled Action Executed", value: "ScheduledAction.execute" },
  { label: "Scheduled Action Saved", value: "ScheduledAction.save" },
  { label: "Scheduled Action Deleted", value: "ScheduledAction.delete" },
  { label: "Scheduled Action All", value: "ScheduledAction.*" },
];
