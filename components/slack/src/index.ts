import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import {
  archiveConversation,
  closeConversation,
  conversationExists,
  createConversation,
  getConversationsHistory,
  inviteUserToConversation,
  leaveConversation,
  listConversationMembers,
  listConversations,
  renameConversation,
  setConversationPurpose,
  setConversationTopic,
} from "./actions/conversations";
import { listFiles, searchFiles, uploadFile } from "./actions/files";
import {
  deleteMessage,
  deletePendingMessage,
  listScheduledMessages,
  postBlockMessage,
  postEphemeralMessage,
  postMessage,
  postSlackMessage,
  postWebhookBlockMessage,
  searchMessages,
  updateMessage,
} from "./actions/messages";
import { rawRequest } from "./actions/misc";
import { searchAll } from "./actions/search";
import {
  getUser,
  getUserById,
  listUsers,
  listUsersConversations,
} from "./actions/users";
import { openView, publishView, pushView, updateView } from "./actions/views";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "slack",
  documentationUrl: "https://prismatic.io/docs/components/slack/",
  public: true,
  display: {
    label: "Slack",
    description:
      "Send messages, manage conversations, and interact with Slack channels and users.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  connections,
  actions: {
    postMessage,
    deleteMessage,
    deletePendingMessage,
    updateMessage,
    postEphemeralMessage,
    closeConversation,
    createConversation,
    renameConversation,
    getUser,
    getUserById,
    leaveConversation,
    listConversations,
    listConversationMembers,
    listUsers,
    postSlackMessage,
    postBlockMessage,
    postWebhookBlockMessage,
    archiveConversation,
    conversationExists,
    listScheduledMessages,
    listFiles,
    inviteUserToConversation,
    setConversationPurpose,
    setConversationTopic,
    listUsersConversations,
    uploadFile,
    getConversationsHistory,
    rawRequest,
    openView,
    publishView,
    pushView,
    updateView,
    searchAll,
    searchFiles,
    searchMessages,
  },
  triggers,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
