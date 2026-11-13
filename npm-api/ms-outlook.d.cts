//#region node_modules/@microsoft/microsoft-graph-types/microsoft-graph.d.ts
type NullableOption<T> = T | null;
type DayOfWeek = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
type LocationType = "default" | "conferenceRoom" | "homeAddress" | "businessAddress" | "geoCoordinates" | "streetAddress" | "hotel" | "restaurant" | "localBusiness" | "postalAddress";
type LocationUniqueIdType = "unknown" | "locationStore" | "directory" | "private" | "bing";
type PhoneType = "home" | "business" | "mobile" | "other" | "assistant" | "homeFax" | "businessFax" | "otherFax" | "pager" | "radio";
type BodyType = "text" | "html";
type AttendeeType = "required" | "optional" | "resource";
type FreeBusyStatus = "unknown" | "free" | "tentative" | "busy" | "oof" | "workingElsewhere";
type CalendarColor = "auto" | "lightBlue" | "lightGreen" | "lightOrange" | "lightGray" | "lightYellow" | "lightTeal" | "lightPink" | "lightBrown" | "lightRed" | "maxColor";
type CalendarRoleType = "none" | "freeBusyRead" | "limitedRead" | "read" | "write" | "delegateWithoutPrivateEventAccess" | "delegateWithPrivateEventAccess" | "custom";
type EventType = "singleInstance" | "occurrence" | "exception" | "seriesMaster";
type FollowupFlagStatus = "notFlagged" | "complete" | "flagged";
type Importance = "low" | "normal" | "high";
type InferenceClassificationType = "focused" | "other";
type MessageActionFlag = "any" | "call" | "doNotForward" | "followUp" | "fyi" | "forward" | "noResponseNecessary" | "read" | "reply" | "replyToAll" | "review";
type OnlineMeetingProviderType = "unknown" | "skypeForBusiness" | "skypeForConsumer" | "teamsForBusiness";
type RecurrencePatternType = "daily" | "weekly" | "absoluteMonthly" | "relativeMonthly" | "absoluteYearly" | "relativeYearly";
type RecurrenceRangeType = "endDate" | "noEnd" | "numbered";
type ResponseType$1 = "none" | "organizer" | "tentativelyAccepted" | "accepted" | "declined" | "notResponded";
type Sensitivity = "normal" | "personal" | "private" | "confidential";
type WeekIndex = "first" | "second" | "third" | "fourth" | "last";
interface Entity {
  // The unique idenfier for an entity. Read-only.
  id?: string;
}
interface Calendar extends Entity {
  /**
   * Represent the online meeting service providers that can be used to create online meetings in this calendar. Possible
   * values are: unknown, skypeForBusiness, skypeForConsumer, teamsForBusiness.
   */
  allowedOnlineMeetingProviders?: NullableOption<OnlineMeetingProviderType[]>;
  /**
   * true if the user can write to the calendar, false otherwise. This property is true for the user who created the
   * calendar. This property is also true for a user who has been shared a calendar and granted write access.
   */
  canEdit?: NullableOption<boolean>;
  /**
   * true if the user has the permission to share the calendar, false otherwise. Only the user who created the calendar can
   * share it.
   */
  canShare?: NullableOption<boolean>; // true if the user can read calendar items that have been marked private, false otherwise.
  canViewPrivateItems?: NullableOption<boolean>;
  /**
   * Identifies the version of the calendar object. Every time the calendar is changed, changeKey changes as well. This
   * allows Exchange to apply changes to the correct version of the object. Read-only.
   */
  changeKey?: NullableOption<string>;
  /**
   * Specifies the color theme to distinguish the calendar from other calendars in a UI. The property values are: auto,
   * lightBlue, lightGreen, lightOrange, lightGray, lightYellow, lightTeal, lightPink, lightBrown, lightRed, maxColor.
   */
  color?: NullableOption<CalendarColor>;
  /**
   * The default online meeting provider for meetings sent from this calendar. Possible values are: unknown,
   * skypeForBusiness, skypeForConsumer, teamsForBusiness.
   */
  defaultOnlineMeetingProvider?: NullableOption<OnlineMeetingProviderType>;
  /**
   * The calendar color, expressed in a hex color code of three hexadecimal values, each ranging from 00 to FF and
   * representing the red, green, or blue components of the color in the RGB color space. If the user has never explicitly
   * set a color for the calendar, this property is empty. Read-only.
   */
  hexColor?: NullableOption<string>; // true if this is the default calendar where new events are created by default, false otherwise.
  isDefaultCalendar?: NullableOption<boolean>; // Indicates whether this user calendar can be deleted from the user mailbox.
  isRemovable?: NullableOption<boolean>;
  /**
   * Indicates whether this user calendar supports tracking of meeting responses. Only meeting invites sent from users'
   * primary calendars support tracking of meeting responses.
   */
  isTallyingResponses?: NullableOption<boolean>; // The calendar name.
  name?: NullableOption<string>;
  /**
   * If set, this represents the user who created or added the calendar. For a calendar that the user created or added, the
   * owner property is set to the user. For a calendar shared with the user, the owner property is set to the person who
   * shared that calendar with the user.
   */
  owner?: NullableOption<EmailAddress>; // The permissions of the users with whom the calendar is shared.
  calendarPermissions?: NullableOption<CalendarPermission[]>; // The calendar view for the calendar. Navigation property. Read-only.
  calendarView?: NullableOption<Event[]>; // The events in the calendar. Navigation property. Read-only.
  events?: NullableOption<Event[]>; // The collection of multi-value extended properties defined for the calendar. Read-only. Nullable.
  multiValueExtendedProperties?: NullableOption<MultiValueLegacyExtendedProperty[]>; // The collection of single-value extended properties defined for the calendar. Read-only. Nullable.
  singleValueExtendedProperties?: NullableOption<SingleValueLegacyExtendedProperty[]>;
}
interface OutlookItem extends Entity {
  // The categories associated with the item
  categories?: NullableOption<string[]>;
  /**
   * Identifies the version of the item. Every time the item is changed, changeKey changes as well. This allows Exchange to
   * apply changes to the correct version of the object. Read-only.
   */
  changeKey?: NullableOption<string>;
  /**
   * The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example,
   * midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z
   */
  createdDateTime?: NullableOption<string>;
  /**
   * The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example,
   * midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z
   */
  lastModifiedDateTime?: NullableOption<string>;
}
interface Event extends OutlookItem {
  /**
   * true if the meeting organizer allows invitees to propose a new time when responding; otherwise, false. Optional.
   * Default is true.
   */
  allowNewTimeProposals?: NullableOption<boolean>; // The collection of attendees for the event.
  attendees?: NullableOption<Attendee[]>; // The body of the message associated with the event. It can be in HTML or text format.
  body?: NullableOption<ItemBody>; // The preview of the message associated with the event. It is in text format.
  bodyPreview?: NullableOption<string>; // The date, time, and time zone that the event ends. By default, the end time is in UTC.
  end?: NullableOption<DateTimeTimeZone>; // Set to true if the event has attachments.
  hasAttachments?: NullableOption<boolean>;
  /**
   * When set to true, each attendee only sees themselves in the meeting request and meeting Tracking list. Default is
   * false.
   */
  hideAttendees?: NullableOption<boolean>;
  /**
   * A unique identifier for an event across calendars. This ID is different for each occurrence in a recurring series.
   * Read-only.
   */
  iCalUId?: NullableOption<string>;
  importance?: NullableOption<Importance>;
  isAllDay?: NullableOption<boolean>;
  isCancelled?: NullableOption<boolean>;
  isDraft?: NullableOption<boolean>;
  isOnlineMeeting?: NullableOption<boolean>;
  isOrganizer?: NullableOption<boolean>;
  isReminderOn?: NullableOption<boolean>;
  location?: NullableOption<Location>;
  locations?: NullableOption<Location[]>;
  onlineMeeting?: NullableOption<OnlineMeetingInfo>;
  onlineMeetingProvider?: NullableOption<OnlineMeetingProviderType>;
  onlineMeetingUrl?: NullableOption<string>;
  organizer?: NullableOption<Recipient>;
  originalEndTimeZone?: NullableOption<string>;
  originalStart?: NullableOption<string>;
  originalStartTimeZone?: NullableOption<string>;
  recurrence?: NullableOption<PatternedRecurrence>;
  reminderMinutesBeforeStart?: NullableOption<number>;
  responseRequested?: NullableOption<boolean>;
  responseStatus?: NullableOption<ResponseStatus>;
  sensitivity?: NullableOption<Sensitivity>;
  seriesMasterId?: NullableOption<string>;
  showAs?: NullableOption<FreeBusyStatus>;
  start?: NullableOption<DateTimeTimeZone>;
  subject?: NullableOption<string>;
  transactionId?: NullableOption<string>;
  type?: NullableOption<EventType>;
  webLink?: NullableOption<string>;
  /**
   * The collection of FileAttachment, ItemAttachment, and referenceAttachment attachments for the event. Navigation
   * property. Read-only. Nullable.
   */
  attachments?: NullableOption<Attachment[]>; // The calendar that contains the event. Navigation property. Read-only.
  calendar?: NullableOption<Calendar>; // The collection of open extensions defined for the event. Nullable.
  extensions?: NullableOption<Extension[]>;
  /**
   * The occurrences of a recurring series, if the event is a series master. This property includes occurrences that are
   * part of the recurrence pattern, and exceptions that have been modified, but does not include occurrences that have been
   * cancelled from the series. Navigation property. Read-only. Nullable.
   */
  instances?: NullableOption<Event[]>; // The collection of multi-value extended properties defined for the event. Read-only. Nullable.
  multiValueExtendedProperties?: NullableOption<MultiValueLegacyExtendedProperty[]>; // The collection of single-value extended properties defined for the event. Read-only. Nullable.
  singleValueExtendedProperties?: NullableOption<SingleValueLegacyExtendedProperty[]>;
}
interface MailFolder extends Entity {
  // The number of immediate child mailFolders in the current mailFolder.
  childFolderCount?: NullableOption<number>; // The mailFolder's display name.
  displayName?: NullableOption<string>;
  /**
   * Indicates whether the mailFolder is hidden. This property can be set only when creating the folder. Find more
   * information in Hidden mail folders.
   */
  isHidden?: NullableOption<boolean>; // The unique identifier for the mailFolder's parent mailFolder.
  parentFolderId?: NullableOption<string>; // The number of items in the mailFolder.
  totalItemCount?: NullableOption<number>; // The number of items in the mailFolder marked as unread.
  unreadItemCount?: NullableOption<number>; // The collection of child folders in the mailFolder.
  childFolders?: NullableOption<MailFolder[]>; // The collection of rules that apply to the user's Inbox folder.
  messageRules?: NullableOption<MessageRule[]>; // The collection of messages in the mailFolder.
  messages?: NullableOption<Message[]>; // The collection of multi-value extended properties defined for the mailFolder. Read-only. Nullable.
  multiValueExtendedProperties?: NullableOption<MultiValueLegacyExtendedProperty[]>; // The collection of single-value extended properties defined for the mailFolder. Read-only. Nullable.
  singleValueExtendedProperties?: NullableOption<SingleValueLegacyExtendedProperty[]>;
}
interface Message extends OutlookItem {
  // The Bcc: recipients for the message.
  bccRecipients?: NullableOption<Recipient[]>; // The body of the message. It can be in HTML or text format. Find out about safe HTML in a message body.
  body?: NullableOption<ItemBody>; // The first 255 characters of the message body. It is in text format.
  bodyPreview?: NullableOption<string>; // The Cc: recipients for the message.
  ccRecipients?: NullableOption<Recipient[]>; // The ID of the conversation the email belongs to.
  conversationId?: NullableOption<string>; // Indicates the position of the message within the conversation.
  conversationIndex?: NullableOption<string>; // The flag value that indicates the status, start date, due date, or completion date for the message.
  flag?: NullableOption<FollowupFlag>;
  /**
   * The owner of the mailbox from which the message is sent. In most cases, this value is the same as the sender property,
   * except for sharing or delegation scenarios. The value must correspond to the actual mailbox used. Find out more about
   * setting the from and sender properties of a message.
   */
  from?: NullableOption<Recipient>;
  /**
   * Indicates whether the message has attachments. This property doesn't include inline attachments, so if a message
   * contains only inline attachments, this property is false. To verify the existence of inline attachments, parse the body
   * property to look for a src attribute, such as &amp;lt;IMG src='cid:image001.jpg@01D26CD8.6C05F070'&amp;gt;.
   */
  hasAttachments?: NullableOption<boolean>;
  importance?: NullableOption<Importance>;
  inferenceClassification?: NullableOption<InferenceClassificationType>;
  internetMessageHeaders?: NullableOption<InternetMessageHeader[]>;
  internetMessageId?: NullableOption<string>;
  isDeliveryReceiptRequested?: NullableOption<boolean>;
  isDraft?: NullableOption<boolean>;
  isRead?: NullableOption<boolean>;
  isReadReceiptRequested?: NullableOption<boolean>;
  parentFolderId?: NullableOption<string>;
  receivedDateTime?: NullableOption<string>;
  replyTo?: NullableOption<Recipient[]>;
  sender?: NullableOption<Recipient>;
  sentDateTime?: NullableOption<string>;
  subject?: NullableOption<string>;
  toRecipients?: NullableOption<Recipient[]>;
  uniqueBody?: NullableOption<ItemBody>;
  webLink?: NullableOption<string>; // The fileAttachment and itemAttachment attachments for the message.
  attachments?: NullableOption<Attachment[]>; // The collection of open extensions defined for the message. Nullable.
  extensions?: NullableOption<Extension[]>; // The collection of multi-value extended properties defined for the message. Nullable.
  multiValueExtendedProperties?: NullableOption<MultiValueLegacyExtendedProperty[]>; // The collection of single-value extended properties defined for the message. Nullable.
  singleValueExtendedProperties?: NullableOption<SingleValueLegacyExtendedProperty[]>;
}
// tslint:disable-next-line: no-empty-interface
interface Extension extends Entity {}
interface Subscription extends Entity {
  // Optional. Identifier of the application used to create the subscription. Read-only.
  applicationId?: NullableOption<string>;
  /**
   * Required. Indicates the type of change in the subscribed resource that will raise a change notification. The supported
   * values are: created, updated, deleted. Multiple values can be combined using a comma-separated list. Note: Drive root
   * item and list change notifications support only the updated changeType. User and group change notifications support
   * updated and deleted changeType. Use updated to receive notifications when user or group is created, updated or soft
   * deleted. Use deleted to receive notifications when user or group is permanently deleted.
   */
  changeType?: string;
  /**
   * Optional. Specifies the value of the clientState property sent by the service in each change notification. The maximum
   * length is 128 characters. The client can check that the change notification came from the service by comparing the
   * value of the clientState property sent with the subscription with the value of the clientState property received with
   * each change notification.
   */
  clientState?: NullableOption<string>;
  /**
   * Optional. Identifier of the user or service principal that created the subscription. If the app used delegated
   * permissions to create the subscription, this field contains the id of the signed-in user the app called on behalf of.
   * If the app used application permissions, this field contains the id of the service principal corresponding to the app.
   * Read-only.
   */
  creatorId?: NullableOption<string>;
  /**
   * Optional. A base64-encoded representation of a certificate with a public key used to encrypt resource data in change
   * notifications. Optional but required when includeResourceData is true.
   */
  encryptionCertificate?: NullableOption<string>; // Optional. A custom app-provided identifier to help identify the certificate needed to decrypt resource data.
  encryptionCertificateId?: NullableOption<string>;
  /**
   * Required. Specifies the date and time when the webhook subscription expires. The time is in UTC, and can be an amount
   * of time from subscription creation that varies for the resource subscribed to. For the maximum supported subscription
   * length of time, see the table below.
   */
  expirationDateTime?: string; // Optional. When set to true, change notifications include resource data (such as content of a chat message).
  includeResourceData?: NullableOption<boolean>;
  /**
   * Optional. Specifies the latest version of Transport Layer Security (TLS) that the notification endpoint, specified by
   * notificationUrl, supports. The possible values are: v1_0, v1_1, v1_2, v1_3. For subscribers whose notification endpoint
   * supports a version lower than the currently recommended version (TLS 1.2), specifying this property by a set timeline
   * allows them to temporarily use their deprecated version of TLS before completing their upgrade to TLS 1.2. For these
   * subscribers, not setting this property per the timeline would result in subscription operations failing. For
   * subscribers whose notification endpoint already supports TLS 1.2, setting this property is optional. In such cases,
   * Microsoft Graph defaults the property to v1_2.
   */
  latestSupportedTlsVersion?: NullableOption<string>;
  /**
   * Optional. The URL of the endpoint that receives lifecycle notifications, including subscriptionRemoved,
   * reauthorizationRequired, and missed notifications. This URL must make use of the HTTPS protocol.
   */
  lifecycleNotificationUrl?: NullableOption<string>;
  /**
   * Optional. OData query options for specifying value for the targeting resource. Clients receive notifications when
   * resource reaches the state matching the query options provided here. With this new property in the subscription
   * creation payload along with all existing properties, Webhooks will deliver notifications whenever a resource reaches
   * the desired state mentioned in the notificationQueryOptions property. For example, when the print job is completed or
   * when a print job resource isFetchable property value becomes true etc. Supported only for Universal Print Service. For
   * more information, see Subscribe to change notifications from cloud printing APIs using Microsoft Graph.
   */
  notificationQueryOptions?: NullableOption<string>;
  /**
   * Required. The URL of the endpoint that will receive the change notifications. This URL must make use of the HTTPS
   * protocol.
   */
  notificationUrl?: string;
  /**
   * Optional. The app ID that the subscription service can use to generate the validation token. This allows the client to
   * validate the authenticity of the notification received.
   */
  notificationUrlAppId?: NullableOption<string>;
  /**
   * Required. Specifies the resource that will be monitored for changes. Do not include the base URL
   * (https://graph.microsoft.com/v1.0/). See the possible resource path values for each supported resource.
   */
  resource?: string;
}
interface Attachment extends Entity {
  // The MIME type.
  contentType?: NullableOption<string>; // true if the attachment is an inline attachment; otherwise, false.
  isInline?: boolean;
  /**
   * The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example,
   * midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z
   */
  lastModifiedDateTime?: NullableOption<string>; // The attachment's file name.
  name?: NullableOption<string>; // The length of the attachment in bytes.
  size?: number;
}
interface CalendarPermission extends Entity {
  /**
   * List of allowed sharing or delegating permission levels for the calendar. Possible values are: none, freeBusyRead,
   * limitedRead, read, write, delegateWithoutPrivateEventAccess, delegateWithPrivateEventAccess, custom.
   */
  allowedRoles?: NullableOption<CalendarRoleType[]>;
  /**
   * Represents a sharee or delegate who has access to the calendar. For the 'My Organization' sharee, the address property
   * is null. Read-only.
   */
  emailAddress?: NullableOption<EmailAddress>; // True if the user in context (sharee or delegate) is inside the same organization as the calendar owner.
  isInsideOrganization?: NullableOption<boolean>;
  /**
   * True if the user can be removed from the list of sharees or delegates for the specified calendar, false otherwise. The
   * 'My organization' user determines the permissions other people within your organization have to the given calendar. You
   * cannot remove 'My organization' as a sharee to a calendar.
   */
  isRemovable?: NullableOption<boolean>; // Current permission level of the calendar sharee or delegate.
  role?: NullableOption<CalendarRoleType>;
}
interface MultiValueLegacyExtendedProperty extends Entity {
  // A collection of property values.
  value?: NullableOption<string[]>;
}
interface SingleValueLegacyExtendedProperty extends Entity {
  // A property value.
  value?: NullableOption<string>;
}
interface MessageRule extends Entity {
  // Actions to be taken on a message when the corresponding conditions are fulfilled.
  actions?: NullableOption<MessageRuleActions>; // Conditions that when fulfilled, will trigger the corresponding actions for that rule.
  conditions?: NullableOption<MessageRulePredicates>; // The display name of the rule.
  displayName?: NullableOption<string>; // Exception conditions for the rule.
  exceptions?: NullableOption<MessageRulePredicates>; // Indicates whether the rule is in an error condition. Read-only.
  hasError?: NullableOption<boolean>; // Indicates whether the rule is enabled to be applied to messages.
  isEnabled?: NullableOption<boolean>; // Indicates if the rule is read-only and cannot be modified or deleted by the rules REST API.
  isReadOnly?: NullableOption<boolean>; // Indicates the order in which the rule is executed, among other rules.
  sequence?: NullableOption<number>;
}
interface MailSearchFolder extends MailFolder {
  // The OData query to filter the messages.
  filterQuery?: NullableOption<string>;
  /**
   * Indicates how the mailbox folder hierarchy should be traversed in the search. true means that a deep search should be
   * done to include child folders in the hierarchy of each folder explicitly specified in sourceFolderIds. false means a
   * shallow search of only each of the folders explicitly specified in sourceFolderIds.
   */
  includeNestedFolders?: NullableOption<boolean>; // Indicates whether a search folder is editable using REST APIs.
  isSupported?: NullableOption<boolean>; // The mailbox folders that should be mined.
  sourceFolderIds?: NullableOption<string[]>;
}
interface EmailAddress {
  // The email address of the person or entity.
  address?: NullableOption<string>; // The display name of the person or entity.
  name?: NullableOption<string>;
}
interface Recipient {
  // The recipient's email address.
  emailAddress?: NullableOption<EmailAddress>;
}
interface DateTimeTimeZone {
  /**
   * A single point of time in a combined date and time representation ({date}T{time}; for example,
   * 2017-08-29T04:00:00.0000000).
   */
  dateTime?: string; // Represents a time zone, for example, 'Pacific Standard Time'. See below for more possible values.
  timeZone?: NullableOption<string>;
}
interface Location {
  // The street address of the location.
  address?: NullableOption<PhysicalAddress>; // The geographic coordinates and elevation of the location.
  coordinates?: NullableOption<OutlookGeoCoordinates>; // The name associated with the location.
  displayName?: NullableOption<string>; // Optional email address of the location.
  locationEmailAddress?: NullableOption<string>;
  /**
   * The type of location. The possible values are: default, conferenceRoom, homeAddress, businessAddress,geoCoordinates,
   * streetAddress, hotel, restaurant, localBusiness, postalAddress. Read-only.
   */
  locationType?: NullableOption<LocationType>; // Optional URI representing the location.
  locationUri?: NullableOption<string>; // For internal use only.
  uniqueId?: NullableOption<string>; // For internal use only.
  uniqueIdType?: NullableOption<LocationUniqueIdType>;
}
interface PhysicalAddress {
  // The city.
  city?: NullableOption<string>; // The country or region. It's a free-format string value, for example, 'United States'.
  countryOrRegion?: NullableOption<string>; // The postal code.
  postalCode?: NullableOption<string>; // The state.
  state?: NullableOption<string>; // The street.
  street?: NullableOption<string>;
}
interface OutlookGeoCoordinates {
  /**
   * The accuracy of the latitude and longitude. As an example, the accuracy can be measured in meters, such as the latitude
   * and longitude are accurate to within 50 meters.
   */
  accuracy?: NullableOption<number>; // The altitude of the location.
  altitude?: NullableOption<number>; // The accuracy of the altitude.
  altitudeAccuracy?: NullableOption<number>; // The latitude of the location.
  latitude?: NullableOption<number>; // The longitude of the location.
  longitude?: NullableOption<number>;
}
interface Phone {
  language?: NullableOption<string>; // The phone number.
  number?: NullableOption<string>;
  region?: NullableOption<string>;
  /**
   * The type of phone number. The possible values are: home, business, mobile, other, assistant, homeFax, businessFax,
   * otherFax, pager, radio.
   */
  type?: NullableOption<PhoneType>;
}
interface TimeSlot {
  // The date, time, and time zone that a period ends.
  end?: DateTimeTimeZone; // The date, time, and time zone that a period begins.
  start?: DateTimeTimeZone;
}
// tslint:disable-next-line: interface-name
interface ItemBody {
  // The content of the item.
  content?: NullableOption<string>; // The type of the content. Possible values are text and html.
  contentType?: NullableOption<BodyType>;
}
interface AttendeeBase extends Recipient {
  /**
   * The type of attendee. The possible values are: required, optional, resource. Currently if the attendee is a person,
   * findMeetingTimes always considers the person is of the Required type.
   */
  type?: NullableOption<AttendeeType>;
}
interface Attendee extends AttendeeBase {
  /**
   * An alternate date/time proposed by the attendee for a meeting request to start and end. If the attendee hasn't proposed
   * another time, then this property is not included in a response of a GET event.
   */
  proposedNewTime?: NullableOption<TimeSlot>; // The attendee's response (none, accepted, declined, etc.) for the event and date-time that the response was sent.
  status?: NullableOption<ResponseStatus>;
}
interface ResponseStatus {
  /**
   * The response type. Possible values are: none, organizer, tentativelyAccepted, accepted, declined, notResponded.To
   * differentiate between none and notResponded: none – from organizer's perspective. This value is used when the status of
   * an attendee/participant is reported to the organizer of a meeting. notResponded – from attendee's perspective.
   * Indicates the attendee has not responded to the meeting request. Clients can treat notResponded == none. As an example,
   * if attendee Alex hasn't responded to a meeting request, getting Alex' response status for that event in Alex' calendar
   * returns notResponded. Getting Alex' response from the calendar of any other attendee or the organizer's returns none.
   * Getting the organizer's response for the event in anybody's calendar also returns none.
   */
  response?: NullableOption<ResponseType$1>;
  /**
   * The date and time when the response was returned. It uses ISO 8601 format and is always in UTC time. For example,
   * midnight UTC on Jan 1, 2014 is 2014-01-01T00:00:00Z
   */
  time?: NullableOption<string>;
}
interface TimeZoneBase {
  /**
   * The name of a time zone. It can be a standard time zone name such as 'Hawaii-Aleutian Standard Time', or 'Customized
   * Time Zone' for a custom time zone.
   */
  name?: NullableOption<string>;
}
interface FollowupFlag {
  // The date and time that the follow-up was finished.
  completedDateTime?: NullableOption<DateTimeTimeZone>;
  /**
   * The date and time that the follow up is to be finished. Note: To set the due date, you must also specify the
   * startDateTime; otherwise, you will get a 400 Bad Request response.
   */
  dueDateTime?: NullableOption<DateTimeTimeZone>; // The status for follow-up for an item. Possible values are notFlagged, complete, and flagged.
  flagStatus?: NullableOption<FollowupFlagStatus>; // The date and time that the follow-up is to begin.
  startDateTime?: NullableOption<DateTimeTimeZone>;
}
interface FreeBusyError {
  // Describes the error.
  message?: NullableOption<string>; // The response code from querying for the availability of the user, distribution list, or resource.
  responseCode?: NullableOption<string>;
}
// tslint:disable-next-line: interface-name
interface InternetMessageHeader {
  // Represents the key in a key-value pair.
  name?: NullableOption<string>; // The value in a key-value pair.
  value?: NullableOption<string>;
}
interface WorkingHours {
  // The days of the week on which the user works.
  daysOfWeek?: NullableOption<DayOfWeek[]>; // The time of the day that the user stops working.
  endTime?: NullableOption<string>; // The time of the day that the user starts working.
  startTime?: NullableOption<string>; // The time zone to which the working hours apply.
  timeZone?: NullableOption<TimeZoneBase>;
}
interface MessageRuleActions {
  // A list of categories to be assigned to a message.
  assignCategories?: NullableOption<string[]>; // The ID of a folder that a message is to be copied to.
  copyToFolder?: NullableOption<string>; // Indicates whether a message should be moved to the Deleted Items folder.
  delete?: NullableOption<boolean>; // The email addresses of the recipients to which a message should be forwarded as an attachment.
  forwardAsAttachmentTo?: NullableOption<Recipient[]>; // The email addresses of the recipients to which a message should be forwarded.
  forwardTo?: NullableOption<Recipient[]>; // Indicates whether a message should be marked as read.
  markAsRead?: NullableOption<boolean>; // Sets the importance of the message, which can be: low, normal, high.
  markImportance?: NullableOption<Importance>; // The ID of the folder that a message will be moved to.
  moveToFolder?: NullableOption<string>; // Indicates whether a message should be permanently deleted and not saved to the Deleted Items folder.
  permanentDelete?: NullableOption<boolean>; // The email addresses to which a message should be redirected.
  redirectTo?: NullableOption<Recipient[]>; // Indicates whether subsequent rules should be evaluated.
  stopProcessingRules?: NullableOption<boolean>;
}
interface MessageRulePredicates {
  /**
   * Represents the strings that should appear in the body of an incoming message in order for the condition or exception to
   * apply.
   */
  bodyContains?: NullableOption<string[]>;
  /**
   * Represents the strings that should appear in the body or subject of an incoming message in order for the condition or
   * exception to apply.
   */
  bodyOrSubjectContains?: NullableOption<string[]>;
  /**
   * Represents the categories that an incoming message should be labeled with in order for the condition or exception to
   * apply.
   */
  categories?: NullableOption<string[]>; // Represents the specific sender email addresses of an incoming message in order for the condition or exception to apply.
  fromAddresses?: NullableOption<Recipient[]>; // Indicates whether an incoming message must have attachments in order for the condition or exception to apply.
  hasAttachments?: NullableOption<boolean>;
  /**
   * Represents the strings that appear in the headers of an incoming message in order for the condition or exception to
   * apply.
   */
  headerContains?: NullableOption<string[]>;
  /**
   * The importance that is stamped on an incoming message in order for the condition or exception to apply: low, normal,
   * high.
   */
  importance?: NullableOption<Importance>; // Indicates whether an incoming message must be an approval request in order for the condition or exception to apply.
  isApprovalRequest?: NullableOption<boolean>; // Indicates whether an incoming message must be automatically forwarded in order for the condition or exception to apply.
  isAutomaticForward?: NullableOption<boolean>; // Indicates whether an incoming message must be an auto reply in order for the condition or exception to apply.
  isAutomaticReply?: NullableOption<boolean>; // Indicates whether an incoming message must be encrypted in order for the condition or exception to apply.
  isEncrypted?: NullableOption<boolean>; // Indicates whether an incoming message must be a meeting request in order for the condition or exception to apply.
  isMeetingRequest?: NullableOption<boolean>; // Indicates whether an incoming message must be a meeting response in order for the condition or exception to apply.
  isMeetingResponse?: NullableOption<boolean>; // Indicates whether an incoming message must be a non-delivery report in order for the condition or exception to apply.
  isNonDeliveryReport?: NullableOption<boolean>;
  /**
   * Indicates whether an incoming message must be permission controlled (RMS-protected) in order for the condition or
   * exception to apply.
   */
  isPermissionControlled?: NullableOption<boolean>; // Indicates whether an incoming message must be a read receipt in order for the condition or exception to apply.
  isReadReceipt?: NullableOption<boolean>; // Indicates whether an incoming message must be S/MIME-signed in order for the condition or exception to apply.
  isSigned?: NullableOption<boolean>; // Indicates whether an incoming message must be a voice mail in order for the condition or exception to apply.
  isVoicemail?: NullableOption<boolean>;
  /**
   * Represents the flag-for-action value that appears on an incoming message in order for the condition or exception to
   * apply. The possible values are: any, call, doNotForward, followUp, fyi, forward, noResponseNecessary, read, reply,
   * replyToAll, review.
   */
  messageActionFlag?: NullableOption<MessageActionFlag>;
  /**
   * Indicates whether the owner of the mailbox must not be a recipient of an incoming message in order for the condition or
   * exception to apply.
   */
  notSentToMe?: NullableOption<boolean>;
  /**
   * Represents the strings that appear in either the toRecipients or ccRecipients properties of an incoming message in
   * order for the condition or exception to apply.
   */
  recipientContains?: NullableOption<string[]>;
  /**
   * Represents the strings that appear in the from property of an incoming message in order for the condition or exception
   * to apply.
   */
  senderContains?: NullableOption<string[]>;
  /**
   * Represents the sensitivity level that must be stamped on an incoming message in order for the condition or exception to
   * apply. The possible values are: normal, personal, private, confidential.
   */
  sensitivity?: NullableOption<Sensitivity>;
  /**
   * Indicates whether the owner of the mailbox must be in the ccRecipients property of an incoming message in order for the
   * condition or exception to apply.
   */
  sentCcMe?: NullableOption<boolean>;
  /**
   * Indicates whether the owner of the mailbox must be the only recipient in an incoming message in order for the condition
   * or exception to apply.
   */
  sentOnlyToMe?: NullableOption<boolean>;
  /**
   * Represents the email addresses that an incoming message must have been sent to in order for the condition or exception
   * to apply.
   */
  sentToAddresses?: NullableOption<Recipient[]>;
  /**
   * Indicates whether the owner of the mailbox must be in the toRecipients property of an incoming message in order for the
   * condition or exception to apply.
   */
  sentToMe?: NullableOption<boolean>;
  /**
   * Indicates whether the owner of the mailbox must be in either a toRecipients or ccRecipients property of an incoming
   * message in order for the condition or exception to apply.
   */
  sentToOrCcMe?: NullableOption<boolean>;
  /**
   * Represents the strings that appear in the subject of an incoming message in order for the condition or exception to
   * apply.
   */
  subjectContains?: NullableOption<string[]>;
  /**
   * Represents the minimum and maximum sizes (in kilobytes) that an incoming message must fall in between in order for the
   * condition or exception to apply.
   */
  withinSizeRange?: NullableOption<SizeRange>;
}
interface SizeRange {
  // The maximum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply.
  maximumSize?: NullableOption<number>; // The minimum size (in kilobytes) that an incoming message must have in order for a condition or exception to apply.
  minimumSize?: NullableOption<number>;
}
interface OnlineMeetingInfo {
  // The ID of the conference.
  conferenceId?: NullableOption<string>;
  /**
   * The external link that launches the online meeting. This is a URL that clients will launch into a browser and will
   * redirect the user to join the meeting.
   */
  joinUrl?: NullableOption<string>; // All of the phone numbers associated with this conference.
  phones?: NullableOption<Phone[]>; // The pre-formatted quickdial for this call.
  quickDial?: NullableOption<string>; // The toll free numbers that can be used to join the conference.
  tollFreeNumbers?: NullableOption<string[]>; // The toll number that can be used to join the conference.
  tollNumber?: NullableOption<string>;
}
interface PatternedRecurrence {
  /**
   * The frequency of an event. For access reviews: Do not specify this property for a one-time access review. Only
   * interval, dayOfMonth, and type (weekly, absoluteMonthly) properties of recurrencePattern are supported.
   */
  pattern?: NullableOption<RecurrencePattern>; // The duration of an event.
  range?: NullableOption<RecurrenceRange>;
}
interface RecurrencePattern {
  // The day of the month on which the event occurs. Required if type is absoluteMonthly or absoluteYearly.
  dayOfMonth?: number;
  /**
   * A collection of the days of the week on which the event occurs. The possible values are: sunday, monday, tuesday,
   * wednesday, thursday, friday, saturday. If type is relativeMonthly or relativeYearly, and daysOfWeek specifies more than
   * one day, the event falls on the first day that satisfies the pattern. Required if type is weekly, relativeMonthly, or
   * relativeYearly.
   */
  daysOfWeek?: NullableOption<DayOfWeek[]>;
  /**
   * The first day of the week. The possible values are: sunday, monday, tuesday, wednesday, thursday, friday, saturday.
   * Default is sunday. Required if type is weekly.
   */
  firstDayOfWeek?: NullableOption<DayOfWeek>;
  /**
   * Specifies on which instance of the allowed days specified in daysOfWeek the event occurs, counted from the first
   * instance in the month. The possible values are: first, second, third, fourth, last. Default is first. Optional and used
   * if type is relativeMonthly or relativeYearly.
   */
  index?: NullableOption<WeekIndex>;
  /**
   * The number of units between occurrences, where units can be in days, weeks, months, or years, depending on the type.
   * Required.
   */
  interval?: number; // The month in which the event occurs. This is a number from 1 to 12.
  month?: number;
  /**
   * The recurrence pattern type: daily, weekly, absoluteMonthly, relativeMonthly, absoluteYearly, relativeYearly. Required.
   * For more information, see values of type property.
   */
  type?: NullableOption<RecurrencePatternType>;
}
interface RecurrenceRange {
  /**
   * The date to stop applying the recurrence pattern. Depending on the recurrence pattern of the event, the last occurrence
   * of the meeting may not be this date. Required if type is endDate.
   */
  endDate?: NullableOption<string>; // The number of times to repeat the event. Required and must be positive if type is numbered.
  numberOfOccurrences?: number; // Time zone for the startDate and endDate properties. Optional. If not specified, the time zone of the event is used.
  recurrenceTimeZone?: NullableOption<string>;
  /**
   * The date to start applying the recurrence pattern. The first occurrence of the meeting may be this date or later,
   * depending on the recurrence pattern of the event. Must be the same value as the start property of the recurring event.
   * Required.
   */
  startDate?: NullableOption<string>; // The recurrence range. The possible values are: endDate, noEnd, numbered. Required.
  type?: NullableOption<RecurrenceRangeType>;
}
interface ScheduleInformation {
  /**
   * Represents a merged view of availability of all the items in scheduleItems. The view consists of time slots.
   * Availability during each time slot is indicated with: 0= free, 1= tentative, 2= busy, 3= out of office, 4= working
   * elsewhere.
   */
  availabilityView?: NullableOption<string>; // Error information from attempting to get the availability of the user, distribution list, or resource.
  error?: NullableOption<FreeBusyError>; // An SMTP address of the user, distribution list, or resource, identifying an instance of scheduleInformation.
  scheduleId?: NullableOption<string>; // Contains the items that describe the availability of the user or resource.
  scheduleItems?: NullableOption<ScheduleItem[]>;
  /**
   * The days of the week and hours in a specific time zone that the user works. These are set as part of the user's
   * mailboxSettings.
   */
  workingHours?: NullableOption<WorkingHours>;
}
interface ScheduleItem {
  // The date, time, and time zone that the corresponding event ends.
  end?: NullableOption<DateTimeTimeZone>; // The sensitivity of the corresponding event. True if the event is marked private, false otherwise. Optional.
  isPrivate?: NullableOption<boolean>; // The location where the corresponding event is held or attended from. Optional.
  location?: NullableOption<string>; // The date, time, and time zone that the corresponding event starts.
  start?: NullableOption<DateTimeTimeZone>;
  /**
   * The availability status of the user or resource during the corresponding event. The possible values are: free,
   * tentative, busy, oof, workingElsewhere, unknown.
   */
  status?: NullableOption<FreeBusyStatus>; // The corresponding event's subject line. Optional.
  subject?: NullableOption<string>;
}
//#endregion
//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/attachments.d.ts
interface AttachmentDownload {
  data: Buffer;
  contentType: string;
}
//#endregion
//#region src/types/odata.d.ts
interface ODataAttrs {
  "@odata.id"?: string;
  "@odata.etag"?: string;
  "@odata.context"?: string;
  "@odata.type"?: string;
}
interface PaginatedResponse<T> {
  "@odata.context": string;
  value: T[];
  "@odata.nextLink"?: string;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ms-outlook";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/ms-outlook/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
  actions: {
    getCurrentUser: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      showInstanceWebhooks: {
        label: string;
        type: "boolean";
        required: true;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      fetchAll: {
        default: string;
        comments: string;
        label: string;
        type: "boolean";
        required: false;
        example: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: Subscription[];
        "@odata.context": string;
        "@odata.nextLink"?: string;
      };
    }>;
    createEventSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      notificationUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (rawValue: unknown) => string;
      };
      allowDuplicates: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Subscription;
    }>;
    updateEventSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (rawValue: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      subscriptionId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
        id: string;
        message: string;
      };
    }>;
    deleteAllInstanceSubscriptions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        subscriptionsRemoved: (string | undefined)[];
      };
    }>;
    createMailFolderSubscription: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      changeType: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        comments: string;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string;
      };
      notificationUrl: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (rawValue: unknown) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    deleteMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
        id: string;
        message: string;
      };
    }>;
    getMessageById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        message: {
          headers: Record<string, unknown>;
          attachments: Array<{
            filename?: string;
            contentType: string;
            size: number;
            contentId?: string;
            related?: boolean;
            data: unknown;
          }>;
          text: string | undefined;
          html: string | false | undefined;
        };
        rawMessage: string;
      };
    }>;
    listMessages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSkip: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      folderId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<Message & ODataAttrs>;
    }>;
    sendMessage: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      to: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        clean: (values: unknown) => string[];
        comments: string;
        example: string;
        placeholder: string;
      };
      subject: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      bodyContentType: {
        label: string;
        type: "string";
        required: true;
        default: string;
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        placeholder: string;
        clean: (value: unknown) => BodyType;
      };
      cc: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        clean: (values: unknown) => string[];
        comments: string;
        example: string;
        placeholder: string;
      };
      bcc: {
        label: string;
        type: "string";
        required: false;
        collection: "valuelist";
        clean: (values: unknown) => string[];
        comments: string;
        example: string;
        placeholder: string;
      };
      body: {
        label: string;
        type: "string";
        required: false;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
      attachments: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => unknown[];
      };
      dynamicAttachments: {
        label: string;
        type: "data";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => unknown[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: null;
    }>;
    createMailFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        required: true;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      parentFolderId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: MailSearchFolder;
    }>;
    deleteMailFolder: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
        id: string;
        message: string;
      };
    }>;
    listMailFolders: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSkip: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      parentFolderId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<MailSearchFolder & ODataAttrs>;
    }>;
    listSupportedTimezones: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listSupportedLanguages: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listEvents: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSkip: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      calendarId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<Event & ODataAttrs>;
    }>;
    createEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationName: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      subject: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      body: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      start: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      startTimezone: {
        label: string;
        type: "string";
        required: true;
        default: string;
        example: string;
        placeholder: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      end: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endTimezone: {
        label: string;
        type: "string";
        required: true;
        default: string;
        example: string;
        placeholder: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      calendarId: {
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      attendeesData: {
        label: string;
        type: "data";
        example: string;
        placeholder: string;
        comments: string;
      };
      attendees: {
        label: {
          key: string;
          value: string;
        };
        type: "string";
        collection: "keyvaluelist";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        example: string;
        placeholder: string;
        clean: (rawValue: unknown) => Attendee[];
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Event;
    }>;
    updateEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      eventDetails: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          locationName: {
            required: boolean;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
          };
          subject: {
            required: boolean;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
          };
          body: {
            required: boolean;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            comments: string;
            example: string;
            placeholder: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      schedule: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          start: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
          };
          startTimezone: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            default: string;
            example: string;
            placeholder: string;
            dataSource: string;
            comments: string;
          };
          end: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            example: string;
            placeholder: string;
            comments: string;
          };
          endTimezone: {
            required: false;
            clean: (value: unknown) => string | undefined;
            label: string;
            type: "string";
            default: string;
            example: string;
            placeholder: string;
            dataSource: string;
            comments: string;
          };
        };
      } & {
        type: "structuredObject";
      };
      attendeesData: {
        required: boolean;
        label: string;
        type: "data";
        example: string;
        placeholder: string;
        comments: string;
      };
      attendees: {
        required: boolean;
        clean: (rawValue: unknown) => Attendee[];
        label: {
          key: string;
          value: string;
        };
        type: "string";
        collection: "keyvaluelist";
        model: {
          label: string;
          value: string;
        }[];
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Event;
    }>;
    deleteEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
        id: string;
        message: string;
      };
    }>;
    cancelEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      comment: {
        label: string;
        type: "string";
        required: false;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
        id: string;
        message: string;
      };
    }>;
    listCalendars: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          pageLimit: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
          pageSkip: {
            label: string;
            type: "string";
            required: false;
            example: string;
            placeholder: string;
            comments: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<Calendar & ODataAttrs>;
    }>;
    createCalendar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      name: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      color: {
        label: string;
        type: "string";
        required: true;
        default: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Calendar & ODataAttrs;
    }>;
    updateCalendar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      color: {
        label: string;
        type: "string";
        required: true;
        default: string;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      name: {
        required: boolean;
        clean: (value: unknown) => string | undefined;
        label: string;
        type: "string";
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: Calendar & ODataAttrs;
    }>;
    deleteCalendar: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      id: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        success: boolean;
        id: string;
        message: string;
      };
    }>;
    getSchedule: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      schedules: {
        label: string;
        type: "string";
        collection: "valuelist";
        example: string;
        required: true;
        placeholder: string;
        comments: string;
        clean: (rawValue: unknown) => unknown;
      };
      start: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      startTimezone: {
        label: string;
        type: "string";
        required: true;
        default: string;
        example: string;
        placeholder: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      end: {
        label: string;
        type: "string";
        required: true;
        example: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      endTimezone: {
        label: string;
        type: "string";
        required: true;
        default: string;
        example: string;
        placeholder: string;
        dataSource: string;
        comments: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      availabilityViewInterval: {
        label: string;
        type: "string";
        required: false;
        example: string;
        default: string;
        placeholder: string;
        comments: string;
        clean: (value: unknown) => number | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: {
        value: ScheduleInformation[];
      } & ODataAttrs;
    }>;
    getCalendarEvent: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    downloadEventAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
      attachmentId: {
        dataSource: string;
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, AttachmentDownload>;
    downloadMessageAttachment: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
        example: string;
        placeholder: string;
      };
      attachmentId: {
        dataSource: string;
        comments: string;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, AttachmentDownload>;
    listEventAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
        dataSource: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<Attachment & ODataAttrs>;
    }>;
    listMessageAttachments: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageId: {
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        dataSource: string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<Attachment & ODataAttrs>;
    }>;
  };
  triggers: {
    webhook: import("@prismatic-io/spectral").TriggerDefinition<{}, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    webhookLifecycle: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (rawValue: unknown) => string;
      };
      allowDuplicates: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    mailFolderWebhook: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      changeTypes: {
        label: string;
        type: "string";
        required: true;
        collection: "valuelist";
        comments: string;
        placeholder: string;
        model: {
          value: string;
          label: string;
        }[];
        clean: (value: unknown) => string;
      };
      folderId: {
        comments: string;
        label: string;
        type: "string";
        required: false;
        dataSource: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      expirationDateTime: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (rawValue: unknown) => string;
      };
      allowDuplicates: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      skipMessageFetch: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, true, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      branch: string;
    }, import("@prismatic-io/spectral").Inputs>;
    pollChangesTrigger: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      pollFolderId: {
        label: string;
        type: "string";
        required: false;
        example: string;
        comments: string;
        placeholder: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      showNewMessages: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      showUpdatedMessages: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        example: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, false, {
      payload: import("@prismatic-io/spectral").TriggerPayload;
      polledNoChanges: boolean | undefined;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  dataSources: {
    selectCalendar: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectEvent: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectEventAttachment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      eventId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMailFolder: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMessage: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      folderId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      search: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      filter: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectMessageAttachment: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      messageId: {
        dataSource: undefined;
        label: string;
        type: "string";
        required: true;
        clean: (value: unknown, defaultValue?: string) => string;
        comments: string;
        example: string;
        placeholder: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectSubscription: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLanguage: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectTimezone: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  connections: any[];
}>;
export = _default;