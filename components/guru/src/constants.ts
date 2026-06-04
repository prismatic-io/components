export const BASE_URL = "https://api.getguru.com/api/v1";

export const SHARE_STATUS = [
  { label: "TEAM", value: "TEAM" },
  { label: "PRIVATE", value: "PRIVATE" },
];

export const VERIFICATION_STATUS = [
  { label: "Verified", value: "VERIFIED" },
  { label: "Needs Update", value: "NEEDS_UPDATE" },
  { label: "Invalid", value: "INVALID" },
];

export const WEBHOOK_EVENT_TYPES = [
  { label: "Alert Read", value: "alert-read" },
  { label: "API Token Created", value: "api-token-created" },
  { label: "API Token Deleted", value: "api-token-deleted" },
  { label: "Board Created", value: "board-created" },
  { label: "Board Updated", value: "board-updated" },
  { label: "Board Deleted", value: "board-deleted" },
  { label: "Board Viewed", value: "board-viewed" },
  { label: "Board to PDF", value: "board-to-pdf" },
  { label: "Card Created", value: "card-created" },
  { label: "Card Updated", value: "card-updated" },
  { label: "Card Deleted", value: "card-deleted" },
  { label: "Card Restored", value: "card-restored" },
  { label: "Card Viewed", value: "card-viewed" },
  { label: "Card Verified", value: "card-verified" },
  { label: "Card Favorited", value: "card-favorited" },
  { label: "Card Unfavorited", value: "card-unfavorited" },
  { label: "Card Shared to Team", value: "card-shared-to-team" },
  { label: "Card Unshared", value: "card-unshared" },
  { label: "Card Copied", value: "card-copied" },
  { label: "Card Copied (Tracking)", value: "card-copied-tracking" },
  { label: "Card to PDF", value: "card-to-pdf" },
  { label: "Card Link Copied", value: "card-link-copied" },
  { label: "Card Link Viewed", value: "card-link-viewed" },
  { label: "Card Sync Link Copied", value: "card-sync-link-copied" },
  { label: "Card File Link Viewed", value: "card-file-link-viewed" },
  { label: "Card Added to Board", value: "card-added-to-board" },
  { label: "Card Comment Created", value: "card-comment-created" },
  { label: "Card Comment Updated", value: "card-comment-updated" },
  { label: "Card Comment Deleted", value: "card-comment-deleted" },
  { label: "Card Comment Resolved", value: "card-comment-resolved" },
  { label: "Card Comment Reopened", value: "card-comment-reopened" },
  { label: "Collection Created", value: "collection-created" },
  { label: "Collection Deleted", value: "collection-deleted" },
  { label: "Collection Exported", value: "collection-exported" },
  { label: "Draft Created", value: "draft-created" },
  { label: "Draft Deleted", value: "draft-deleted" },
  { label: "Login", value: "login" },
  { label: "Question Created", value: "question-created" },
  { label: "Question Answered", value: "question-answered" },
  { label: "Question Deleted", value: "question-deleted" },
  { label: "Tag Category Created", value: "tag-category-created" },
  { label: "Tag Category Updated", value: "tag-category-updated" },
  { label: "Tag Category Deleted", value: "tag-category-deleted" },
  { label: "Tag Category Merged", value: "tag-category-merged" },
  { label: "Tag Created", value: "tag-created" },
  { label: "Tag Updated", value: "tag-updated" },
  { label: "Tag Deleted", value: "tag-deleted" },
  { label: "Tag Merged", value: "tag-merged" },
  { label: "Team Member Added", value: "team-member-added" },
  { label: "Team Member Removed", value: "team-member-removed" },
  { label: "User Group Created", value: "usergroup-created" },
  { label: "User Group Deleted", value: "usergroup-deleted" },
  { label: "User Group Member Added", value: "usergroup-member-added" },
  { label: "User Group Member Deleted", value: "usergroup-member-deleted" },
];

export const QUERY_TYPES = [
  { label: "Cards", value: "cards" },
  { label: "Questions", value: "questions" },
  { label: "Archived", value: "archived" },
  { label: "Legacy", value: "legacy" },
];

export const DELIVERY_MODE = [
  { label: "Single", value: "SINGLE" },
  { label: "Batch", value: "BATCH" },
];
