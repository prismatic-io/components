import { input, util } from "@prismatic-io/spectral";
import {
  cleanFile,
  cleanFunctionForLimitInput,
  cleanNumber,
  cleanString,
  cleanValueList,
  cleanValueListToEncodedString,
  cleanValueListToString,
} from "../util";
import {
  exampleTimestamp,
  postFilterByOptions,
  webhookEvents,
  zendeskLocales,
} from "../constants";

export const requesterName = input({
  label: "Requester Name",
  type: "string",
  example: "John Doe",
  placeholder: "Enter the requester's full name",
  required: true,
  comments: "The full name of the person requesting the ticket.",
  clean: util.types.toString,
});

export const requesterEmail = input({
  label: "Requester Email",
  type: "string",
  example: "John.Doe@example-email.com",
  placeholder: "Enter the requester's email address",
  required: true,
  comments: "The email address of the person requesting the ticket.",
  clean: util.types.toString,
});

export const assigneeId = input({
  label: "Assignee ID",
  type: "string",
  example: "403598029853443232",
  placeholder: "Enter the assignee user ID",
  required: false,
  comments: "The unique identifier for the user assigned to the ticket.",
  clean: cleanString,
});

export const assigneeEmail = input({
  label: "Assignee Email",
  type: "string",
  example: "Jane.Doe@example.com",
  placeholder: "Enter the assignee's email address",
  required: true,
  comments: "The email address of the user assigned to the ticket.",
  clean: util.types.toString,
});

export const recipientEmail = input({
  label: "Recipient Email",
  type: "string",
  example: "Jane.Doe@example.com",
  placeholder: "Enter the recipient's email address",
  required: false,
  comments: "The email address of the ticket recipient.",
  clean: cleanString,
});

export const ticketComment = input({
  label: "Ticket Comment Body",
  type: "string",
  example: "This is an example Comment.",
  placeholder: "Enter the ticket comment body",
  required: false,
  comments:
    "The plain text description used as the initial comment on the ticket, attributed to the assignee.",
  clean: cleanString,
});

export const ticketCommentHTML = input({
  label: "Ticket Comment HTML Body",
  type: "string",
  example: "<p>This is an example Comment.</p>",
  placeholder: "Enter the ticket comment HTML body",
  required: false,
  comments:
    "The HTML-formatted description used as the initial comment on the ticket, attributed to the assignee.",
  clean: cleanString,
});

export const ticketId = input({
  label: "Ticket ID",
  type: "string",
  example: "ExampleTicketId",
  placeholder: "Enter the ticket ID",
  required: true,
  comments: "The unique identifier for the ticket.",
  clean: cleanNumber,
  dataSource: "selectTicket",
});

export const ticketStatus = input({
  label: "Ticket Status",
  type: "string",
  required: false,
  model: [
    { label: "Closed", value: "closed" },
    { label: "Hold", value: "hold" },
    { label: "New", value: "new" },
    { label: "Open", value: "open" },
    { label: "Pending", value: "pending" },
    { label: "Solved", value: "solved" },
  ],
  comments: "The current workflow status of the ticket.",
  clean: cleanString,
});

export const tags = input({
  label: "Tags",
  type: "string",
  example: "Engineering",
  placeholder: "Enter a tag",
  required: false,
  collection: "valuelist",
  comments: "The list of tags to attach to the resource.",
});

export const ticketType = input({
  label: "Ticket Type",
  type: "string",
  required: false,
  model: [
    { label: "Incident", value: "Incident" },
    { label: "Problem", value: "Problem" },
    { label: "Question", value: "Question" },
    { label: "Task", value: "Task" },
  ],
  comments: "The classification of the ticket.",
  clean: cleanString,
});

export const ticketSubject = input({
  label: "Ticket Subject",
  type: "string",
  required: false,
  example: "This is an example ticket subject.",
  placeholder: "Enter the ticket subject",
  comments: "The summary line shown at the top of the ticket.",
  clean: cleanString,
});

