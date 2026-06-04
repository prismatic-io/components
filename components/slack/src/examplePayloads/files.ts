








const fileRecord = {
  id: "F0S43P1CZ",
  created: 1531763254,
  timestamp: 1531763254,
  name: "billair.gif",
  title: "billair.gif",
  mimetype: "image/gif",
  filetype: "gif",
  pretty_type: "GIF",
  user: "U061F7AUR",
  editable: false,
  size: 144538,
  mode: "hosted",
  is_external: false,
  external_type: "",
  is_public: true,
  public_url_shared: false,
  display_as_bot: false,
  username: "",
  url_private: "https://.../billair.gif",
  url_private_download: "https://.../billair.gif",
  thumb_64: "https://.../billair_64.png",
  thumb_80: "https://.../billair_80.png",
  thumb_360: "https://.../billair_360.png",
  thumb_360_w: 176,
  thumb_360_h: 226,
  thumb_160: "https://.../billair_=_160.png",
  thumb_360_gif: "https://.../billair_360.gif",
  image_exif_rotation: 1,
  original_w: 176,
  original_h: 226,
  deanimate_gif: "https://.../billair_deanimate_gif.png",
  pjpeg: "https://.../billair_pjpeg.jpg",
  permalink: "https://.../billair.gif",
  permalink_public: "https://.../...",
  channels: ["C0T8SE4AU"],
  groups: [],
  ims: [],
  comments_count: 0,
};

export const listFilesExamplePayload = {
  ok: true,
  files: [fileRecord, fileRecord],
  paging: {
    count: 100,
    total: 2,
    page: 1,
    pages: 1,
  },
};

export const uploadFileExamplePayload = {
  ok: true,
  file: {
    id: "F0TD0GUTS",
    created: 1532294750,
    timestamp: 1532294750,
    name: "-.txt",
    title: "Untitled",
    mimetype: "text/plain",
    filetype: "text",
    pretty_type: "Plain Text",
    user: "U0L4B9NSU",
    editable: true,
    size: 11,
    mode: "snippet",
    is_external: false,
    external_type: "",
    is_public: true,
    public_url_shared: false,
    display_as_bot: false,
    username: "",
    url_private: "https://.../.txt",
    url_private_download: "https://...download/-.txt",
    permalink: "https://.../.txt",
    permalink_public: "https://.../.txt",
    edit_link: "https://.../.txt/edit",
    preview: "launch plan",
    preview_highlight:
      '<div class="CodeMirror cm-s-default CodeMirrorServer" oncopy="if(event.clipboardData){event.clipboardData.setData(\'text/plain\',window.getSelection().toString().replace(/\\u200b/g,\'\'));event.preventDefault();event.stopPropagation();}">\n<div class="CodeMirror-code">\n<div><pre>launch plan</pre></div>\n</div>\n</div>\n',
    lines: 1,
    lines_more: 0,
    preview_is_truncated: false,
    comments_count: 0,
    is_starred: false,
    shares: {
      public: {
        C061EG9SL: [
          {
            reply_users: [],
            reply_users_count: 0,
            reply_count: 0,
            ts: "1532294750.000001",
            channel_name: "general",
            team_id: "T061EG9R6",
          },
        ],
      },
    },
    channels: ["C061EG9SL"],
    groups: [],
    ims: [],
    has_rich_preview: false,
  },
};
