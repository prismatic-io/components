import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const activityListNotificationsForAuthenticatedUser = action({
  display: {
    label: "Activity List Notifications For Authenticated User",
    description: "List notifications for the authenticated user",
  },
  perform: async (
    context,
    { connection, all, participating, since, before, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/notifications`, {
      params: { all, participating, since, before, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    all: {
      label: "All",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: 'If "true", show notifications marked as read',
    },
    participating: {
      label: "Participating",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        'If "true", only shows notifications in which the user is directly participating or mentioned',
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show notifications updated after the given time",
    },
    before: {
      label: "Before",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Only show notifications updated before the given time",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const activityMarkNotificationsAsRead = action({
  display: {
    label: "Activity Mark Notifications As Read",
    description: "Mark notifications as read",
  },
  perform: async (context, { connection, lastReadAt, read }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(`/notifications`, {
      last_read_at: lastReadAt,
      read,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    lastReadAt: {
      label: "Last Read At",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Describes the last point that notifications were checked",
    },
    read: {
      label: "Read",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether the notification has been read",
    },
  },
});

const activityGetThread = action({
  display: {
    label: "Activity Get Thread",
    description: "Get a thread",
  },
  perform: async (context, { connection, threadId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/notifications/threads/${threadId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    threadId: {
      label: "Thread Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the thread",
    },
  },
});

const activityMarkThreadAsRead = action({
  display: {
    label: "Activity Mark Thread As Read",
    description: "Mark a thread as read",
  },
  perform: async (context, { connection, threadId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/notifications/threads/${threadId}`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    threadId: {
      label: "Thread Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the thread",
    },
  },
});

const activityGetThreadSubscriptionForAuthenticatedUser = action({
  display: {
    label: "Activity Get Thread Subscription For Authenticated User",
    description: "Get a thread subscription for the authenticated user",
  },
  perform: async (context, { connection, threadId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/notifications/threads/${threadId}/subscription`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    threadId: {
      label: "Thread Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the thread",
    },
  },
});

const activitySetThreadSubscription = action({
  display: {
    label: "Activity Set Thread Subscription",
    description: "Set a thread subscription",
  },
  perform: async (context, { connection, threadId, ignored }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/notifications/threads/${threadId}/subscription`,
      {
        ignored,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    threadId: {
      label: "Thread Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the thread",
    },
    ignored: {
      label: "Ignored",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments: "Whether to block all notifications from a thread",
    },
  },
});

const activityDeleteThreadSubscription = action({
  display: {
    label: "Activity Delete Thread Subscription",
    description: "Delete a thread subscription",
  },
  perform: async (context, { connection, threadId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/notifications/threads/${threadId}/subscription`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    threadId: {
      label: "Thread Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the thread",
    },
  },
});

export default {
  activityListNotificationsForAuthenticatedUser,
  activityMarkNotificationsAsRead,
  activityGetThread,
  activityMarkThreadAsRead,
  activityGetThreadSubscriptionForAuthenticatedUser,
  activitySetThreadSubscription,
  activityDeleteThreadSubscription,
};