export const ticketPriority = input({
  label: "Ticket Priority",
  type: "string",
  required: false,
  model: [
    { label: "High", value: "high" },
    { label: "Low", value: "low" },
    { label: "Normal", value: "normal" },
    { label: "Urgent", value: "urgent" },
  ],
  comments: "The urgency level assigned to the ticket.",
  clean: cleanString,
});

export const requesterOrganization = input({
  label: "Requester Organization ID",
  type: "string",
  required: false,
  example: "488042375842",
  placeholder: "Enter the organization ID",
  comments:
    "The unique identifier for the organization the requester belongs to.",
  clean: cleanString,
});

export const followers = input({
  label: "Followers",
  type: "string",
  required: false,
  example: "488042375842",
  placeholder: "Enter a follower user ID",
  collection: "valuelist",
  comments: "The list of user IDs to add as followers on the issue.",
});

export const userId = input({
  label: "User ID",
  type: "string",
  required: false,
  example: "488042375842",
  placeholder: "Enter the user ID",
  comments: "The unique identifier for the user.",
  clean: cleanNumber,
  dataSource: "selectUser",
});

export const userRole = input({
  label: "User Role",
  type: "string",
  required: false,
  comments: "The permission level granted to the user.",
  model: [
    { label: "Admin", value: "admin" },
    { label: "Agent", value: "agent" },
    { label: "End User", value: "end-user" },
  ],
  clean: cleanString,
});

export const userEmail = input({
  label: "Email Address",
  type: "string",
  required: true,
  comments:
    "The email address for the user. Must be unique within the Zendesk domain.",
  example: "someone@example.com",
  placeholder: "Enter the user's email address",
  clean: util.types.toString,
});

export const userName = input({
  label: "Name",
  type: "string",
  required: true,
  comments: "The full name of the user.",
  example: "John Doe",
  placeholder: "Enter the user's full name",
  clean: util.types.toString,
});

export const userPhone = input({
  label: "Phone Number",
  type: "string",
  required: false,
  comments: "The phone number associated with the user.",
  example: "15554008989",
  placeholder: "Enter the phone number",
  clean: cleanString,
});

export const userNotes = input({
  label: "Notes",
  type: "string",
  required: false,
  comments: "Free-form notes attached to the user record, visible to agents.",
  example: "These are some example notes.",
  placeholder: "Enter notes for the user",
  clean: cleanString,
});

export const userDetails = input({
  label: "Details",
  type: "string",
  required: false,
  comments:
    "Additional details attached to the user record, visible to agents.",
  example: "These are some example user details",
  placeholder: "Enter details for the user",
  clean: cleanString,
});

export const isModerator = input({
  label: "Moderator",
  type: "boolean",
  required: false,
  comments: "When true, the user is granted moderator permissions.",
  clean: util.types.toBool,
});

export const userAlias = input({
  label: "Alias",
  type: "string",
  required: false,
  comments: "The display alias shown for the user instead of the real name.",
  example: "Example Alias",
  placeholder: "Enter an alias for the user",
  clean: cleanString,
});

export const userTimeZone = input({
  label: "Time Zone",
  type: "string",
  required: false,
  comments: "The time zone the user operates in.",
  example: "Berlin",
  placeholder: "Enter the user's time zone",
  clean: cleanString,
});

export const userExternalIdInput = input({
  label: "External ID",
  type: "string",
  required: false,
  placeholder: "Enter the external ID",
  comments:
    'A unique identifier from another system. The API treats the ID as case sensitive — for example, "ian1" and "Ian1" are different users.',
  clean: cleanString,
});

export const userQueryInput = input({
  label: "Query",
  type: "string",
  required: false,
  placeholder: "Enter the search query",
  comments:
    'The search query supporting Zendesk search syntax. Accepts a partial or full value of any user property, including name, email address, notes, or phone. Example: query="jdoe".',
  clean: cleanString,
});

export const isVerified = input({
  label: "Verified",
  type: "boolean",
  required: false,
  comments:
    "When true, marks at least one of the user's identities as verified.",
  clean: util.types.toBool,
});

