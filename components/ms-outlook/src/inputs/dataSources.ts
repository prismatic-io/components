import { connectionInput, eventIdInput, folderIdInput } from "./common";
import { filterInput, messageIdInput, searchInput } from "./messages";

export const selectCalendarInputs = {
  connection: connectionInput,
};

export const selectEventInputs = {
  connection: connectionInput,
};

export const selectLanguageInputs = {
  connection: connectionInput,
};

export const selectMailFolderInputs = {
  connection: connectionInput,
};

export const selectMessageInputs = {
  connection: connectionInput,
  folderId: { ...folderIdInput, dataSource: undefined },
  search: searchInput,
  filter: filterInput,
};

export const selectSubscriptionInputs = {
  connection: connectionInput,
};

export const selectTimezoneInputs = {
  connection: connectionInput,
};

export const selectMessageAttachmentInputs = {
  connection: connectionInput,
  messageId: { ...messageIdInput, dataSource: undefined },
};

export const selectEventAttachmentInputs = {
  connection: connectionInput,
  eventId: { ...eventIdInput, dataSource: undefined },
};