export const organizationId = input({
  label: "Organization ID",
  type: "string",
  required: false,
  placeholder: "Enter the organization ID",
  comments: "The unique identifier for the organization.",
  clean: cleanString,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Zendesk connection to use.",
});

export const webhookEventsInput = input({
  label: "Events",
  type: "string",
  required: true,
  collection: "valuelist",
  model: webhookEvents.map((event) => ({ label: event, value: event })),
  comments: "The list of events that trigger the webhook to fire.",
});

export const externalId = input({
  label: "External ID",
  type: "string",
  required: false,
  placeholder: "Enter the external ID",
  comments: "The identifier for the issue from an external system.",
  clean: cleanString,
});

export const file = input({
  label: "File",
  type: "data",
  required: false,
  comments:
    "The file contents to attach to the comment, accepted as either a string or a binary payload.",
  clean: cleanFile,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: false,
  placeholder: "Enter the file name",
  comments: "The display name to use for the uploaded file.",
  clean: cleanString,
});

export const locale = input({
  label: "Locale",
  type: "string",
  required: true,
  comments: "The locale code for the resource.",
  default: "en-us",
  model: zendeskLocales.map((locale) => ({ label: locale, value: locale })),
  clean: util.types.toString,
});

export const pageLimit = input({
  label: "Page Limit",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter the page size",
  comments:
    "The number of results to return per page. The maximum is 100; any greater value is capped at 100.",
  clean: cleanFunctionForLimitInput,
});

export const cursor = input({
  label: "Pagination Cursor",
  type: "string",
  required: false,
  example: "aQAAAAAAAAAAZPPgaGUAAAAAaZo+HCjcBQAA",
  placeholder: "Enter the pagination cursor",
  comments:
    "The pagination cursor from a previous request. If omitted, the first page is returned.",
  clean: cleanString,
});

export const sortBy = input({
  label: "Sort By",
  type: "string",
  required: false,
  placeholder: "Enter the field name to sort by",
  comments: "The field used to sort the results.",
  clean: cleanString,
});

export const sortOrder = input({
  label: "Sort Order",
  type: "string",
  required: false,
  example: "asc",
  placeholder: "asc",
  model: [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ],
  comments: "The direction used to order the results.",
  clean: cleanString,
});

export const articleLabels = input({
  label: "Label Names",
  type: "string",
  required: false,
  collection: "valuelist",
  placeholder: "Enter a label name",
  example: "examplelabel1",
  comments:
    "Restrict results to articles with the specified labels. A maximum of 10 labels can be supplied. See [label names](https://developer.zendesk.com/api-reference/help_center/help-center-api/articles/#label-names) for more information.",
  clean: cleanValueListToString,
});

export const startTime = input({
  label: "Start Time",
  type: "string",
  required: false,
  example: exampleTimestamp,
  placeholder: "Enter the Unix timestamp",
  comments:
    "The start of the time range to search for events. Format: Unix timestamp (seconds since epoch).",
  clean: util.types.toNumber,
});

export const articleId = input({
  label: "Article ID",
  type: "string",
  example: "123123213",
  placeholder: "Enter the article ID",
  required: true,
  comments: "The unique identifier for the article.",
  clean: util.types.toString,
  dataSource: "listArticlesDataSource",
});

export const sectionId = input({
  label: "Section ID",
  type: "string",
  example: "123123213",
  placeholder: "Enter the section ID",
  required: true,
  comments: "The unique identifier for the section.",
  clean: util.types.toNumber,
  dataSource: "listSectionsDataSource",
});

export const userSegmentId = input({
  label: "User Segment ID",
  type: "string",
  example: "15",
  placeholder: "Enter the user segment ID",
  required: true,
  comments: "The unique identifier for the user segment.",
  clean: util.types.toNumber,
  dataSource: "listUserSegmentsDataSource",
});

export const permissionGroupId = input({
  label: "Permission Group ID",
  type: "string",
  example: "15",
  placeholder: "Enter the permission group ID",
  required: true,
  comments: "The unique identifier for the permission group.",
  clean: util.types.toNumber,
  dataSource: "listPermissionGroupsDataSource",
});

export const isDraft = input({
  label: "Draft",
  type: "boolean",
  required: false,
  comments: "When true, the article is saved as a draft instead of published.",
  clean: util.types.toBool,
});

export const notifySubscribers = input({
  label: "Notify Subscribers",
  type: "boolean",
  required: false,
  comments:
    "When false, suppresses the article creation email to subscribers. Useful when creating many articles at once.",
  clean: util.types.toBool,
});

export const title = input({
  label: "Title",
  type: "string",
  example: "Example Title",
  placeholder: "Enter the article title",
  required: false,
  comments: "The headline displayed for the article.",
  clean: util.types.toString,
});

export const body = input({
  label: "Body",
  type: "string",
  example: "Example Body",
  placeholder: "Enter the article body",
  required: false,
  comments: "The main content of the article.",
  clean: util.types.toString,
});

export const promoted = input({
  label: "Promoted",
  type: "boolean",
  required: false,
  comments: "When true, the object is highlighted at the top of its list.",
  clean: util.types.toBool,
});

export const position = input({
  label: "Position",
  type: "string",
  required: false,
  comments: "The numeric ordering position of the object within its list.",
  placeholder: "Enter the position",
  example: "42",
  clean: util.types.toNumber,
});

export const commentsDisabled = input({
  label: "Comments Disabled",
  type: "boolean",
  required: false,
  comments: "When true, prevents users from leaving comments on the object.",
  clean: util.types.toBool,
});

export const contentTagIds = input({
  label: "Content Tag IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "Enter a content tag ID",
  comments: "The list of content tag IDs to attach to the object.",
  clean: cleanValueList,
});

export const labelNames = input({
  label: "Label Names",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "Enter a label name",
  comments: "The list of label names to attach to the object.",
  clean: cleanValueList,
});

export const attachmentIds = input({
  label: "Attachment IDs",
  type: "string",
  collection: "valuelist",
  required: true,
  placeholder: "Enter an attachment ID",
  comments: "The list of attachment IDs to attach to the object.",
  clean: cleanValueList,
});

export const brandIds = input({
  label: "Brand IDs",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "63",
  placeholder: "Enter a brand ID",
  comments: "Restrict the search to articles or posts within these brands.",
  clean: cleanValueListToEncodedString,
});

export const categoryIds = input({
  label: "Category IDs",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "63",
  placeholder: "Enter a category ID",
  comments: "Restrict the search to articles or posts within these categories.",
  clean: cleanValueListToEncodedString,
});

export const contentTypes = input({
  label: "Content Types",
  type: "string",
  required: false,
  collection: "valuelist",
  model: ["POST", "ARTICLE"].map((type) => ({ label: type, value: type })),
  comments: "Restrict the search to one of these content types: ARTICLE, POST.",
  clean: cleanValueListToString,
});

export const externalSourceIds = input({
  label: "External Source IDs",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "63",
  placeholder: "Enter an external source ID",
  comments:
    "Restrict the search results to the specified external source or sources.",
  clean: cleanValueListToEncodedString,
});

export const locales = input({
  label: "Locales",
  type: "string",
  required: true,
  collection: "valuelist",
  example: "en-us",
  placeholder: "Enter a locale code",
  comments: "Restrict the search to articles or posts within these locales.",
  clean: cleanValueListToEncodedString,
});

export const sectionIds = input({
  label: "Section IDs",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "63",
  placeholder: "Enter a section ID",
  comments: "Restrict the search to articles or posts within these sections.",
  clean: cleanValueListToEncodedString,
});

export const topicIds = input({
  label: "Topic IDs",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "63",
  placeholder: "Enter a topic ID",
  comments: "Restrict the search to posts within these topics.",
  clean: cleanValueListToEncodedString,
});

export const searchQuery = input({
  label: "Search Query",
  type: "string",
  required: true,
  placeholder: "Enter the search text",
  example: "carrot",
  comments: "The text or search string used to match results.",
  clean: util.types.toString,
});

export const articleAttachmentId = input({
  label: "Article Attachment ID",
  type: "string",
  required: true,
  example: "12",
  placeholder: "Enter the article attachment ID",
  comments: "The unique identifier for the article attachment.",
  clean: util.types.toNumber,
});

export const categoryId = input({
  label: "Category ID",
  type: "string",
  required: true,
  example: "12",
  placeholder: "Enter the category ID",
  comments: "The unique identifier for the category.",
  clean: util.types.toNumber,
  dataSource: "listCategoriesDataSource",
});

export const sectionName = input({
  label: "Section Name",
  type: "string",
  required: true,
  example: "Example Section",
  placeholder: "Enter the section name",
  comments: "The display name of the section.",
  clean: util.types.toString,
});

export const sectionDescription = input({
  label: "Section Description",
  type: "string",
  required: false,
  example: "Example Description",
  placeholder: "Enter the section description",
  comments: "The descriptive text shown below the section title.",
  clean: util.types.toString,
});

export const parentSectionId = input({
  label: "Parent Section ID",
  type: "string",
  required: false,
  example: "12",
  placeholder: "Enter the parent section ID",
  comments: "The unique identifier for the parent section.",
  clean: util.types.toNumber,
});

export const categoryName = input({
  label: "Category Name",
  type: "string",
  required: true,
  example: "Example Category",
  placeholder: "Enter the category name",
  comments: "The display name of the category.",
  clean: util.types.toString,
});

export const categoryDescription = input({
  label: "Category Description",
  type: "string",
  required: true,
  example: "Example Description",
  placeholder: "Enter the category description",
  comments: "The descriptive text shown below the category title.",
  clean: util.types.toString,
});

export const topicName = input({
  label: "Topic Name",
  type: "string",
  required: true,
  example: "Example Topic",
  placeholder: "Enter the topic name",
  comments: "The display name of the topic.",
  clean: util.types.toString,
});

export const topicDescription = input({
  label: "Topic Description",
  type: "string",
  required: false,
  example: "Example Description",
  placeholder: "Enter the topic description",
  comments: "The descriptive text shown below the topic title.",
  clean: util.types.toString,
});

export const topicId = input({
  label: "Topic ID",
  type: "string",
  required: true,
  example: "12",
  placeholder: "Enter the topic ID",
  comments: "The unique identifier for the topic.",
  clean: util.types.toNumber,
  dataSource: "selectTopic",
});

export const manageableBy = input({
  label: "Manageable By",
  type: "string",
  required: false,
  model: [
    {
      label: "Staff",
      value: "staff",
    },
    {
      label: "Managers",
      value: "managers",
    },
  ],
  comments: "The user segment allowed to manage the topic.",
  clean: util.types.toString,
});

export const authorId = input({
  label: "Author ID",
  type: "string",
  required: false,
  example: "12",
  placeholder: "Enter the author user ID",
  comments: "The unique identifier for the author.",
  clean: util.types.toNumber,
});

export const isPostClosed = input({
  label: "Closed",
  type: "boolean",
  required: false,
  comments: "When true, the post is closed to new comments.",
  clean: util.types.toBool,
});

export const postDetails = input({
  label: "Details",
  type: "string",
  required: false,
  placeholder: "Enter the post details",
  comments: "The main body content of the post.",
  clean: util.types.toString,
});

export const isPostFeatured = input({
  label: "Featured",
  type: "boolean",
  required: false,
  comments: "When true, the post is featured prominently in the community.",
  clean: util.types.toBool,
});

export const isPostPinned = input({
  label: "Pinned",
  type: "boolean",
  required: false,
  comments: "When true, the post is pinned to the top of its topic.",
  clean: util.types.toBool,
});

export const postTitle = input({
  label: "Title",
  type: "string",
  required: true,
  example: "Example Title",
  placeholder: "Enter the post title",
  comments: "The headline displayed for the post.",
  clean: util.types.toString,
});

export const postStatus = input({
  label: "Status",
  type: "string",
  required: false,
  model: [
    { label: "Planned", value: "planned" },
    { label: "Not Planned", value: "not_planned" },
    { label: "Answered", value: "answered" },
    { label: "Completed", value: "completed" },
  ],
  comments: "The current workflow state of the post.",
  clean: util.types.toString,
});

export const postId = input({
  label: "Post ID",
  type: "string",
  required: true,
  example: "12",
  placeholder: "Enter the post ID",
  comments: "The unique identifier for the post.",
  clean: util.types.toNumber,
  dataSource: "selectPost",
});

export const postFilterBy = input({
  label: "Filter By",
  type: "string",
  required: true,
  model: postFilterByOptions,
  comments: "The field used to filter the results.",
  clean: util.types.toString,
});

export const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  example: "12",
  placeholder: "Enter the subscription ID",
  comments: "The unique identifier for the subscription.",
  clean: util.types.toNumber,
});

export const includeComments = input({
  label: "Include Comments",
  type: "boolean",
  required: false,
  comments:
    "When true, the subscription also includes notifications for comments.",
  clean: util.types.toBool,
});

export const filterCreatedBefore = input({
  label: "Created Before",
  type: "string",
  required: false,
  example: "2024-05-01",
  placeholder: "2024-05-01",
  comments:
    "The upper bound used to filter results by creation date. Format: YYYY-MM-DD.",
  clean: util.types.toString,
});

export const filterCreatedAfter = input({
  label: "Created After",
  type: "string",
  required: false,
  example: "2024-05-01",
  placeholder: "2024-05-01",
  comments:
    "The lower bound used to filter results by creation date. Format: YYYY-MM-DD.",
  clean: util.types.toString,
});

export const filterCategoryId = input({
  label: "Category ID",
  type: "string",
  required: false,
  example: "12",
  placeholder: "Enter the category ID",
  comments:
    "The unique identifier for the category used to filter the results.",
  clean: util.types.toNumber,
});

export const filterCreatedAt = input({
  label: "Created At",
  type: "string",
  required: false,
  example: "2024-05-01",
  placeholder: "2024-05-01",
  comments:
    "The exact creation date used to filter the results. Format: YYYY-MM-DD.",
  clean: util.types.toString,
});

export const filterLabelNames = input({
  label: "Label Names",
  type: "string",
  required: false,
  collection: "valuelist",
  example: "examplelabel1",
  placeholder: "Enter a label name",
  comments: "The list of label names used to filter the results.",
  clean: cleanValueListToString,
});

export const shouldFilterMultibrand = input({
  label: "Multibrand",
  type: "boolean",
  required: false,
  comments: "When true, results are filtered across all brands in the account.",
  clean: util.types.toBool,
});

export const filterSectionId = input({
  label: "Section ID",
  type: "string",
  required: false,
  example: "12",
  placeholder: "Enter the section ID",
  comments: "The unique identifier for the section used to filter the results.",
  clean: util.types.toNumber,
});

export const filterUpdatedAt = input({
  label: "Updated At",
  type: "string",
  required: false,
  example: "2024-05-01",
  placeholder: "2024-05-01",
  comments:
    "The exact update date used to filter the results. Format: YYYY-MM-DD.",
  clean: util.types.toString,
});

export const filterUpdatedBefore = input({
  label: "Updated Before",
  type: "string",
  required: false,
  example: "2024-05-01",
  placeholder: "2024-05-01",
  comments:
    "The upper bound used to filter results by update date. Format: YYYY-MM-DD.",
  clean: util.types.toString,
});

export const filterUpdatedAfter = input({
  label: "Updated After",
  type: "string",
  required: false,
  example: "2024-05-01",
  placeholder: "2024-05-01",
  comments:
    "The lower bound used to filter results by update date. Format: YYYY-MM-DD.",
  clean: util.types.toString,
});

export const inline = input({
  label: "Inline",
  type: "boolean",
  required: false,
  comments: "When true, the attachment is rendered inline within the content.",
  clean: util.types.toBool,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, automatically fetches all pages of results instead of returning a single page.",
  clean: util.types.toBool,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created tickets are included in the trigger output.",
  clean: util.types.toBool,
});

export const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, tickets updated since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});
